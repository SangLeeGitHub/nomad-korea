import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock supabase server client
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

import { getCities, getCityBySlug, getCityDetailBySlug } from '@/lib/dal/cities'

// Sample DB row (snake_case)
const cityRow = {
  id: 'city-seoul',
  slug: 'seoul',
  name: '서울',
  name_en: 'Seoul',
  region: '수도권',
  rank: 1,
  overall_score: '4.5',
  thumbnail_url: '/thumb.jpg',
  hero_image_url: '/hero.jpg',
  gallery_urls: ['/g1.jpg'],
  monthly_cost: 1500000,
  cafe_count: 320,
  internet_speed: 200,
  transit_score: 5,
  like_count: 100,
  dislike_count: 10,
  current_temp: '22',
  feels_like: '20',
  weather_icon: '☀️',
  air_quality: 3,
  active_nomads: 450,
  review_count: 85,
  description: '한국의 수도',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  city_badges: [
    {
      display_order: 1,
      badges: { id: 'b1', type: 'feature', label: '카페', icon: '☕', color: 'amber' },
    },
    {
      display_order: 2,
      badges: { id: 'b2', type: 'status', label: '인기', icon: '🔥', color: 'red' },
    },
  ],
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getCities', () => {
  it('도시 목록을 camelCase로 매핑하여 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [cityRow], error: null })

    const result = await getCities()

    expect(mockSupabase.from).toHaveBeenCalledWith('cities')
    expect(result).toHaveLength(1)
    expect(result[0].nameEn).toBe('Seoul')
    expect(result[0].monthlyCost).toBe(1500000)
    expect(result[0].overallScore).toBe(4.5)
    expect(result[0].currentTemp).toBe(22)
  })

  it('배지를 display_order 순서로 정렬하여 반환한다', async () => {
    const unordered = {
      ...cityRow,
      city_badges: [
        { display_order: 2, badges: { id: 'b2', type: 'status', label: '인기', icon: '🔥', color: 'red' } },
        { display_order: 1, badges: { id: 'b1', type: 'feature', label: '카페', icon: '☕', color: 'amber' } },
      ],
    }
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [unordered], error: null })

    const result = await getCities()
    expect(result[0].badges[0].id).toBe('b1')
    expect(result[0].badges[1].id).toBe('b2')
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getCities()
    expect(result).toEqual([])
  })

  it('gallery_urls가 null이면 빈 배열로 대체한다', async () => {
    const row = { ...cityRow, gallery_urls: null }
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [row], error: null })

    const result = await getCities()
    expect(result[0].galleryUrls).toEqual([])
  })
})

describe('getCityBySlug', () => {
  it('slug로 도시를 조회하여 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: cityRow, error: null })

    const result = await getCityBySlug('seoul')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('slug', 'seoul')
    expect(result).not.toBeNull()
    expect(result!.name).toBe('서울')
  })

  it('존재하지 않는 slug는 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getCityBySlug('nonexistent')
    expect(result).toBeNull()
  })
})

describe('getCityDetailBySlug', () => {
  it('도시 상세 정보를 병렬로 조회하여 반환한다', async () => {
    // First call: city query
    mockQueryBuilder.single.mockResolvedValueOnce({ data: cityRow, error: null })

    // Then Promise.all: details, workspaces, reviews
    const detailBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          city_id: 'city-seoul',
          long_description: '서울 상세 설명',
          pros: ['교통 좋음'],
          cons: ['물가 비쌈'],
          recommended_stay: '3개월',
          best_seasons: ['봄', '가을'],
        },
        error: null,
      }),
    }
    const workspaceBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          {
            id: 'w1', name: '카페1', type: 'cafe', address: '주소1',
            rating: '4.5', price_range: '₩₩', wifi_speed: 100,
            has_outlet: true, open_hours: '09:00-22:00',
          },
        ],
        error: null,
      }),
    }
    const reviewBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({
        data: [
          {
            id: 'r1', user_id: 'u1', user_name: '김', user_avatar: '/a.jpg',
            rating: 4, content: '좋아요', stay_duration: '1개월',
            visit_date: '2024-03', helpful: 5,
          },
        ],
        error: null,
      }),
    }

    // Override from() for subsequent calls
    let callIdx = 0
    mockSupabase.from.mockImplementation((table: string) => {
      callIdx++
      if (callIdx === 1) return mockQueryBuilder // cities (initial)
      if (table === 'city_details') return detailBuilder
      if (table === 'workspaces') return workspaceBuilder
      if (table === 'reviews') return reviewBuilder
      return mockQueryBuilder
    })

    const result = await getCityDetailBySlug('seoul')

    expect(result).not.toBeNull()
    expect(result!.city.name).toBe('서울')
    expect(result!.longDescription).toBe('서울 상세 설명')
    expect(result!.pros).toEqual(['교통 좋음'])
    expect(result!.workspaces).toHaveLength(1)
    expect(result!.workspaces[0].rating).toBe(4.5)
    expect(result!.reviews).toHaveLength(1)
  })

  it('도시가 없으면 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getCityDetailBySlug('nonexistent')
    expect(result).toBeNull()
  })
})
