import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CityGrid } from '@/components/home/CityGrid'
import { mockCities } from '@/tests/helpers/fixtures/city'

// Mock child components
vi.mock('@/components/home/CityCard', () => ({
  CityCard: ({ city }: any) => <div data-testid={`city-card-${city.id}`}>{city.name}</div>,
}))

vi.mock('@/components/home/CityListItem', () => ({
  CityListItem: ({ city }: any) => <div data-testid={`city-list-${city.id}`}>{city.name}</div>,
}))

describe('CityGrid', () => {
  it('그리드 뷰에서 CityCard를 렌더링한다', () => {
    const cities = mockCities(3)
    render(<CityGrid cities={cities} viewType="grid" />)

    expect(screen.getByTestId('city-card-city-seoul')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-city-busan')).toBeInTheDocument()
    expect(screen.getByTestId('city-card-city-jeju')).toBeInTheDocument()
  })

  it('리스트 뷰에서 CityListItem을 렌더링한다', () => {
    const cities = mockCities(3)
    render(<CityGrid cities={cities} viewType="list" />)

    expect(screen.getByTestId('city-list-city-seoul')).toBeInTheDocument()
    expect(screen.getByTestId('city-list-city-busan')).toBeInTheDocument()
  })

  it('빈 배열일 때 검색 결과 없음 UI를 표시한다', () => {
    render(<CityGrid cities={[]} />)

    expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument()
  })

  it('빈 배열일 때 onReset이 있으면 초기화 버튼을 표시한다', () => {
    const onReset = vi.fn()
    render(<CityGrid cities={[]} onReset={onReset} />)

    expect(screen.getByText('필터 초기화')).toBeInTheDocument()
  })

  it('초기화 버튼 클릭 시 onReset을 호출한다', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    render(<CityGrid cities={[]} onReset={onReset} />)

    await user.click(screen.getByText('필터 초기화'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('기본 viewType은 grid이다', () => {
    const cities = mockCities(1)
    render(<CityGrid cities={cities} />)

    expect(screen.getByTestId('city-card-city-seoul')).toBeInTheDocument()
  })
})
