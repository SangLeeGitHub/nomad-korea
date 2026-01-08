import { Meetup, MeetupDetail, MeetupAttendee, Stats } from '../types';

export const meetups: Meetup[] = [
  {
    id: 'm1',
    cityId: '1',
    cityName: '서울',
    title: '강남 노마드 위클리',
    description: '매주 토요일 강남에서 열리는 디지털 노마드 네트워킹 모임입니다.',
    date: new Date('2025-01-04T19:00:00'),
    locationName: '카페 스테이션',
    locationAddress: '서울시 강남구 테헤란로 123',
    rsvpCount: 23,
    maxAttendees: 30,
    tags: ['networking', 'weekly'],
    category: 'networking',
    hostName: '김노마드',
    hostAvatar: '/avatars/host1.jpg',
  },
  {
    id: 'm2',
    cityId: '3',
    cityName: '부산',
    title: '해운대 브런치 모임',
    description: '해운대 바다를 보며 즐기는 여유로운 브런치 네트워킹입니다.',
    date: new Date('2025-01-05T11:00:00'),
    locationName: '해변 카페',
    locationAddress: '부산시 해운대구 해운대해변로 123',
    rsvpCount: 15,
    maxAttendees: 20,
    tags: ['brunch', 'casual'],
    category: 'social',
    hostName: '이바다',
    hostAvatar: '/avatars/host2.jpg',
  },
  {
    id: 'm3',
    cityId: '2',
    cityName: '제주',
    title: '제주 노마드 네트워킹',
    description: '제주에서 일하는 노마드들의 월간 네트워킹 모임입니다.',
    date: new Date('2025-01-10T18:30:00'),
    locationName: '델문도',
    locationAddress: '제주시 애월읍 애월로 123',
    rsvpCount: 18,
    maxAttendees: 25,
    tags: ['networking', 'monthly'],
    category: 'networking',
    hostName: '박제주',
    hostAvatar: '/avatars/host3.jpg',
  },
  {
    id: 'm4',
    cityId: '1',
    cityName: '서울',
    title: '판교 개발자 스터디',
    description: '프론트엔드 개발자들의 주간 스터디 모임입니다.',
    date: new Date('2025-01-06T19:30:00'),
    locationName: '스타벅스 판교점',
    locationAddress: '경기도 성남시 분당구 판교로 123',
    rsvpCount: 8,
    maxAttendees: 12,
    tags: ['study', 'frontend'],
    category: 'study',
    hostName: '최개발',
    hostAvatar: '/avatars/host4.jpg',
  },
  {
    id: 'm5',
    cityId: '4',
    cityName: '강릉',
    title: '강릉 코워킹 데이',
    description: '강릉 바다를 보며 함께 일하는 코워킹 데이입니다.',
    date: new Date('2025-01-08T10:00:00'),
    locationName: '테라로사 강릉점',
    locationAddress: '강원도 강릉시 구정면 현천길 123',
    rsvpCount: 12,
    maxAttendees: 15,
    tags: ['coworking', 'cafe'],
    category: 'coworking',
    hostName: '정커피',
    hostAvatar: '/avatars/host5.jpg',
  },
  {
    id: 'm6',
    cityId: '1',
    cityName: '서울',
    title: 'UX/UI 디자인 워크샵',
    description: 'Figma를 활용한 실무 UI 디자인 워크샵입니다.',
    date: new Date('2025-01-11T14:00:00'),
    locationName: '위워크 삼성점',
    locationAddress: '서울시 강남구 테헤란로 152',
    rsvpCount: 20,
    maxAttendees: 25,
    tags: ['workshop', 'design'],
    category: 'workshop',
    hostName: '한디자인',
    hostAvatar: '/avatars/host6.jpg',
  },
  {
    id: 'm7',
    cityId: '3',
    cityName: '부산',
    title: '광안리 선셋 네트워킹',
    description: '광안리 해변에서 석양을 보며 네트워킹하는 특별한 모임입니다.',
    date: new Date('2025-01-12T17:00:00'),
    locationName: '광안리 비치카페',
    locationAddress: '부산시 수영구 광안해변로 123',
    rsvpCount: 25,
    maxAttendees: 30,
    tags: ['networking', 'sunset'],
    category: 'social',
    hostName: '송광안',
    hostAvatar: '/avatars/host7.jpg',
  },
  {
    id: 'm8',
    cityId: '2',
    cityName: '제주',
    title: '제주 카페투어',
    description: '제주의 숨은 카페들을 함께 탐방하는 소셜 모임입니다.',
    date: new Date('2025-01-15T13:00:00'),
    locationName: '카페공백',
    locationAddress: '제주시 한림읍 금악리 123',
    rsvpCount: 10,
    maxAttendees: 12,
    tags: ['cafe', 'tour'],
    category: 'social',
    hostName: '오카페',
    hostAvatar: '/avatars/host8.jpg',
  },
  {
    id: 'm9',
    cityId: '1',
    cityName: '서울',
    title: 'AI 스타트업 밋업',
    description: 'AI 분야 스타트업 관계자들의 네트워킹 밋업입니다.',
    date: new Date('2025-01-18T19:00:00'),
    locationName: '구글 스타트업 캠퍼스',
    locationAddress: '서울시 강남구 대치동 123',
    rsvpCount: 40,
    maxAttendees: 50,
    tags: ['AI', 'startup'],
    category: 'networking',
    hostName: '장에이아이',
    hostAvatar: '/avatars/host9.jpg',
  },
  {
    id: 'm10',
    cityId: '5',
    cityName: '대전',
    title: '대전 노마드 첫 모임',
    description: '대전 지역 디지털 노마드들의 첫 번째 오프라인 모임입니다.',
    date: new Date('2025-01-19T15:00:00'),
    locationName: '성심당 본점 카페',
    locationAddress: '대전시 중구 대종로 480',
    rsvpCount: 8,
    maxAttendees: 20,
    tags: ['networking', 'first'],
    category: 'networking',
    hostName: '유대전',
    hostAvatar: '/avatars/host10.jpg',
  },
  {
    id: 'm11',
    cityId: '1',
    cityName: '서울',
    title: '프리랜서 세금 워크샵',
    description: '프리랜서를 위한 세금 신고 및 절세 방법 워크샵입니다.',
    date: new Date('2025-01-20T14:00:00'),
    locationName: '패스트파이브 강남점',
    locationAddress: '서울시 강남구 역삼동 123',
    rsvpCount: 30,
    maxAttendees: 35,
    tags: ['workshop', 'tax'],
    category: 'workshop',
    hostName: '공세무',
    hostAvatar: '/avatars/host11.jpg',
  },
  {
    id: 'm12',
    cityId: '4',
    cityName: '강릉',
    title: '강릉 월간 노마드',
    description: '강릉 노마드들의 월간 정기 모임입니다.',
    date: new Date('2025-01-25T18:00:00'),
    locationName: '보헤미안박이추커피',
    locationAddress: '강원도 강릉시 성산면 보광리 123',
    rsvpCount: 14,
    maxAttendees: 20,
    tags: ['networking', 'monthly'],
    category: 'networking',
    hostName: '임강릉',
    hostAvatar: '/avatars/host12.jpg',
  },
  {
    id: 'm13',
    cityId: '2',
    cityName: '제주',
    title: '제주 요가 & 네트워킹',
    description: '아침 요가 후 브런치를 즐기며 네트워킹하는 웰니스 모임입니다.',
    date: new Date('2025-01-26T08:00:00'),
    locationName: '제주 요가원',
    locationAddress: '제주시 노형동 123',
    rsvpCount: 12,
    maxAttendees: 15,
    tags: ['yoga', 'wellness'],
    category: 'social',
    hostName: '서요가',
    hostAvatar: '/avatars/host13.jpg',
  },
  {
    id: 'm14',
    cityId: '3',
    cityName: '부산',
    title: '부산 개발자 밋업',
    description: '부산 지역 개발자들의 기술 공유 및 네트워킹 밋업입니다.',
    date: new Date('2025-01-27T19:00:00'),
    locationName: '스파크플러스 부산점',
    locationAddress: '부산시 해운대구 센텀중앙로 123',
    rsvpCount: 35,
    maxAttendees: 40,
    tags: ['developer', 'tech'],
    category: 'networking',
    hostName: '강개발',
    hostAvatar: '/avatars/host14.jpg',
  },
  {
    id: 'm15',
    cityId: '1',
    cityName: '서울',
    title: '홍대 크리에이터 모임',
    description: '콘텐츠 크리에이터들의 경험 공유 및 콜라보 네트워킹입니다.',
    date: new Date('2025-02-01T16:00:00'),
    locationName: '연남동 카페',
    locationAddress: '서울시 마포구 연남동 123',
    rsvpCount: 22,
    maxAttendees: 25,
    tags: ['creator', 'content'],
    category: 'networking',
    hostName: '노크리',
    hostAvatar: '/avatars/host15.jpg',
  },
  {
    id: 'm16',
    cityId: '6',
    cityName: '전주',
    title: '전주 한옥마을 코워킹',
    description: '전주 한옥마을에서 진행되는 특별한 코워킹 데이입니다.',
    date: new Date('2025-02-02T10:00:00'),
    locationName: '전주 한옥 카페',
    locationAddress: '전북 전주시 완산구 풍남동 123',
    rsvpCount: 8,
    maxAttendees: 10,
    tags: ['coworking', 'hanok'],
    category: 'coworking',
    hostName: '도한옥',
    hostAvatar: '/avatars/host16.jpg',
  },
];

