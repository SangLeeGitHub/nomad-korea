import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSupabase = {
  from: vi.fn(),
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}))

import { getStats } from '@/lib/dal/stats'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getStats', () => {
  it('4개 테이블의 count를 병렬 조회하여 반환한다', async () => {
    const createCountBuilder = (count: number) => ({
      select: vi.fn().mockResolvedValue({ count, error: null }),
    })

    mockSupabase.from.mockImplementation((table: string) => {
      switch (table) {
        case 'cities': return createCountBuilder(10)
        case 'meetups': return createCountBuilder(25)
        case 'reviews': return createCountBuilder(100)
        case 'chat_messages': return createCountBuilder(500)
        default: return createCountBuilder(0)
      }
    })

    const result = await getStats()

    expect(result.totalCities).toBe(10)
    expect(result.meetupCount).toBe(25)
    expect(result.reviewCount).toBe(100)
    expect(result.monthlyMessages).toBe(500)
  })

  it('하드코딩된 값을 포함한다', async () => {
    const createCountBuilder = (count: number) => ({
      select: vi.fn().mockResolvedValue({ count, error: null }),
    })

    mockSupabase.from.mockImplementation(() => createCountBuilder(0))

    const result = await getStats()

    expect(result.activeUsers).toBe(12450)
    expect(result.monthlyVisitors).toBe(124000)
    expect(result.growthRate).toBe(35)
  })

  it('count가 null이면 0으로 대체한다', async () => {
    const createCountBuilder = () => ({
      select: vi.fn().mockResolvedValue({ count: null, error: null }),
    })

    mockSupabase.from.mockImplementation(() => createCountBuilder())

    const result = await getStats()

    expect(result.totalCities).toBe(0)
    expect(result.meetupCount).toBe(0)
    expect(result.reviewCount).toBe(0)
    expect(result.monthlyMessages).toBe(0)
  })
})
