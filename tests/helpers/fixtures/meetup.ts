import type { Meetup, MeetupDetail, MeetupAttendee } from '@/lib/types'

export function mockMeetup(overrides?: Partial<Meetup>): Meetup {
  return {
    id: 'meetup-1',
    cityId: 'city-seoul',
    cityName: '서울',
    title: '서울 노마드 네트워킹',
    description: '서울에서 디지털 노마드 네트워킹 모임',
    date: new Date('2024-07-15T14:00:00'),
    locationName: '강남 코워킹스페이스',
    locationAddress: '서울시 강남구 역삼동 123',
    rsvpCount: 15,
    maxAttendees: 30,
    tags: ['networking', 'nomad', 'tech'],
    category: 'networking',
    hostName: '김노마드',
    hostAvatar: '/avatars/host1.jpg',
    ...overrides,
  }
}

export function mockMeetupAttendee(overrides?: Partial<MeetupAttendee>): MeetupAttendee {
  return {
    id: 'attendee-1',
    name: '참석자1',
    avatar: '/avatars/att1.jpg',
    joinedAt: new Date('2024-07-01'),
    ...overrides,
  }
}

export function mockMeetupDetail(overrides?: Partial<MeetupDetail>): MeetupDetail {
  return {
    ...mockMeetup(),
    longDescription: '서울에서 디지털 노마드들이 모여 네트워킹하는 정기 모임입니다.',
    attendees: [mockMeetupAttendee()],
    requirements: ['노트북 지참'],
    agenda: ['자기소개', '프로젝트 공유', '네트워킹'],
    ...overrides,
  }
}
