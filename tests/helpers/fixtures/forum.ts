import type { ForumPost, ForumComment } from '@/lib/types'

export function mockForumPost(overrides?: Partial<ForumPost>): ForumPost {
  return {
    id: 'post-1',
    category: 'question',
    title: '서울에서 추천 카페 있나요?',
    content: '서울에서 작업하기 좋은 카페를 추천해주세요.',
    authorId: 'user-1',
    authorName: '김노마드',
    authorAvatar: '/avatars/user1.jpg',
    createdAt: new Date('2024-07-10T10:00:00'),
    viewCount: 42,
    likeCount: 5,
    commentCount: 3,
    isPinned: false,
    ...overrides,
  }
}

export function mockForumComment(overrides?: Partial<ForumComment>): ForumComment {
  return {
    id: 'comment-1',
    postId: 'post-1',
    authorId: 'user-2',
    authorName: '이노마드',
    authorAvatar: '/avatars/user2.jpg',
    content: '강남에 좋은 카페 많아요!',
    createdAt: new Date('2024-07-10T11:00:00'),
    likeCount: 2,
    ...overrides,
  }
}
