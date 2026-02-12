import type { UserProfile } from '@/lib/types'

export function mockUserProfile(overrides?: Partial<UserProfile>): UserProfile {
  return {
    id: 'user-1',
    email: 'nomad@example.com',
    nickname: '김노마드',
    avatar: '/avatars/user1.jpg',
    bio: '디지털 노마드 2년차',
    currentLocation: '서울',
    joinedAt: new Date('2024-01-01'),
    stats: {
      visitedCitiesCount: 5,
      reviewsCount: 3,
      meetupsAttended: 2,
    },
    visitedCities: [
      {
        cityId: 'city-seoul',
        cityName: '서울',
        citySlug: 'seoul',
        visitedAt: new Date('2024-03-01'),
        duration: '3개월',
      },
    ],
    myReviews: [
      {
        id: 'review-1',
        cityId: 'city-seoul',
        cityName: '서울',
        citySlug: 'seoul',
        rating: 4,
        content: '서울은 최고의 노마드 도시입니다.',
        createdAt: new Date('2024-04-01'),
        helpful: 10,
      },
    ],
    ...overrides,
  }
}
