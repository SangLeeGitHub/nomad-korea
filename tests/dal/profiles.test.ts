import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  single: vi.fn(),
}

const mockSupabase = {
  from: vi.fn((_table: string): any => mockQueryBuilder),
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}))

import { getUserProfile, updateUserProfile } from '@/lib/dal/profiles'

const profileRow = {
  id: 'user-1',
  email: 'test@example.com',
  nickname: '김노마드',
  avatar: '/avatar.jpg',
  bio: '노마드 2년차',
  current_location: '서울',
  joined_at: '2024-01-01T00:00:00Z',
}

const visitedRow = {
  city_id: 'city-seoul',
  city_name: '서울',
  city_slug: 'seoul',
  visited_at: '2024-03-01T00:00:00Z',
  duration: '3개월',
}

const reviewRow = {
  id: 'r1',
  city_id: 'city-seoul',
  rating: 4,
  content: '좋아요',
  created_at: '2024-04-01T00:00:00Z',
  helpful: 10,
  cities: { name: '서울', slug: 'seoul' },
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getUserProfile', () => {
  it('프로필, 방문 도시, 리뷰를 병렬 조회하여 반환한다', async () => {
    const profileBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: profileRow, error: null }),
    }
    const visitedBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [visitedRow], error: null }),
    }
    const reviewBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [reviewRow], error: null }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return profileBuilder
      if (table === 'visited_cities') return visitedBuilder
      if (table === 'reviews') return reviewBuilder
      return mockQueryBuilder
    })

    const result = await getUserProfile('user-1')

    expect(result).not.toBeNull()
    expect(result!.nickname).toBe('김노마드')
    expect(result!.email).toBe('test@example.com')
    expect(result!.joinedAt).toBeInstanceOf(Date)
  })

  it('stats를 visited/reviews 개수로 계산한다', async () => {
    const profileBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: profileRow, error: null }),
    }
    const visitedBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [visitedRow, { ...visitedRow, city_id: 'city-busan' }], error: null }),
    }
    const reviewBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [reviewRow], error: null }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return profileBuilder
      if (table === 'visited_cities') return visitedBuilder
      if (table === 'reviews') return reviewBuilder
      return mockQueryBuilder
    })

    const result = await getUserProfile('user-1')

    expect(result!.stats.visitedCitiesCount).toBe(2)
    expect(result!.stats.reviewsCount).toBe(1)
    expect(result!.stats.meetupsAttended).toBe(0)
  })

  it('리뷰의 cities 조인에서 도시 이름/slug를 가져온다', async () => {
    const profileBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: profileRow, error: null }),
    }
    const visitedBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }
    const reviewBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [reviewRow], error: null }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return profileBuilder
      if (table === 'visited_cities') return visitedBuilder
      if (table === 'reviews') return reviewBuilder
      return mockQueryBuilder
    })

    const result = await getUserProfile('user-1')
    expect(result!.myReviews[0].cityName).toBe('서울')
    expect(result!.myReviews[0].citySlug).toBe('seoul')
  })

  it('프로필이 없으면 null을 반환한다', async () => {
    const profileBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: 'not found' } }),
    }
    const visitedBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }
    const reviewBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'profiles') return profileBuilder
      if (table === 'visited_cities') return visitedBuilder
      if (table === 'reviews') return reviewBuilder
      return mockQueryBuilder
    })

    const result = await getUserProfile('nonexistent')
    expect(result).toBeNull()
  })
})

describe('updateUserProfile', () => {
  beforeEach(() => {
    // Reset from to return the default mockQueryBuilder (which has update)
    mockSupabase.from.mockImplementation(() => mockQueryBuilder)
  })

  it('업데이트 성공 시 true를 반환한다', async () => {
    mockQueryBuilder.eq.mockResolvedValueOnce({ error: null })

    const result = await updateUserProfile('user-1', { nickname: '새이름' })
    expect(result).toBe(true)
  })

  it('업데이트 실패 시 false를 반환한다', async () => {
    mockQueryBuilder.eq.mockResolvedValueOnce({ error: { message: 'failed' } })

    const result = await updateUserProfile('user-1', { nickname: '새이름' })
    expect(result).toBe(false)
  })

  it('camelCase → snake_case로 변환하여 업데이트한다', async () => {
    mockQueryBuilder.eq.mockResolvedValueOnce({ error: null })

    await updateUserProfile('user-1', { currentLocation: '부산' })

    expect(mockQueryBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({ current_location: '부산' })
    )
  })
})
