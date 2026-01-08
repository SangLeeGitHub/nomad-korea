// Badge Types
export interface Badge {
  id: string;
  type: 'status' | 'feature';
  label: string;
  icon: string;
  color: string;
}

// City Data
export interface City {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  region: string;

  // Ranking & Score
  rank: number;
  overallScore: number;

  // Images
  thumbnailUrl: string;
  heroImageUrl: string;
  galleryUrls: string[];

  // Core Metrics
  monthlyCost: number; // in KRW
  cafeCount: number;
  internetSpeed: number; // in Mbps
  transitScore: number; // 1-5
  likeCount: number;

  // Weather & Environment
  currentTemp: number;
  feelsLike: number;
  weatherIcon: string;
  airQuality: number;

  // Community
  activeNomads: number;
  reviewCount: number;

  // Badges
  badges: Badge[];

  // Metadata
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Filter State
export interface FilterState {
  // Search
  searchQuery: string;

  // Sliders
  costRange: [number, number];
  cafeCountMin: number;
  internetSpeedMin: number;

  // Checkboxes
  transport: {
    subway: boolean;
    ktx: boolean;
    airport: boolean;
  };
  environment: {
    sea: boolean;
    mountain: boolean;
    university: boolean;
    newCity: boolean;
  };

  // Sort
  sortBy: 'overall' | 'cost-asc' | 'cost-desc' | 'cafe' | 'internet' | 'nomads';

  // View
  view: 'grid' | 'map' | 'list';
}

// Meetup Data
export type MeetupCategory = 'networking' | 'workshop' | 'social' | 'coworking' | 'study';

export interface Meetup {
  id: string;
  cityId: string;
  cityName: string;
  title: string;
  description: string;
  date: Date;
  locationName: string;
  locationAddress: string;
  rsvpCount: number;
  maxAttendees: number;
  tags: string[];
  category: MeetupCategory;
  hostName: string;
  hostAvatar: string;
  imageUrl?: string;
}

export interface MeetupAttendee {
  id: string;
  name: string;
  avatar: string;
  joinedAt: Date;
}

export interface MeetupDetail extends Meetup {
  longDescription: string;
  attendees: MeetupAttendee[];
  requirements?: string[];
  agenda?: string[];
}

// Stats Data
export interface Stats {
  totalCities: number;
  activeUsers: number;
  reviewCount: number;
  meetupCount: number;
  monthlyMessages: number;
  monthlyVisitors: number;
  growthRate: number;
}

// City Detail Types
export interface Workspace {
  id: string;
  name: string;
  type: 'cafe' | 'coworking';
  address: string;
  rating: number;
  priceRange: string;
  wifiSpeed: number;
  hasOutlet: boolean;
  openHours: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  stayDuration: string;
  visitDate: string;
  helpful: number;
}

export interface CityDetail {
  cityId: string;
  longDescription: string;
  pros: string[];
  cons: string[];
  recommendedStay: string;
  bestSeasons: string[];
  workspaces: Workspace[];
  reviews: Review[];
}

// Forum Types
export type ForumCategory = 'question' | 'info' | 'job' | 'free';

export interface ForumPost {
  id: string;
  category: ForumCategory;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPinned?: boolean;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
  likeCount: number;
}

// Chat Types
export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
}

// Guide Types
export type GuideCategory = 'visa' | 'accommodation' | 'workspace' | 'lifestyle';

export interface Guide {
  id: string;
  slug: string;
  category: GuideCategory;
  title: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

// User Profile Types
export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  bio: string;
  currentLocation: string;
  joinedAt: Date;
  stats: UserStats;
  visitedCities: VisitedCity[];
  myReviews: UserReview[];
}

export interface UserStats {
  visitedCitiesCount: number;
  reviewsCount: number;
  meetupsAttended: number;
}

export interface VisitedCity {
  cityId: string;
  cityName: string;
  citySlug: string;
  visitedAt: Date;
  duration: string;
}

export interface UserReview {
  id: string;
  cityId: string;
  cityName: string;
  citySlug: string;
  rating: number;
  content: string;
  createdAt: Date;
  helpful: number;
}
