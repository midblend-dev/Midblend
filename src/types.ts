export interface CreatorApplicationFormData {
  fullName: string;
  instagramHandle: string;
  email: string;
  phone: string;
  city: string;
  primaryPlatform: 'Instagram' | 'YouTube' | 'Instagram + YouTube' | 'Other' | '';
  creatorCategory: 'Beauty' | 'Skincare' | 'Makeup' | 'Haircare' | 'Lifestyle' | 'Other' | '';
  followers: string;
  profileUrl: string;
  barterOpen: 'Yes' | 'Depends' | 'No' | string;
  contentDescription: string;
  previousCollaborations: string;
  whyJoin: string;
  termsAccepted: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: 'users' | 'eye' | 'shield';
}

export interface ServiceCard {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'search' | 'layers' | 'bar-chart';
}

export interface CampaignItem {
  id: string;
  brand: string;
  title: string;
  category: string;
  description: string;
  image: string;
  fallbackImage?: string;
  statBadge?: string;
}

export interface CreatorCategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  creatorCount: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
}
