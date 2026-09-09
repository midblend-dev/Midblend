import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CreatorApplication {
  id: string;
  fullName: string;
  instagramHandle: string;
  email: string;
  phone: string;
  city: string;
  primaryPlatform: string;
  creatorCategory: string;
  followers: string;
  profileUrl: string;
  barterOpen?: 'Yes' | 'Depends' | 'No' | string;
  contentDescription: string;
  previousCollaborations: string;
  whyJoin: string;
  submittedAt: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'approved' | 'rejected';
  adminNotes?: string;
}

const STORAGE_KEY = 'midblend_creator_applications_v2';

export const INITIAL_SAMPLE_APPLICATIONS: CreatorApplication[] = [
  {
    id: 'app_sample_1',
    fullName: 'Ananya Sharma',
    instagramHandle: '@ananya.glows',
    email: 'ananya.glows@gmail.com',
    phone: '+91 98201 44512',
    city: 'Mumbai',
    primaryPlatform: 'Instagram',
    creatorCategory: 'Skincare & Dermatology Routine',
    followers: '25K - 50K',
    profileUrl: 'https://instagram.com/ananya.glows',
    barterOpen: 'Yes',
    contentDescription: 'Focus on clean active ingredients (Niacinamide, AHA/BHA) and texture breakdowns with before/after 30-day wear tests.',
    previousCollaborations: 'Plum Goodness, Minimalist, Dot & Key',
    whyJoin: 'Looking for curated campaigns with clinical skincare brands that prioritize evidence-based formulas over generic sponsorships.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'new',
    adminNotes: 'High engagement rate on reels (~7.4%). Great visual lighting.'
  },
  {
    id: 'app_sample_2',
    fullName: 'Dr. Kabir Oberoi',
    instagramHandle: '@drkabir.derma',
    email: 'contact@drkabiroberoi.com',
    phone: '+91 98114 90231',
    city: 'New Delhi',
    primaryPlatform: 'Instagram & YouTube',
    creatorCategory: 'Dermatology & Clinical Science',
    followers: '50K - 100K',
    profileUrl: 'https://instagram.com/drkabir.derma',
    barterOpen: 'Depends',
    contentDescription: 'Resident dermatologist breaking down barrier repair, sunscreen efficacy, and acne solutions in Hindi & English.',
    previousCollaborations: "Dr. Sheth's, Cetaphil, Foxtale",
    whyJoin: 'Want to partner with science-backed brands where I can give honest, clinically sound recommendations to my audience.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: 'shortlisted',
    adminNotes: 'Super high credibility for our premium clinical skincare tier.'
  }
];

// Helper to read local cache
export function getLocalApplications(): CreatorApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Synchronous getter for immediate render
export function getApplications(): CreatorApplication[] {
  return getLocalApplications();
}

// Subscribe to real-time updates from Cloud Firestore
export function subscribeApplications(
  onUpdate: (apps: CreatorApplication[]) => void
): () => void {
  try {
    const colRef = collection(db, 'applications');
    const q = query(colRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CreatorApplication[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as CreatorApplication;
            list.push({ ...data, id: docSnap.id });
          });

          // Sort by newest submission first
          list.sort((a, b) => {
            const timeA = new Date(a.submittedAt || 0).getTime();
            const timeB = new Date(b.submittedAt || 0).getTime();
            return timeB - timeA;
          });

          // Update local cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          onUpdate(list);
        } else {
          // If Firestore collection has no documents yet, check local storage
          const local = getLocalApplications();
          onUpdate(local);
        }
      },
      (error) => {
        console.warn('Firestore subscription fallback to local cache:', error);
        onUpdate(getLocalApplications());
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Failed to subscribe to Firestore:', err);
    onUpdate(getLocalApplications());
    return () => {};
  }
}

// Save application permanently to Firestore and local cache
export async function saveApplication(app: CreatorApplication): Promise<void> {
  // 1. Update local cache immediately so UI is responsive
  try {
    const current = getLocalApplications();
    const updated = [app, ...current.filter((item) => item.id !== app.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update local cache:', err);
  }

  // 2. Persist permanently to Cloud Firestore
  try {
    const docRef = doc(db, 'applications', app.id);
    await setDoc(docRef, {
      ...app,
      savedToCloudAt: new Date().toISOString()
    });
    console.log('Application saved to Firestore permanently:', app.id);
  } catch (err) {
    console.error('Failed to save application to Firestore:', err);
  }
}

// Update status in Firestore and local cache
export async function updateApplicationStatus(
  id: string,
  status: CreatorApplication['status']
): Promise<CreatorApplication[]> {
  const current = getLocalApplications();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  try {
    const docRef = doc(db, 'applications', id);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.error('Failed to update status in Firestore:', err);
  }

  return updated;
}

// Update notes in Firestore and local cache
export async function updateApplicationNotes(
  id: string,
  adminNotes: string
): Promise<CreatorApplication[]> {
  const current = getLocalApplications();
  const updated = current.map((item) => (item.id === id ? { ...item, adminNotes } : item));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  try {
    const docRef = doc(db, 'applications', id);
    await updateDoc(docRef, { adminNotes });
  } catch (err) {
    console.error('Failed to update notes in Firestore:', err);
  }

  return updated;
}

// Delete application from Firestore and local cache
export async function deleteApplication(id: string): Promise<CreatorApplication[]> {
  const current = getLocalApplications();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  try {
    const docRef = doc(db, 'applications', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Failed to delete application from Firestore:', err);
  }

  return updated;
}

// Explicit button to load sample data if user wants test data
export async function seedSampleApplications(): Promise<CreatorApplication[]> {
  for (const sample of INITIAL_SAMPLE_APPLICATIONS) {
    await saveApplication(sample);
  }
  return INITIAL_SAMPLE_APPLICATIONS;
}

// Clear all applications
export function resetToSampleApplications(): CreatorApplication[] {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

export function exportApplicationsToCSV(applications: CreatorApplication[]): void {
  const headers = [
    'ID',
    'Full Name',
    'Instagram Handle',
    'Email',
    'Phone',
    'City',
    'Platform',
    'Category',
    'Follower Tier',
    'Profile URL',
    'Open to Barter',
    'Content Description',
    'Previous Brand Collabs',
    'Why Join Reason',
    'Status',
    'Admin Notes',
    'Submission Date'
  ];

  const escapeCSV = (val: string | undefined) => {
    if (!val) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = applications.map((app) => [
    escapeCSV(app.id),
    escapeCSV(app.fullName),
    escapeCSV(app.instagramHandle),
    escapeCSV(app.email),
    escapeCSV(app.phone),
    escapeCSV(app.city),
    escapeCSV(app.primaryPlatform),
    escapeCSV(app.creatorCategory),
    escapeCSV(app.followers),
    escapeCSV(app.profileUrl),
    escapeCSV(app.barterOpen || 'Not specified'),
    escapeCSV(app.contentDescription),
    escapeCSV(app.previousCollaborations),
    escapeCSV(app.whyJoin),
    escapeCSV(app.status),
    escapeCSV(app.adminNotes || ''),
    escapeCSV(new Date(app.submittedAt).toLocaleString())
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `midblend_creator_applications_${new Date().toISOString().split('T')[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
