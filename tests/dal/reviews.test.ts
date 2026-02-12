import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  single: vi.fn(),
}

const mockSupabase = {
  from: vi.fn((_table: string): any => mockQueryBuilder),
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}))

// Mock crypto.randomUUID
vi.stubGlobal('crypto', { randomUUID: () => 'test-uuid-1234' })

import { getReviewsByCityId, createReview } from '@/lib/dal/reviews'

const reviewRow = {
  id: 'r1',
  user_id: 'user-1',
  user_name: '김노마드',
  user_avatar: '/avatar.jpg',
  rating: 4,
  content: '좋아요',
  stay_duration: '1개월',
  visit_date: '2024-03',
  helpful: 5,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getReviewsByCityId', () => {
  it('도시 리뷰를 created_at 내림차순으로 조회한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [reviewRow], error: null })

    const result = await getReviewsByCityId('city-seoul')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('city_id', 'city-seoul')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('created_at', { ascending: false })
    expect(result).toHaveLength(1)
  })

  it('camelCase로 매핑한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [reviewRow], error: null })

    const result = await getReviewsByCityId('city-seoul')
    expect(result[0].userName).toBe('김노마드')
    expect(result[0].userAvatar).toBe('/avatar.jpg')
    expect(result[0].stayDuration).toBe('1개월')
    expect(result[0].visitDate).toBe('2024-03')
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getReviewsByCityId('city-seoul')
    expect(result).toEqual([])
  })
})

describe('createReview', () => {
  it('리뷰를 생성하고 매핑된 결과를 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: reviewRow, error: null })

    const result = await createReview({
      cityId: 'city-seoul',
      userId: 'user-1',
      userName: '김노마드',
      userAvatar: '/avatar.jpg',
      rating: 4,
      content: '좋아요',
      stayDuration: '1개월',
      visitDate: '2024-03',
    })

    expect(result).not.toBeNull()
    expect(result!.userName).toBe('김노마드')
    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        city_id: 'city-seoul',
        helpful: 0,
      })
    )
  })

  it('r- prefix와 UUID로 ID를 생성한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: reviewRow, error: null })

    await createReview({
      cityId: 'city-seoul',
      userId: 'user-1',
      userName: '김노마드',
      userAvatar: '/avatar.jpg',
      rating: 4,
      content: '좋아요',
      stayDuration: '1개월',
      visitDate: '2024-03',
    })

    expect(mockQueryBuilder.insert).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'r-test-uuid-1234' })
    )
  })

  it('에러 시 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await createReview({
      cityId: 'city-seoul',
      userId: 'user-1',
      userName: '김노마드',
      userAvatar: '/avatar.jpg',
      rating: 4,
      content: '좋아요',
      stayDuration: '1개월',
      visitDate: '2024-03',
    })
    expect(result).toBeNull()
  })
})
