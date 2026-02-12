import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  neq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  single: vi.fn(),
}

const mockSupabase = {
  from: vi.fn((_table: string): any => mockQueryBuilder),
}

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(mockSupabase)),
}))

import { getAllGuides, getGuideBySlug, getRelatedGuides } from '@/lib/dal/guides'

const guideRow = {
  id: 'guide-1',
  slug: 'korea-visa',
  category: 'visa',
  title: '한국 비자 가이드',
  summary: '비자 정보',
  content: '상세 내용',
  thumbnail_url: '/thumb.jpg',
  read_time: 10,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-06-15T00:00:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllGuides', () => {
  it('가이드를 created_at 내림차순으로 조회한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [guideRow], error: null })

    const result = await getAllGuides()

    expect(mockSupabase.from).toHaveBeenCalledWith('guides')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('created_at', { ascending: false })
    expect(result).toHaveLength(1)
  })

  it('camelCase로 매핑한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [guideRow], error: null })

    const result = await getAllGuides()
    expect(result[0].thumbnailUrl).toBe('/thumb.jpg')
    expect(result[0].readTime).toBe(10)
    expect(result[0].createdAt).toBeInstanceOf(Date)
    expect(result[0].updatedAt).toBeInstanceOf(Date)
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getAllGuides()
    expect(result).toEqual([])
  })
})

describe('getGuideBySlug', () => {
  it('slug로 가이드를 조회하여 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: guideRow, error: null })

    const result = await getGuideBySlug('korea-visa')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('slug', 'korea-visa')
    expect(result).not.toBeNull()
    expect(result!.title).toBe('한국 비자 가이드')
    expect(result!.category).toBe('visa')
  })

  it('존재하지 않는 slug는 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getGuideBySlug('nonexistent')
    expect(result).toBeNull()
  })
})

describe('getRelatedGuides', () => {
  it('현재 가이드와 같은 카테고리의 다른 가이드를 반환한다', async () => {
    // First call: getGuideBySlug (inside getRelatedGuides)
    mockQueryBuilder.single.mockResolvedValueOnce({ data: guideRow, error: null })

    // Second call: related guides query
    const relatedRow = { ...guideRow, id: 'guide-2', slug: 'visa-tips', title: '비자 팁' }
    mockQueryBuilder.limit.mockResolvedValueOnce({ data: [relatedRow], error: null })

    const result = await getRelatedGuides('korea-visa', 3)

    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('visa-tips')
  })

  it('현재 가이드가 없으면 빈 배열을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getRelatedGuides('nonexistent')
    expect(result).toEqual([])
  })
})
