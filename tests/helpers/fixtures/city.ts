import type { City, Badge } from '@/lib/types'

export function mockBadge(overrides?: Partial<Badge>): Badge {
  return {
    id: 'badge-1',
    type: 'feature',
    label: '카페 천국',
    icon: '☕',
    color: 'bg-amber-100 text-amber-800',
    ...overrides,
  }
}

export function mockCity(overrides?: Partial<City>): City {
  return {
    id: 'city-seoul',
    slug: 'seoul',
    name: '서울',
    nameEn: 'Seoul',
    region: '수도권',
    rank: 1,
    overallScore: 4.5,
    thumbnailUrl: '/images/seoul-thumb.jpg',
    heroImageUrl: '/images/seoul-hero.jpg',
    galleryUrls: [],
    monthlyCost: 1500000,
    cafeCount: 320,
    internetSpeed: 200,
    transitScore: 5,
    likeCount: 100,
    dislikeCount: 10,
    currentTemp: 22,
    feelsLike: 20,
    weatherIcon: '☀️',
    airQuality: 3,
    activeNomads: 450,
    reviewCount: 85,
    badges: [mockBadge()],
    description: '한국의 수도이자 디지털 노마드의 천국',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
    ...overrides,
  }
}

export function mockCities(count: number = 3): City[] {
  const cities = [
    mockCity(),
    mockCity({
      id: 'city-busan',
      slug: 'busan',
      name: '부산',
      nameEn: 'Busan',
      region: '경상권',
      rank: 2,
      overallScore: 4.3,
      monthlyCost: 1200000,
      cafeCount: 180,
      internetSpeed: 150,
      transitScore: 4,
      activeNomads: 200,
    }),
    mockCity({
      id: 'city-jeju',
      slug: 'jeju',
      name: '제주',
      nameEn: 'Jeju',
      region: '제주권',
      rank: 3,
      overallScore: 4.1,
      monthlyCost: 1300000,
      cafeCount: 150,
      internetSpeed: 100,
      transitScore: 2,
      activeNomads: 150,
    }),
  ]
  return cities.slice(0, count)
}
