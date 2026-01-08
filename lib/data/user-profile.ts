import type { UserProfile } from '@/lib/types';

export const currentUserProfile: UserProfile = {
  id: 'user-current',
  email: 'nomad@example.com',
  nickname: '노마드_김',
  avatar: '',
  bio: '서울에서 프리랜서 개발자로 일하며 한국 곳곳을 여행하는 디지털 노마드입니다. 카페에서 코딩하는 것을 좋아하고, 새로운 도시를 탐험하는 것이 취미입니다.',
  currentLocation: '서울',
  joinedAt: new Date('2023-06-15'),
  stats: {
    visitedCitiesCount: 8,
    reviewsCount: 12,
    meetupsAttended: 5,
  },
  visitedCities: [
    {
      cityId: '1',
      cityName: '서울',
      citySlug: 'seoul',
      visitedAt: new Date('2024-01-01'),
      duration: '상주',
    },
    {
      cityId: '2',
      cityName: '제주',
      citySlug: 'jeju',
      visitedAt: new Date('2024-08-10'),
      duration: '1개월',
    },
    {
      cityId: '3',
      cityName: '부산',
      citySlug: 'busan',
      visitedAt: new Date('2024-05-15'),
      duration: '2주',
    },
    {
      cityId: '4',
      cityName: '강릉',
      citySlug: 'gangneung',
      visitedAt: new Date('2024-03-20'),
      duration: '1주',
    },
    {
      cityId: '5',
      cityName: '전주',
      citySlug: 'jeonju',
      visitedAt: new Date('2024-02-10'),
      duration: '5일',
    },
  ],
  myReviews: [
    {
      id: 'review-1',
      cityId: '2',
      cityName: '제주',
      citySlug: 'jeju',
      rating: 5,
      content:
        '제주도에서의 한 달 살기는 정말 최고였습니다. 바다를 보며 작업할 수 있는 카페가 많고, 자연 속에서 힐링하면서 생산성도 높일 수 있었어요.',
      createdAt: new Date('2024-09-15'),
      helpful: 23,
    },
    {
      id: 'review-2',
      cityId: '3',
      cityName: '부산',
      citySlug: 'busan',
      rating: 4,
      content:
        '해운대 근처 카페에서 작업하기 좋았습니다. 다만 여름철에는 관광객이 많아서 조용한 작업 공간을 찾기 어려웠어요.',
      createdAt: new Date('2024-06-01'),
      helpful: 15,
    },
    {
      id: 'review-3',
      cityId: '4',
      cityName: '강릉',
      citySlug: 'gangneung',
      rating: 5,
      content:
        '강릉 커피거리는 노마드 천국입니다. 인터넷 속도도 빠르고, 경치 좋은 카페가 많아서 작업 효율이 높았습니다.',
      createdAt: new Date('2024-04-01'),
      helpful: 31,
    },
    {
      id: 'review-4',
      cityId: '5',
      cityName: '전주',
      citySlug: 'jeonju',
      rating: 4,
      content:
        '한옥마을 근처에 분위기 좋은 카페가 많습니다. 물가도 서울보다 저렴해서 장기 체류하기 좋았어요.',
      createdAt: new Date('2024-02-20'),
      helpful: 18,
    },
  ],
};

export function getUserProfile(): UserProfile {
  return currentUserProfile;
}
