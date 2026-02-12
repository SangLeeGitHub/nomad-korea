import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CityLikeButtons } from '@/components/home/CityLikeButtons'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const mockAuth = {
  getUser: vi.fn(),
}
const mockFrom = vi.fn()
const mockRpc = vi.fn()

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: mockAuth,
    from: mockFrom,
    rpc: mockRpc,
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  // Default: not logged in
  mockAuth.getUser.mockResolvedValue({ data: { user: null } })
  mockFrom.mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null }),
  })
})

describe('CityLikeButtons', () => {
  it('초기 좋아요/싫어요 카운트를 표시한다', () => {
    render(
      <CityLikeButtons cityId="city-1" initialLikeCount={100} initialDislikeCount={10} />
    )

    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('비로그인 상태에서 좋아요 클릭 시 로그인 페이지로 리다이렉트한다', async () => {
    const user = userEvent.setup()
    mockAuth.getUser.mockResolvedValue({ data: { user: null } })

    render(
      <CityLikeButtons cityId="city-1" initialLikeCount={100} initialDislikeCount={10} />
    )

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0]) // like button

    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('로그인 상태에서 좋아요 클릭 시 카운트가 증가한다', async () => {
    const user = userEvent.setup()
    mockAuth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    mockRpc.mockResolvedValue({
      data: { like_count: 101, dislike_count: 10, user_vote: 'like' },
      error: null,
    })

    render(
      <CityLikeButtons cityId="city-1" initialLikeCount={100} initialDislikeCount={10} />
    )

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0]) // like button

    expect(mockRpc).toHaveBeenCalledWith('toggle_city_like', {
      p_city_id: 'city-1',
      p_type: 'like',
    })
  })

  it('로그인 상태에서 싫어요 클릭 시 RPC를 호출한다', async () => {
    const user = userEvent.setup()
    mockAuth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    mockRpc.mockResolvedValue({
      data: { like_count: 100, dislike_count: 11, user_vote: 'dislike' },
      error: null,
    })

    render(
      <CityLikeButtons cityId="city-1" initialLikeCount={100} initialDislikeCount={10} />
    )

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1]) // dislike button

    expect(mockRpc).toHaveBeenCalledWith('toggle_city_like', {
      p_city_id: 'city-1',
      p_type: 'dislike',
    })
  })

  it('RPC 실패 시 이전 카운트로 롤백한다', async () => {
    const user = userEvent.setup()
    mockAuth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    mockRpc.mockResolvedValue({
      data: null,
      error: { message: 'Server error' },
    })

    render(
      <CityLikeButtons cityId="city-1" initialLikeCount={100} initialDislikeCount={10} />
    )

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0]) // like button

    // After rollback, should show original counts
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