// 밋업 상세 정보 (가짜 참가자 데이터 포함)
export const meetupDetails: Record<string, MeetupDetail> = {
  m1: {
    ...meetups[0],
    longDescription: `매주 토요일 저녁, 강남역 근처 카페에서 열리는 디지털 노마드 네트워킹 모임입니다.

프리랜서, 원격근무자, 1인 창업가 등 다양한 배경의 노마드들이 모여 경험을 공유하고 새로운 인연을 만듭니다.

가벼운 자기소개 후 자유롭게 대화하는 형식으로 진행됩니다.`,
    attendees: generateAttendees(23),
    agenda: ['19:00 - 모임 시작 및 자기소개', '19:30 - 자유 네트워킹', '21:00 - 마무리'],
  },
  m2: {
    ...meetups[1],
    longDescription: `해운대 바다를 바라보며 맛있는 브런치와 함께하는 캐주얼 모임입니다.

부산에서 활동하는 노마드들과 편안한 분위기에서 이야기 나눌 수 있습니다.`,
    attendees: generateAttendees(15),
  },
  m3: {
    ...meetups[2],
    longDescription: `한 달에 한 번 제주에서 열리는 노마드 네트워킹입니다.

제주 워케이션을 즐기는 분들, 제주에 정착한 노마드분들 모두 환영합니다!`,
    attendees: generateAttendees(18),
    requirements: ['노트북 지참 권장', '간단한 자기소개 준비'],
  },
  m4: {
    ...meetups[3],
    longDescription: `프론트엔드 개발자들이 모여 최신 기술 트렌드를 공부하고 토론하는 스터디 그룹입니다.

React, Vue, Next.js 등 다양한 주제를 다룹니다.`,
    attendees: generateAttendees(8),
    requirements: ['노트북 필수', '기본적인 JavaScript 지식'],
    agenda: ['19:30 - 이번 주 주제 발표', '20:00 - 토론 및 Q&A', '21:00 - 다음 주 주제 선정'],
  },
  m5: {
    ...meetups[4],
    longDescription: `강릉의 아름다운 바다를 보며 함께 일하는 코워킹 데이입니다.

각자 작업을 하다가 점심은 함께 먹으며 교류합니다.`,
    attendees: generateAttendees(12),
  },
  m6: {
    ...meetups[5],
    longDescription: `Figma를 활용한 실전 UI 디자인 워크샵입니다.

디자인 시스템 구축부터 프로토타이핑까지 실습을 통해 배웁니다.`,
    attendees: generateAttendees(20),
    requirements: ['노트북 필수', 'Figma 계정 생성'],
    agenda: ['14:00 - 디자인 시스템 이론', '15:00 - 실습 1: 컴포넌트 만들기', '16:30 - 실습 2: 프로토타이핑', '17:30 - Q&A 및 마무리'],
  },
};

