export type MenuCategory = 'EVERYTHING' | 'TANDOOR' | 'FROM THE HANDI' | 'COLD THINGS' | 'OVER CHARCOAL';

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  description: string;
  fullThought?: string;
  price: number;
  category: MenuCategory[];
  isSignature?: boolean;
  isPopular?: boolean;
  isVisible?: boolean;
  sortOrder?: number;
  image: string;
  accompaniment?: string;
  spiciness?: 'Mild' | 'Medium' | 'Rich Spiced' | 'Smoky';
}

export interface Testimonial {
  id: string;
  reviewerName?: string;
  author: string;
  quote: string;
  role: string;
  rating: number;
  date: string;
  source?: 'Google Review' | 'Manual entry';
  isFeatured?: boolean;
  itemMentioned?: string;
}

export interface DaySchedule {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface BusinessInfo {
  name: string;
  bengaliName: string;
  category: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  typicalSpend: string;
  address: string;
  phone: string;
  displayPhone: string;
  facebookUrl?: string;
  hours: string;
  hoursDetail: string;
  hoursSchedule?: DaySchedule[];
  serviceOptions: string[];
  googleMapsUrl: string;
}

export interface HomepageContent {
  heroLabel: string;
  heroHeadlinePlain: string;
  heroHeadlineHighlight: string;
  heroSubtext: string;
  heroImageUrl: string;
  announcementText: string;
  feelingHeadline: string;
  feelingBodyCopy: string;
  feelingSideQuote: string;
  drinkFeature: {
    label: string;
    headline: string;
    body: string;
    price: number;
    imageUrl: string;
    bestWith: string;
    visitorNote: string;
  };
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  tag: 'Food' | 'Vibe' | 'Drinks' | 'Exterior';
  uploadedAt: string;
}

export type TableRequestStatus = 'New' | 'Contacted' | 'Confirmed' | 'Closed';

export interface TableRequest {
  id: string;
  name: string;
  contact: string;
  partySize: string;
  serviceType: string;
  requestedDateTime: string;
  message: string;
  status: TableRequestStatus;
  createdAt: string;
}

export type UserRole = 'Admin' | 'Staff';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  status: 'Active' | 'Inactive';
}

export interface ActivityLogItem {
  id: string;
  action: string;
  timeAgo: string;
  timestamp: string;
  author: string;
}

