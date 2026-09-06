import {
  StatItem,
  ServiceCard,
  CampaignItem,
  CreatorCategoryItem,
  GalleryPhoto
} from '../types';
import indianGirlSkincare from '../assets/images/indian_girl_skincare_1788679148211.jpg';
import indianGlowingSkin from '../assets/images/indian_glowing_skin_1788679303774.jpg';
import makeupImage from '../assets/images/regenerated_image_1788681716275.jpg';
import ugcImage from '../assets/images/regenerated_image_1788681717911.jpg';
import haircareImage from '../assets/images/indian_haircare_1788682004445.jpg';
import lifestyleImage from '../assets/images/indian_lifestyle_1788682143094.jpg';

// Centralized configuration for creator application submission
export const APPLICATION_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw06_5p3prrKzZlrA5D1xJZnFNkxDnVApzAADXWkxHmqtvTCtV-D17MB3twFUd_DQ_Tvg/exec';

export const OFFICIAL_STATS = {
  creatorCommunity: '300+',
  viewsGenerated: '20M+',
  creatorBrandFit: '100%'
};

export const CONTACT_INFO = {
  email: 'team@midblend.com',
  phone: '+91 9707992712',
  phoneRaw: '9707992712',
  phoneDisplay: '+91 97079 92712',
  instagram: '@midblend',
  instagramUrl: 'https://instagram.com/midblend',
  dmCallout: 'DM to Apply'
};

export const TRUSTED_BRANDS = [
  { id: 'sanfe', name: 'Sanfe', tagline: 'Body & Intimate Care' },
  { id: 'kaya', name: 'kaya', tagline: 'Dermatologist Skincare' },
  { id: 'aviva', name: 'AVIVA BEAUTY', tagline: 'Clean Formulations' },
  { id: 'pellops', name: 'Pellôps', tagline: 'Active Botanical Skin' },
  { id: 'hopenskin', name: 'HØPENSKIN BEAUTY', tagline: 'Nordic Minimal Skincare' },
  { id: 'minimalist', name: 'Minimalist', tagline: 'Actives & Clinical Science' },
  { id: 'plum', name: 'Plum Goodness', tagline: '100% Clean & Vegan' },
  { id: 'dot-key', name: 'Dot & Key', tagline: 'Fruit Infused Formulas' },
  { id: 'foxtale', name: 'Foxtale', tagline: 'Targeted High-Efficacy' },
  { id: 'dr-sheths', name: "Dr. Sheth's", tagline: 'Indian Skin Derm Science' },
  { id: 'aqualogica', name: 'Aqualogica', tagline: 'Unique Water-Lock Tech' }
];

export const HERO_STATS: StatItem[] = [
  {
    id: 'stat-creators',
    value: '300+',
    label: 'Niche Creators',
    iconName: 'users'
  },
  {
    id: 'stat-views',
    value: '20M+',
    label: 'Views Generated',
    iconName: 'eye'
  },
  {
    id: 'stat-fit',
    value: '100%',
    label: 'Creator–Brand Fit',
    iconName: 'shield'
  }
];

export const WHAT_WE_DO_CARDS: ServiceCard[] = [
  {
    id: 'card-01',
    number: '01',
    title: 'Creator Discovery',
    description: 'We find niche creators who truly align with your brand.',
    iconName: 'search'
  },
  {
    id: 'card-02',
    number: '02',
    title: 'Campaign Management',
    description: 'End-to-end campaign management for maximum impact.',
    iconName: 'layers'
  },
  {
    id: 'card-03',
    number: '03',
    title: 'Performance Tracking',
    description: 'Detailed reports and insights to measure real results.',
    iconName: 'bar-chart'
  }
];

export const BRAND_CHECKLIST = [
  'Niche creator network',
  'Authentic content that converts',
  'Data-driven campaign strategy',
  'Measurable ROI'
];

export const CREATOR_CATEGORIES: CreatorCategoryItem[] = [
  {
    id: 'cat-beauty',
    name: 'Beauty',
    description: 'Aesthetic visuals and skin-positive storytellers.',
    image: indianGlowingSkin,
    creatorCount: '120+ creators'
  },
  {
    id: 'cat-skincare',
    name: 'Skincare',
    description: 'Ingredient-conscious and science-backed skin routines.',
    image: indianGirlSkincare,
    creatorCount: '140+ creators'
  },
  {
    id: 'cat-makeup',
    name: 'Makeup',
    description: 'Creative tutorials, shade showcases, and wear tests.',
    image: makeupImage,
    creatorCount: '80+ creators'
  },
  {
    id: 'cat-haircare',
    name: 'Haircare',
    description: 'Scalp health, texture care, and routine breakdowns.',
    image: haircareImage,
    creatorCount: '60+ creators'
  },
  {
    id: 'cat-lifestyle',
    name: 'Lifestyle',
    description: 'Holistic wellness, aesthetic routines, and day-in-the-life.',
    image: lifestyleImage,
    creatorCount: '70+ creators'
  },
  {
    id: 'cat-ugc',
    name: 'UGC',
    description: 'High-converting organic ad hooks, unboxings, and reviews.',
    image: ugcImage,
    creatorCount: '100+ creators'
  }
];

export const CAMPAIGNS: CampaignItem[] = [
  {
    id: 'camp-sanfe',
    brand: 'Sanfe',
    title: 'Daily Barrier Care & Body Positivity',
    category: 'Skincare & Body Routine',
    description: 'Targeted niche creator partnership focusing on gentle skin solutions, genuine testimonial videos, and direct-to-consumer conversion.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    statBadge: '20M+ Views Generated'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Natural Dewy Skin Portrait',
    category: 'Beauty Creator',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-2',
    title: 'Botanical Serum Application',
    category: 'Skincare Content',
    image: 'https://images.unsplash.com/photo-1608248597359-2ff9e3b88b75?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'gal-3',
    title: 'Creator Studio Session',
    category: 'UGC Content',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-4',
    title: 'Minimalist Dropper Routine',
    category: 'Skincare Product',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    aspect: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Golden Hour Glow',
    category: 'Lifestyle Creator',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-6',
    title: 'Editorial Eye Look',
    category: 'Makeup Artistry',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'gal-7',
    title: 'Clean Hair Treatment',
    category: 'Haircare Ritual',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    aspect: 'portrait'
  },
  {
    id: 'gal-8',
    title: 'Authentic Creator Filming',
    category: 'Behind the Lens',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    aspect: 'landscape'
  }
];

export const CREATOR_HIGHLIGHTS = [
  {
    id: 'cr-1',
    name: 'Elena Rostova',
    handle: '@elena.skin',
    category: 'Skincare & Derm Enthusiast',
    followers: '280K',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    quote: 'Authentic product formulations speak louder than hype.'
  },
  {
    id: 'cr-2',
    name: 'Maya Chen',
    handle: '@mayaglows',
    category: 'Beauty & Glass Skin',
    followers: '195K',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    quote: 'MIDBLEND paired me with brands my followers genuinely love.'
  },
  {
    id: 'cr-3',
    name: 'Sarah Al-Mansoor',
    handle: '@sarah.botanics',
    category: 'Clean Formulations & Hair',
    followers: '340K',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    quote: 'Clear briefs, high creative freedom, and instant brand alignment.'
  },
  {
    id: 'cr-4',
    name: 'Chloe Laurent',
    handle: '@chloeglowlab',
    category: 'UGC & Texture Showcase',
    followers: '142K',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    quote: 'The collaborative campaigns here actually respect creator time.'
  }
];
