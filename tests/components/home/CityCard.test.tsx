import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CityCard } from '@/components/home/CityCard'
import { mockCity, mockBadge } from '@/tests/helpers/fixtures/city'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock CityLikeButtons (client component with hooks)
vi.mock('@/components/home/CityLikeButtons', () => ({
  CityLikeButtons: ({ initialLikeCount, initialDislikeCount }: any) => (
    <div data-testid="like-buttons">
      <span>{initialLikeCount}</span>
      <span>{initialDislikeCount}</span>
    </div>
  ),
}))

describe('CityCard', () => {
  it('도시 이름과 지역을 렌더링한다', () => {
    const city = mockCity()
    render(<CityCard city={city} />)

    expect(screen.getByText('서울')).toBeInTheDocument()
    expect(screen.getByText('수도권')).toBeInTheDocument()
  })

  it('순위를 표시한다', () => {
    const city = mockCity({ rank: 1 })
    render(<CityCard city={city} />)

    expect(screen.getByText('#1')).toBeInTheDocument()
  })

  it('종합 점수를 표시한다', () => {
    const city = mockCity({ overallScore: 4.5 })
    render(<CityCard city={city} />)

    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('생활비를 만원 단위로 포맷한다', () => {
    const city = mockCity({ monthlyCost: 1500000 })
    render(<CityCard city={city} />)

    expect(screen.getByText('₩150.0M')).toBeInTheDocument()
  })

  it('인터넷 속도를 Mbps로 표시한다', () => {
    const city = mockCity({ internetSpeed: 200 })
    render(<CityCard city={city} />)

    expect(screen.getByText('200Mbps')).toBeInTheDocument()
  })

  it('현재 온도를 표시한다', () => {
    const city = mockCity({ currentTemp: 22 })
    render(<CityCard city={city} />)

    expect(screen.getByText('22°C')).toBeInTheDocument()
  })

  it('카페 수를 표시한다', () => {
    const city = mockCity({ cafeCount: 320 })
    render(<CityCard city={city} />)

    expect(screen.getByText('320개')).toBeInTheDocument()
  })

  it('활동 노마드 수를 표시한다', () => {
    const city = mockCity({ activeNomads: 450 })
    render(<CityCard city={city} />)

    expect(screen.getByText('450명')).toBeInTheDocument()
  })

  it('배지를 최대 3개까지만 표시한다', () => {
    const badges = [
      mockBadge({ id: 'b1', label: '카페 천국' }),
      mockBadge({ id: 'b2', label: '빠른 인터넷' }),
      mockBadge({ id: 'b3', label: '교통 편리' }),
      mockBadge({ id: 'b4', label: '자연 풍경' }),
    ]
    const city = mockCity({ badges })
    render(<CityCard city={city} />)

    expect(screen.getByText('카페 천국')).toBeInTheDocument()
    expect(screen.getByText('빠른 인터넷')).toBeInTheDocument()
    expect(screen.getByText('교통 편리')).toBeInTheDocument()
    expect(screen.queryByText('자연 풍경')).not.toBeInTheDocument()
  })

  it('도시 상세 페이지로의 링크를 포함한다', () => {
    const city = mockCity({ slug: 'seoul' })
    render(<CityCard city={city} />)

    const link = screen.getByRole('link', { name: /상세 보기/i })
    expect(link).toHaveAttribute('href', '/cities/seoul')
  })

  it('CityLikeButtons에 초기 카운트를 전달한다', () => {
    const city = mockCity({ likeCount: 100, dislikeCount: 10 })
    render(<CityCard city={city} />)

    const buttons = screen.getByTestId('like-buttons')
    expect(buttons).toHaveTextContent('100')
    expect(buttons).toHaveTextContent('10')
  })
})
