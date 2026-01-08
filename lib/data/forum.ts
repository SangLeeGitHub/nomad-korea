import type { ForumPost, ForumComment, ForumCategory } from '@/lib/types';

export const forumPosts: ForumPost[] = [
  // 질문 카테고리
  {
    id: 'post-1',
    category: 'question',
    title: '제주도에서 한 달 살기 비용이 얼마나 들까요?',
    content: '안녕하세요! 다음 달부터 제주도에서 한 달 살기를 계획 중인데요. 숙소, 식비, 교통비 등 전체적인 비용이 어느 정도 될지 궁금합니다. 경험 있으신 분들 조언 부탁드려요!',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    createdAt: new Date('2024-01-15T09:30:00'),
    viewCount: 245,
    likeCount: 12,
    commentCount: 8,
    isPinned: false,
  },
  {
    id: 'post-2',
    category: 'question',
    title: '부산 해운대 근처 코워킹 스페이스 추천해주세요',
    content: '해운대 근처에서 일할 수 있는 좋은 코워킹 스페이스를 찾고 있어요. 와이파이 속도가 빠르고 조용한 곳이면 좋겠습니다.',
    authorId: 'user-2',
    authorName: '디지털노마드_박',
    authorAvatar: '/avatars/user2.jpg',
    createdAt: new Date('2024-01-14T14:20:00'),
    viewCount: 156,
    likeCount: 5,
    commentCount: 6,
    isPinned: false,
  },
  {
    id: 'post-3',
    category: 'question',
    title: '외국인 노마드 친구가 비자 문제로 고민 중인데요',
    content: '미국에서 온 친구가 한국에서 장기 체류하면서 원격 근무를 하고 싶어하는데, 어떤 비자가 적합한지 아시는 분 계실까요?',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    createdAt: new Date('2024-01-13T11:00:00'),
    viewCount: 312,
    likeCount: 18,
    commentCount: 12,
    isPinned: false,
  },

  // 정보공유 카테고리
  {
    id: 'post-4',
    category: 'info',
    title: '[정보] 2024년 디지털노마드 비자 정책 변경 안내',
    content: '최근 한국 정부에서 발표한 디지털노마드 비자 관련 정책 변경사항을 정리했습니다. 주요 변경점은 체류 기간 연장과 신청 절차 간소화입니다.',
    authorId: 'user-4',
    authorName: '정보통_이',
    authorAvatar: '/avatars/user4.jpg',
    createdAt: new Date('2024-01-16T10:00:00'),
    viewCount: 892,
    likeCount: 56,
    commentCount: 23,
    isPinned: true,
  },
  {
    id: 'post-5',
    category: 'info',
    title: '강릉 카페 투어 후기 - 노마드 작업하기 좋은 곳 5곳',
    content: '지난주 강릉에서 일주일간 머물면서 여러 카페를 방문했어요. 그 중 노마드 작업에 최적인 카페 5곳을 소개합니다!',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    createdAt: new Date('2024-01-12T16:45:00'),
    viewCount: 423,
    likeCount: 34,
    commentCount: 15,
    isPinned: false,
  },
  {
    id: 'post-6',
    category: 'info',
    title: '대전 유성구 숨은 맛집 리스트 공유',
    content: '대전에서 3개월 살면서 발견한 로컬 맛집들을 공유합니다. 가성비 좋고 맛있는 곳 위주로 정리했어요.',
    authorId: 'user-6',
    authorName: '대전_노마드',
    authorAvatar: '/avatars/user6.jpg',
    createdAt: new Date('2024-01-11T13:30:00'),
    viewCount: 287,
    likeCount: 21,
    commentCount: 9,
    isPinned: false,
  },

  // 구인구직 카테고리
  {
    id: 'post-7',
    category: 'job',
    title: '[구인] 프리랜서 프론트엔드 개발자 구합니다',
    content: 'React/Next.js 경험이 있는 프리랜서 개발자를 찾습니다. 원격 근무 가능하며, 3개월 프로젝트입니다. 관심 있으신 분은 DM 주세요!',
    authorId: 'user-7',
    authorName: '스타트업_대표',
    authorAvatar: '/avatars/user7.jpg',
    createdAt: new Date('2024-01-15T11:20:00'),
    viewCount: 534,
    likeCount: 8,
    commentCount: 14,
    isPinned: false,
  },
  {
    id: 'post-8',
    category: 'job',
    title: '[구직] 3년차 UX 디자이너, 원격 프로젝트 찾습니다',
    content: '현재 제주도에서 노마드 생활 중인 UX 디자이너입니다. Figma, Sketch 능숙하고, 사용자 리서치 경험도 있습니다.',
    authorId: 'user-8',
    authorName: '디자이너_정',
    authorAvatar: '/avatars/user8.jpg',
    createdAt: new Date('2024-01-14T09:00:00'),
    viewCount: 198,
    likeCount: 15,
    commentCount: 7,
    isPinned: false,
  },
  {
    id: 'post-9',
    category: 'job',
    title: '[구인] 영어 콘텐츠 에디터 파트타임 모집',
    content: '영어 블로그 콘텐츠 에디터를 모집합니다. 주 10-15시간, 완전 원격 근무. 영어 native 수준 필수.',
    authorId: 'user-9',
    authorName: '콘텐츠_회사',
    authorAvatar: '/avatars/user9.jpg',
    createdAt: new Date('2024-01-13T15:40:00'),
    viewCount: 276,
    likeCount: 6,
    commentCount: 11,
    isPinned: false,
  },

  // 자유게시판 카테고리
  {
    id: 'post-10',
    category: 'free',
    title: '오늘 서울 날씨 너무 좋네요!',
    content: '한강 근처 카페에서 작업 중인데, 창밖으로 보이는 풍경이 너무 예뻐서 공유해봅니다. 다들 오늘 하루도 화이팅!',
    authorId: 'user-10',
    authorName: '한강_러버',
    authorAvatar: '/avatars/user10.jpg',
    createdAt: new Date('2024-01-16T14:00:00'),
    viewCount: 89,
    likeCount: 23,
    commentCount: 5,
    isPinned: false,
  },
  {
    id: 'post-11',
    category: 'free',
    title: '노마드 생활 1년차 소감',
    content: '작년 이맘때 회사를 그만두고 노마드 생활을 시작했는데, 벌써 1년이 됐네요. 힘든 점도 많았지만 정말 값진 경험이었습니다.',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    createdAt: new Date('2024-01-15T20:30:00'),
    viewCount: 456,
    likeCount: 67,
    commentCount: 28,
    isPinned: false,
  },
  {
    id: 'post-12',
    category: 'free',
    title: '이번 주말 부산 밋업 같이 가실 분?',
    content: '이번 주 토요일 부산 밋업에 참석하려는데, 서울에서 같이 KTX 타고 가실 분 계실까요?',
    authorId: 'user-2',
    authorName: '디지털노마드_박',
    authorAvatar: '/avatars/user2.jpg',
    createdAt: new Date('2024-01-14T18:00:00'),
    viewCount: 134,
    likeCount: 9,
    commentCount: 6,
    isPinned: false,
  },
];

