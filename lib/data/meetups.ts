import { Meetup, Stats } from '../types';

export const meetups: Meetup[] = [
  {
    id: 'm1',
    cityId: '1',
    cityName: '서울',
    title: '강남 노마드 위클리',
    date: new Date('2024-11-02T19:00:00'),
    locationName: '카페 스테이션',
    rsvpCount: 23,
    maxAttendees: 30,
    tags: ['networking', 'weekly'],
  },
  {
    id: 'm2',
    cityId: '3',
    cityName: '부산',
    title: '해운대 브런치 모임',
    date: new Date('2024-11-03T15:00:00'),
    locationName: '해변 카페',
    rsvpCount: 15,
    maxAttendees: 20,
    tags: ['brunch', 'casual'],
  },
  {
    id: 'm3',
    cityId: '2',
    cityName: '제주',
    title: '제주 노마드 네트워킹',
    date: new Date('2024-11-05T18:30:00'),
    locationName: '델문도',
    rsvpCount: 18,
    maxAttendees: 25,
    tags: ['networking', 'monthly'],
  },
];

export const stats: Stats = {
  totalCities: 50,
  activeUsers: 12450,
  reviewCount: 2847,
  meetupCount: 355,
  monthlyMessages: 45200,
  monthlyVisitors: 124000,
  growthRate: 35,
};
