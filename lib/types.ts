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
export interface Meetup {
  id: string;
  cityId: string;
  cityName: string;
  title: string;
  date: Date;
  locationName: string;
  rsvpCount: number;
  maxAttendees: number;
  tags: string[];
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
