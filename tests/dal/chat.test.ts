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

import { getChannels, getChannelById, getMessagesByChannelId } from '@/lib/dal/chat'

const channelRow = {
  id: 'ch-1',
  name: '서울',
  description: '서울 채팅방',
  member_count: 42,
}

const messageRow = {
  id: 'msg-1',
  channel_id: 'ch-1',
  author_id: 'user-1',
  author_name: '김노마드',
  author_avatar: '/avatar.jpg',
  content: '안녕하세요!',
  created_at: '2024-07-10T10:00:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getChannels', () => {
  it('채널을 member_count 내림차순으로 조회한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [channelRow], error: null })

    const result = await getChannels()

    expect(mockSupabase.from).toHaveBeenCalledWith('chat_channels')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('member_count', { ascending: false })
    expect(result).toHaveLength(1)
    expect(result[0].memberCount).toBe(42)
  })

  it('camelCase로 매핑한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [channelRow], error: null })

    const result = await getChannels()
    expect(result[0].id).toBe('ch-1')
    expect(result[0].name).toBe('서울')
    expect(result[0].description).toBe('서울 채팅방')
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getChannels()
    expect(result).toEqual([])
  })
})

describe('getChannelById', () => {
  it('ID로 채널을 조회하여 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: channelRow, error: null })

    const result = await getChannelById('ch-1')

    expect(result).not.toBeNull()
    expect(result!.name).toBe('서울')
  })

  it('존재하지 않는 ID는 null을 반환한다', async () => {
    mockQueryBuilder.single.mockResolvedValueOnce({ data: null, error: { message: 'not found' } })

    const result = await getChannelById('nonexistent')
    expect(result).toBeNull()
  })
})

describe('getMessagesByChannelId', () => {
  it('채널 메시지를 created_at 오름차순으로 조회한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [messageRow], error: null })

    const result = await getMessagesByChannelId('ch-1')

    expect(mockQueryBuilder.eq).toHaveBeenCalledWith('channel_id', 'ch-1')
    expect(mockQueryBuilder.order).toHaveBeenCalledWith('created_at', { ascending: true })
    expect(result).toHaveLength(1)
  })

  it('camelCase로 매핑한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [messageRow], error: null })

    const result = await getMessagesByChannelId('ch-1')
    expect(result[0].channelId).toBe('ch-1')
    expect(result[0].authorName).toBe('김노마드')
    expect(result[0].createdAt).toBeInstanceOf(Date)
  })

  it('author_id가 없으면 빈 문자열로 대체한다', async () => {
    const row = { ...messageRow, author_id: null }
    mockQueryBuilder.order.mockResolvedValueOnce({ data: [row], error: null })

    const result = await getMessagesByChannelId('ch-1')
    expect(result[0].authorId).toBe('')
  })

  it('에러 시 빈 배열을 반환한다', async () => {
    mockQueryBuilder.order.mockResolvedValueOnce({ data: null, error: { message: 'err' } })

    const result = await getMessagesByChannelId('ch-1')
    expect(result).toEqual([])
  })
})