export const forumComments: ForumComment[] = [
  // post-1 댓글
  {
    id: 'comment-1',
    postId: 'post-1',
    authorId: 'user-5',
    authorName: '카페러버_최',
    authorAvatar: '/avatars/user5.jpg',
    content: '저는 작년에 제주에서 한 달 살았는데, 숙소 80만원, 식비 50만원, 교통비 20만원 정도 들었어요. 렌트카 없이 버스로 다녔습니다!',
    createdAt: new Date('2024-01-15T10:15:00'),
    likeCount: 8,
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    authorId: 'user-6',
    authorName: '대전_노마드',
    authorAvatar: '/avatars/user6.jpg',
    content: '렌트카 하면 교통비가 많이 늘어나요. 하지만 제주도 곳곳을 다니려면 차가 있는 게 편하긴 합니다.',
    createdAt: new Date('2024-01-15T11:30:00'),
    likeCount: 3,
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    content: '숙소는 에어비앤비보다 월세가 더 저렴할 수 있어요. 부동산에 문의해보세요!',
    createdAt: new Date('2024-01-15T14:00:00'),
    likeCount: 12,
  },

  // post-4 댓글
  {
    id: 'comment-4',
    postId: 'post-4',
    authorId: 'user-1',
    authorName: '노마드_김',
    authorAvatar: '/avatars/user1.jpg',
    content: '좋은 정보 감사합니다! 외국인 친구들한테 공유해야겠어요.',
    createdAt: new Date('2024-01-16T11:00:00'),
    likeCount: 5,
  },
  {
    id: 'comment-5',
    postId: 'post-4',
    authorId: 'user-7',
    authorName: '스타트업_대표',
    authorAvatar: '/avatars/user7.jpg',
    content: '체류 기간이 2년으로 늘어났다니 정말 반가운 소식이네요!',
    createdAt: new Date('2024-01-16T12:30:00'),
    likeCount: 7,
  },

  // post-7 댓글
  {
    id: 'comment-6',
    postId: 'post-7',
    authorId: 'user-3',
    authorName: '서울_개발자',
    authorAvatar: '/avatars/user3.jpg',
    content: '포트폴리오 보내드려도 될까요? 5년차 프론트엔드 개발자입니다.',
    createdAt: new Date('2024-01-15T13:00:00'),
    likeCount: 2,
  },

  // post-11 댓글
  {
    id: 'comment-7',
    postId: 'post-11',
    authorId: 'user-4',
    authorName: '정보통_이',
    authorAvatar: '/avatars/user4.jpg',
    content: '축하드려요! 1년이면 정말 대단하시네요. 앞으로도 좋은 경험 많이 하시길!',
    createdAt: new Date('2024-01-15T21:00:00'),
    likeCount: 15,
  },
  {
    id: 'comment-8',
    postId: 'post-11',
    authorId: 'user-8',
    authorName: '디자이너_정',
    authorAvatar: '/avatars/user8.jpg',
    content: '저도 이제 막 시작했는데, 선배님 글 보니 용기가 나네요!',
    createdAt: new Date('2024-01-15T22:15:00'),
    likeCount: 8,
  },
];

// 카테고리 라벨 매핑
export const categoryLabels: Record<ForumCategory, string> = {
  question: '질문',
  info: '정보공유',
  job: '구인구직',
  free: '자유게시판',
};

// 카테고리 색상 매핑
export const categoryColors: Record<ForumCategory, string> = {
  question: 'bg-blue-100 text-blue-800',
  info: 'bg-green-100 text-green-800',
  job: 'bg-purple-100 text-purple-800',
  free: 'bg-gray-100 text-gray-800',
};

// 헬퍼 함수들
export function getAllPosts(): ForumPost[] {
  return [...forumPosts].sort((a, b) => {
    // 고정글 먼저
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // 최신순
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export function getPostById(id: string): ForumPost | undefined {
  return forumPosts.find((post) => post.id === id);
}

export function getPostsByCategory(category: ForumCategory): ForumPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getCommentsByPostId(postId: string): ForumComment[] {
  return forumComments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
