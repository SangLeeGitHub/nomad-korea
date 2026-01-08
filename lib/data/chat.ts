import type { ChatChannel, ChatMessage } from '@/lib/types';

export const chatChannels: ChatChannel[] = [
  {
    id: 'channel-general',
    name: '전체',
    description: '노마드코리아 전체 채팅방',
    memberCount: 523,
  },
  {
    id: 'channel-seoul',
    name: '서울',
    description: '서울 노마드들의 채팅방',
    memberCount: 234,
  },
  {
    id: 'channel-busan',
    name: '부산',
    description: '부산 노마드들의 채팅방',
    memberCount: 156,
  },
  {
    id: 'channel-jeju',
    name: '제주',
    description: '제주 노마드들의 채팅방',
    memberCount: 189,
  },
  {
    id: 'channel-daejeon',
    name: '대전',
    description: '대전 노마드들의 채팅방',
    memberCount: 87,
  },
  {
    id: 'channel-gangneung',
    name: '강릉',
    description: '강릉 노마드들의 채팅방',
    memberCount: 64,
  },
];

export const chatMessages: ChatMessage[] = [
  // 전체 채널 메시지
  {
    id: 'msg-1',
    channelId: 'channel-general',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    content: '안녕하세요! 오늘 날씨가 정말 좋네요 ☀️',
    createdAt: new Date('2024-01-16T09:00:00'),
  },
  {
    id: 'msg-2',
    channelId: 'channel-general',
    authorId: 'user-2',
    authorName: '디지털노마드_박',
    authorAvatar: '/avatars/user2.jpg',
    content: '네! 저도 오늘 밖에서 작업할까 생각 중이에요',
    createdAt: new Date('2024-01-16T09:05:00'),
  },
  {
    id: 'msg-3',
    channelId: 'channel-general',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    content: '혹시 이번 주 밋업 참석하시는 분 계세요?',
    createdAt: new Date('2024-01-16T09:10:00'),
  },
  {
    id: 'msg-4',
    channelId: 'channel-general',
    authorId: 'user-4',
    authorName: '정보통_이',
    authorAvatar: '/avatars/user4.jpg',
    content: '저요! 부산 밋업 갑니다 🙋‍♂️',
    createdAt: new Date('2024-01-16T09:12:00'),
  },
  {
    id: 'msg-5',
    channelId: 'channel-general',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    content: '제주 카페 추천 좀!',
    createdAt: new Date('2024-01-16T09:30:00'),
  },
  {
    id: 'msg-6',
    channelId: 'channel-general',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    content: '델문도 좋아요',
    createdAt: new Date('2024-01-16T09:32:00'),
  },

  // 서울 채널 메시지
  {
    id: 'msg-7',
    channelId: 'channel-seoul',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    content: '강남 코워킹 어때요?',
    createdAt: new Date('2024-01-16T10:00:00'),
  },
  {
    id: 'msg-8',
    channelId: 'channel-seoul',
    authorId: 'user-6',
    authorName: '대전_노마드',
    authorAvatar: '/avatars/user6.jpg',
    content: '위워크 삼성역점 추천이요!',
    createdAt: new Date('2024-01-16T10:05:00'),
  },
  {
    id: 'msg-9',
    channelId: 'channel-seoul',
    authorId: 'user-7',
    authorName: '스타트업_대표',
    authorAvatar: '/avatars/user7.jpg',
    content: '패스트파이브도 괜찮아요. 하루 이용권 있어서 편해요',
    createdAt: new Date('2024-01-16T10:10:00'),
  },
  {
    id: 'msg-10',
    channelId: 'channel-seoul',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    content: '감사합니다! 내일 가볼게요',
    createdAt: new Date('2024-01-16T10:15:00'),
  },

  // 부산 채널 메시지
  {
    id: 'msg-11',
    channelId: 'channel-busan',
    authorId: 'user-2',
    authorName: '디지털노마드_박',
    authorAvatar: '/avatars/user2.jpg',
    content: '해운대 날씨 최고에요! 🌊',
    createdAt: new Date('2024-01-16T11:00:00'),
  },
  {
    id: 'msg-12',
    channelId: 'channel-busan',
    authorId: 'user-8',
    authorName: '디자이너_정',
    authorAvatar: '/avatars/user8.jpg',
    content: '해운대 카페 어디서 작업하세요?',
    createdAt: new Date('2024-01-16T11:10:00'),
  },
  {
    id: 'msg-13',
    channelId: 'channel-busan',
    authorId: 'user-2',
    authorName: '디지털노마드_박',
    authorAvatar: '/avatars/user2.jpg',
    content: '모모스커피 추천해요. 뷰도 좋고 와이파이 빨라요',
    createdAt: new Date('2024-01-16T11:15:00'),
  },
  {
    id: 'msg-14',
    channelId: 'channel-busan',
    authorId: 'user-4',
    authorName: '정보통_이',
    authorAvatar: '/avatars/user4.jpg',
    content: '이번 주 토요일 밋업 다들 오시죠?',
    createdAt: new Date('2024-01-16T11:30:00'),
  },

  // 제주 채널 메시지
  {
    id: 'msg-15',
    channelId: 'channel-jeju',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    content: '오늘 한라산 등산 다녀왔어요!',
    createdAt: new Date('2024-01-16T12:00:00'),
  },
  {
    id: 'msg-16',
    channelId: 'channel-jeju',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    content: '오~ 정상까지 다녀오셨어요?',
    createdAt: new Date('2024-01-16T12:10:00'),
  },
  {
    id: 'msg-17',
    channelId: 'channel-jeju',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    content: '네! 날씨가 좋아서 정상까지 갔다 왔어요. 추천드려요!',
    createdAt: new Date('2024-01-16T12:15:00'),
  },
  {
    id: 'msg-18',
    channelId: 'channel-jeju',
    authorId: 'user-9',
    authorName: '콘텐츠_회사',
    authorAvatar: '/avatars/user9.jpg',
    content: '저도 다음주에 가볼게요!',
    createdAt: new Date('2024-01-16T12:20:00'),
  },

  // 대전 채널 메시지
  {
    id: 'msg-19',
    channelId: 'channel-daejeon',
    authorId: 'user-6',
    authorName: '대전_노마드',
    authorAvatar: '/avatars/user6.jpg',
    content: '유성구 맛집 새로 발견했어요!',
    createdAt: new Date('2024-01-16T13:00:00'),
  },
  {
    id: 'msg-20',
    channelId: 'channel-daejeon',
    authorId: 'user-10',
    authorName: '한강_러버',
    authorAvatar: '/avatars/user10.jpg',
    content: '어디예요? 저도 대전 가면 가볼게요',
    createdAt: new Date('2024-01-16T13:10:00'),
  },
  {
    id: 'msg-21',
    channelId: 'channel-daejeon',
    authorId: 'user-6',
    authorName: '대전_노마드',
    authorAvatar: '/avatars/user6.jpg',
    content: '성심당 근처에 있는 칼국수집이에요. DM으로 자세히 알려드릴게요!',
    createdAt: new Date('2024-01-16T13:15:00'),
  },

  // 강릉 채널 메시지
  {
    id: 'msg-22',
    channelId: 'channel-gangneung',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    content: '강릉 카페 투어 후기 포럼에 올렸어요!',
    createdAt: new Date('2024-01-16T14:00:00'),
  },
  {
    id: 'msg-23',
    channelId: 'channel-gangneung',
    authorId: 'user-8',
    authorName: '디자이너_정',
    authorAvatar: '/avatars/user8.jpg',
    content: '오 봤어요! 참고할게요',
    createdAt: new Date('2024-01-16T14:10:00'),
  },
  {
    id: 'msg-24',
    channelId: 'channel-gangneung',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    content: '다음달에 강릉 갈 예정인데 기대되네요!',
    createdAt: new Date('2024-01-16T14:20:00'),
  },
];

// 헬퍼 함수들
export function getChannels(): ChatChannel[] {
  return chatChannels;
}

export function getChannelById(id: string): ChatChannel | undefined {
  return chatChannels.find((channel) => channel.id === id);
}

export function getMessagesByChannelId(channelId: string): ChatMessage[] {
  return chatMessages
    .filter((message) => message.channelId === channelId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
