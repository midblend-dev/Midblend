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
  contentDescription: string;
  previousCollaborations: string;
  whyJoin: string;
  submittedAt: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'approved' | 'rejected';
  adminNotes?: string;
}

const STORAGE_KEY = 'midblend_creator_applications_v1';

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
    contentDescription: 'Focus on clean active ingredients (Niacinamide, AHA/BHA) and texture breakdowns with before/after 30-day wear tests.',
    previousCollaborations: 'Plum Goodness, Minimalist, Dot & Key',
    whyJoin: 'Looking for curated campaigns with clinical skincare brands that prioritize evidence-based formulas over generic sponsorships.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
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
    contentDescription: 'Resident dermatologist breaking down barrier repair, sunscreen efficacy, and acne solutions in Hindi & English.',
    previousCollaborations: "Dr. Sheth's, Cetaphil, Foxtale",
    whyJoin: 'Want to partner with science-backed brands where I can give honest, clinically sound recommendations to my audience.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: 'shortlisted',
    adminNotes: 'Super high credibility for our premium clinical skincare tier.'
  },
  {
    id: 'app_sample_3',
    fullName: 'Rhea Mehta',
    instagramHandle: '@rhea_ugc_creates',
    email: 'rhea.ugc@outlook.com',
    phone: '+91 97412 88301',
    city: 'Bangalore',
    primaryPlatform: 'Instagram',
    creatorCategory: 'UGC & Aesthetic Product Demos',
    followers: '10K - 25K',
    profileUrl: 'https://instagram.com/rhea_ugc_creates',
    contentDescription: 'Macro shots of dropper textures, water splash aesthetics, and voiceover routine videos shot on iPhone 15 Pro in 4K.',
    previousCollaborations: 'Aqualogica, Kaya, Aviva Beauty',
    whyJoin: 'I specialize in high-converting ad hooks and organic creator testimonials for direct-to-consumer skincare brands.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    status: 'reviewing',
    adminNotes: 'Clean video production quality. Fast turnaround.'
  },
  {
    id: 'app_sample_4',
    fullName: 'Pooja Hegde',
    instagramHandle: '@pooja.cleanliving',
    email: 'pooja.clean@gmail.com',
    phone: '+91 99002 11983',
    city: 'Hyderabad',
    primaryPlatform: 'YouTube',
    creatorCategory: 'Ayurveda & Modern Botanical',
    followers: '100K+',
    profileUrl: 'https://youtube.com',
    contentDescription: 'Holistic lifestyle routines, barrier-friendly cold-pressed botanical oils, and ingredient debunking.',
    previousCollaborations: 'Pellôps, Forest Essentials, Kama Ayurveda',
    whyJoin: 'Midblend has the best agency reputation for connecting creators directly with brand founders.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 1 day ago
    status: 'approved',
    adminNotes: 'Verified audience demographics: 82% women aged 20-34 in tier 1 Indian cities.'
  },
  {
    id: 'app_sample_5',
    fullName: 'Tarun Varma',
    instagramHandle: '@skincarewithtarun',
    email: 'tarun.varma@gmail.com',
    phone: '+91 91234 56789',
    city: 'Pune',
    primaryPlatform: 'Instagram',
    creatorCategory: "Men's Skincare & Grooming",
    followers: '5K - 10K',
    profileUrl: 'https://instagram.com/skincarewithtarun',
    contentDescription: 'Simplifying grooming routines, post-shave barrier calming, and non-greasy daily SPFs for Indian men.',
    previousCollaborations: 'The Man Company, Minimalist',
    whyJoin: 'Excited to represent the growing male skincare community.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: 'new',
    adminNotes: 'Growing niche. High potential for men skincare campaigns.'
  }
];

export function getApplications(): CreatorApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPLICATIONS));
      return INITIAL_SAMPLE_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPLICATIONS));
      return INITIAL_SAMPLE_APPLICATIONS;
    }
    return parsed;
  } catch {
    return INITIAL_SAMPLE_APPLICATIONS;
  }
}

export function saveApplication(app: CreatorApplication): void {
  try {
    const current = getApplications();
    // Prepend to top
    const updated = [app, ...current.filter((item) => item.id !== app.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save application locally:', err);
  }
}

export function updateApplicationStatus(
  id: string,
  status: CreatorApplication['status']
): CreatorApplication[] {
  try {
    const current = getApplications();
    const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getApplications();
  }
}

export function updateApplicationNotes(id: string, adminNotes: string): CreatorApplication[] {
  try {
    const current = getApplications();
    const updated = current.map((item) => (item.id === id ? { ...item, adminNotes } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getApplications();
  }
}

export function deleteApplication(id: string): CreatorApplication[] {
  try {
    const current = getApplications();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getApplications();
  }
}

export function resetToSampleApplications(): CreatorApplication[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPLICATIONS));
    return INITIAL_SAMPLE_APPLICATIONS;
  } catch {
    return INITIAL_SAMPLE_APPLICATIONS;
  }
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