// 가짜 참가자 생성 함수
function generateAttendees(count: number): MeetupAttendee[] {
  const names = ['김민수', '이지연', '박준혁', '최수진', '정현우', '강서연', '조민재', '윤하늘', '임도현', '한소율',
    '신재원', '오예진', '서동훈', '권나연', '황지민', '문성호', '배유나', '류건우', '안채원', '전민준',
    '홍서준', '유지아', '장현서', '손예린', '송민호', '노수빈', '하지훈', '고은서', '백승현', '양시우'];

  return Array.from({ length: count }, (_, i) => ({
    id: `a${i + 1}`,
    name: names[i % names.length],
    avatar: `/avatars/user${(i % 20) + 1}.jpg`,
    joinedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  }));
}

// 헬퍼 함수들
export function getMeetupById(id: string): Meetup | undefined {
  return meetups.find((m) => m.id === id);
}

export function getMeetupDetailById(id: string): MeetupDetail | undefined {
  if (meetupDetails[id]) {
    return meetupDetails[id];
  }
  const meetup = getMeetupById(id);
  if (meetup) {
    return {
      ...meetup,
      longDescription: meetup.description,
      attendees: generateAttendees(meetup.rsvpCount),
    };
  }
  return undefined;
}

export function getMeetupsByCity(cityName: string): Meetup[] {
  if (cityName === 'all' || !cityName) {
    return meetups;
  }
  return meetups.filter((m) => m.cityName === cityName);
}

export function getUniqueCities(): string[] {
  return [...new Set(meetups.map((m) => m.cityName))];
}

export const stats: Stats = {
  totalCities: 50,
  activeUsers: 12450,
  reviewCount: 2847,
  meetupCount: 355,
  monthlyMessages: 45200,
  monthlyVisitors: 124000,
  growthRate: 35,
};
