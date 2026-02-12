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

import { getMeetups, getMeetupDetailById, getUniqueCities } from '@/lib/dal/meetups'

const meetupRow = {
  id: 'meetup-1',
  city_id: 'city-seoul',
  city_name: '서울',
  title: '서울 노마드 밋업',
  description: '네트워킹 모임',
  date: '2024-07-15T14:00:00Z',
  location_name: '강남 코워킹',
  location_address: '서울시 강남구',
  rsvp_count: 15,
  max_attendees: 30,
  tags: ['networking'],
  category: 'networking',
  host_name: '김호스트',
  host_avatar: '/host.jpg',
  image_url: null,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getMeetups', () => {
  it('밋업 목록을 camelCase로 매핑하여 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [meetupRow], error: null })

    const result = await getMeetups()

    expect(result).toHaveLength(1)
    expect(result[0].cityName).toBe('서울')
    expect(result[0].locationName).toBe('강남 코워킹')
    expect(result[0].rsvpCount).toBe(15)
    expect(result[0].date).toBeInstanceOf(Date)
  })

  it('image_url이 null이면 undefined로 변환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [meetupRow], error: null })

    const result = await getMeetups()
    expect(result[0].imageUrl).toBeUndefined()
  })

  it('tags가 null이면 빈 배열로 대체한다', async () => {
    const row = { ...meetupRow, tags: null }
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [row], error: null })

    const result = await getMeetups()
    expect(result[0].tags).toEqual([])
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getMeetups()
    expect(result).toEqual([])
  })
})

describe('getMeetupDetailById', () => {
  it('밋업 상세와 참석자를 병렬 조회하여 반환한다', async () => {
    const meetupBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { ...meetupRow, long_description: '상세 설명', requirements: ['노트북'], agenda: ['자기소개'] },
        error: null,
      }),
    }
    const attendeeBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [{ id: 'a1', name: '참석자1', avatar: '/a.jpg', joined_at: '2024-07-01T00:00:00Z' }],
        error: null,
      }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'meetups') return meetupBuilder
      if (table === 'meetup_attendees') return attendeeBuilder
      return mockQueryBuilder
    })

    const result = await getMeetupDetailById('meetup-1')

    expect(result).not.toBeNull()
    expect(result!.longDescription).toBe('상세 설명')
    expect(result!.attendees).toHaveLength(1)
    expect(result!.attendees[0].joinedAt).toBeInstanceOf(Date)
    expect(result!.requirements).toEqual(['노트북'])
  })

  it('밋업이 없으면 null을 반환한다', async () => {
    const meetupBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: 'not found' } }),
    }
    const attendeeBuilder = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    }

    mockSupabase.from.mockImplementation((table: string) => {
      if (table === 'meetups') return meetupBuilder
      if (table === 'meetup_attendees') return attendeeBuilder
      return mockQueryBuilder
    })

    const result = await getMeetupDetailById('nonexistent')
    expect(result).toBeNull()
  })
})

describe('getUniqueCities', () => {
  it('밋업에 사용된 고유 도시명을 반환한다', async () => {
    const selectBuilder = {
      select: vi.fn().mockResolvedValue({
        data: [{ city_name: '서울' }, { city_name: '부산' }, { city_name: '서울' }],
        error: null,
      }),
    }
    mockSupabase.from.mockReturnValueOnce(selectBuilder as any)

    const result = await getUniqueCities()

    expect(result).toEqual(['서울', '부산'])
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    const selectBuilder = {
      select: vi.fn().mockResolvedValue({ data: null, error: { message: 'err' } }),
    }
    mockSupabase.from.mockReturnValueOnce(selectBuilder as any)

    const result = await getUniqueCities()
    expect(result).toEqual([])
  })
})
