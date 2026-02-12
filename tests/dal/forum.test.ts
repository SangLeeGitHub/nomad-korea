import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  single: vi.fn(),
}

const mockSupabase = {
  from: vi.fn((_table: string): any => mockQueryBuilder),
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}))

import { getAllPosts, getPostById, getCommentsByPostId } from '@/lib/dal/forum'

const postRow = {
  id: 'post-1',
  category: 'question',
  title: '서울 카페 추천',
  content: '카페 추천해주세요',
  author_id: 'user-1',
  author_name: '김노마드',
  author_avatar: '/avatar.jpg',
  created_at: '2024-07-10T10:00:00Z',
  view_count: 42,
  like_count: 5,
  comment_count: 3,
  is_pinned: false,
}

const commentRow = {
  id: 'comment-1',
  post_id: 'post-1',
  author_id: 'user-2',
  author_name: '이노마드',
  author_avatar: '/avatar2.jpg',
  content: '좋은 카페 많아요',
  created_at: '2024-07-10T11:00:00Z',
  like_count: 2,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllPosts', () => {
  it('게시글을 is_pinned, created_at 내림차순으로 조회한다', async () => {
    // order is called twice: first for is_pinned, then for created_at
    mockQueryBuilder.order
      .mockReturnValueOnce(mockQueryBuilder)  // is_pinned
    mockQueryBuilder.order
      .mockResolvedValueOnce({ data: [postRow], error: null })  // created_at → resolves

    const result = await getAllPosts()

    expect(mockSupabase.from).toHaveBeenCalledWith('forum_posts')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('is_pinned', { ascending: false })
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('created_at', { ascending: false })
    expect(result).toHaveLength(1)
  })

  it('category를 ForumCategory로 캐스팅한다', async () => {
    mockQueryBuilder.order.mockReturnValueOnce(mockQueryBuilder)
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [postRow], error: null })

    const result = await getAllPosts()
    expect(result[0].category).toBe('question')
  })

  it('camelCase로 매핑한다', async () => {
    mockQueryBuilder.order.mockReturnValueOnce(mockQueryBuilder)
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [postRow], error: null })

    const result = await getAllPosts()
    expect(result[0].authorName).toBe('김노마드')
    expect(result[0].viewCount).toBe(42)
    expect(result[0].createdAt).toBeInstanceOf(Date)
    expect(result[0].isPinned).toBe(false)
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockReturnValueOnce(mockQueryBuilder)
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getAllPosts()
    expect(result).toEqual([])
  })
})

describe('getPostById', () => {
  it('ID로 게시글을 조회하여 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: postRow, error: null })

    const result = await getPostById('post-1')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('id', 'post-1')
    expect(result).not.toBeNull()
    expect(result!.title).toBe('서울 카페 추천')
  })

  it('존재하지 않는 ID는 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getPostById('nonexistent')
    expect(result).toBeNull()
  })
})

describe('getCommentsByPostId', () => {
  it('게시글 댓글을 created_at 오름차순으로 조회한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [commentRow], error: null })

    const result = await getCommentsByPostId('post-1')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('post_id', 'post-1')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('created_at', { ascending: true })
    expect(result).toHaveLength(1)
    expect(result[0].authorName).toBe('이노마드')
    expect(result[0].createdAt).toBeInstanceOf(Date)
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getCommentsByPostId('post-1')
    expect(result).toEqual([])
  })
})
