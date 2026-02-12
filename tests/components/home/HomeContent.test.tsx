import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomeContent } from '@/components/home/HomeContent'
import { mockCities } from '@/tests/helpers/fixtures/city'
import { mockMeetup } from '@/tests/helpers/fixtures/meetup'

// Mock child components to isolate HomeContent logic
vi.mock('@/components/home/FilterBar', () => ({
  FilterBar: ({ searchQuery, onSearchChange, costRange, onCostRangeChange, sortBy, onSortChange, onReset, resultCount }: any) => (
    <div data-testid="filter-bar">
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button data-testid="sort-overall" onClick={() => onSortChange('overall')}>종합</button>
      <button data-testid="sort-cost-asc" onClick={() => onSortChange('cost-asc')}>비용↑</button>
      <button data-testid="sort-cost-desc" onClick={() => onSortChange('cost-desc')}>비용↓</button>
      <button data-testid="sort-cafe" onClick={() => onSortChange('cafe')}>카페</button>
      <button data-testid="sort-internet" onClick={() => onSortChange('internet')}>인터넷</button>
      <button data-testid="sort-nomads" onClick={() => onSortChange('nomads')}>노마드</button>
      <button data-testid="cost-range-narrow" onClick={() => onCostRangeChange([100, 140])}>비용필터</button>
      <button data-testid="reset" onClick={onReset}>초기화</button>
      <span data-testid="result-count">{resultCount}</span>
    </div>
  ),
}))

vi.mock('@/components/home/CityGrid', () => ({
  CityGrid: ({ cities }: any) => (
    <div data-testid="city-grid">
      {cities.map((c: any) => (
        <div key={c.id} data-testid={`city-${c.id}`}>{c.name}</div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/home/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar" />,
}))

describe('HomeContent', () => {
  const cities = mockCities(3)
  const meetups = [mockMeetup()]

  it('모든 도시를 초기에 표시한다', () => {
    render(<HomeContent cities={cities} meetups={meetups} />)

    expect(screen.getByTestId('result-count')).toHaveTextContent('3')
    expect(screen.getByTestId('city-city-seoul')).toBeInTheDocument()
    expect(screen.getByTestId('city-city-busan')).toBeInTheDocument()
    expect(screen.getByTestId('city-city-jeju')).toBeInTheDocument()
  })

  it('도시명으로 검색 필터링한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    const searchInput = screen.getByTestId('search-input')
    await user.clear(searchInput)
    await user.type(searchInput, '서울')

    expect(screen.getByTestId('result-count')).toHaveTextContent('1')
    expect(screen.getByTestId('city-city-seoul')).toBeInTheDocument()
    expect(screen.queryByTestId('city-city-busan')).not.toBeInTheDocument()
  })

  it('영문 이름으로 검색 필터링한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    const searchInput = screen.getByTestId('search-input')
    await user.clear(searchInput)
    await user.type(searchInput, 'busan')

    expect(screen.getByTestId('result-count')).toHaveTextContent('1')
    expect(screen.getByTestId('city-city-busan')).toBeInTheDocument()
  })

  it('지역으로 검색 필터링한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    const searchInput = screen.getByTestId('search-input')
    await user.clear(searchInput)
    await user.type(searchInput, '경상권')

    expect(screen.getByTestId('result-count')).toHaveTextContent('1')
    expect(screen.getByTestId('city-city-busan')).toBeInTheDocument()
  })

  it('비용 범위로 필터링한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    // Narrow cost range to 100-140만원 → matches 부산 (120만) and 제주 (130만), excludes 서울 (150만)
    await user.click(screen.getByTestId('cost-range-narrow'))

    expect(screen.getByTestId('result-count')).toHaveTextContent('2')
    expect(screen.queryByTestId('city-city-seoul')).not.toBeInTheDocument() // 150만 > 범위
    expect(screen.getByTestId('city-city-busan')).toBeInTheDocument()
    expect(screen.getByTestId('city-city-jeju')).toBeInTheDocument()
  })

  it('종합 점수 정렬 (기본값)', () => {
    render(<HomeContent cities={cities} meetups={meetups} />)

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    // overallScore: 서울 4.5 > 부산 4.3 > 제주 4.1
    expect(cityNames).toEqual(['서울', '부산', '제주'])
  })

  it('비용 낮은순으로 정렬한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    await user.click(screen.getByTestId('sort-cost-asc'))

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    // monthlyCost: 부산 120만 < 제주 130만 < 서울 150만
    expect(cityNames).toEqual(['부산', '제주', '서울'])
  })

  it('비용 높은순으로 정렬한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    await user.click(screen.getByTestId('sort-cost-desc'))

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    expect(cityNames).toEqual(['서울', '제주', '부산'])
  })

  it('카페 수 정렬한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    await user.click(screen.getByTestId('sort-cafe'))

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    // cafeCount: 서울 320 > 부산 180 > 제주 150
    expect(cityNames).toEqual(['서울', '부산', '제주'])
  })

  it('인터넷 속도 정렬한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    await user.click(screen.getByTestId('sort-internet'))

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    // internetSpeed: 서울 200 > 부산 150 > 제주 100
    expect(cityNames).toEqual(['서울', '부산', '제주'])
  })

  it('노마드 인구 정렬한다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    await user.click(screen.getByTestId('sort-nomads'))

    const grid = screen.getByTestId('city-grid')
    const cityNames = Array.from(grid.querySelectorAll('[data-testid^="city-"]')).map(
      (el) => el.textContent
    )
    // activeNomads: 서울 450 > 부산 200 > 제주 150
    expect(cityNames).toEqual(['서울', '부산', '제주'])
  })

  it('필터 초기화 시 모든 도시가 다시 표시된다', async () => {
    const user = userEvent.setup()
    render(<HomeContent cities={cities} meetups={meetups} />)

    // Apply search filter
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, '서울')
    expect(screen.getByTestId('result-count')).toHaveTextContent('1')

    // Reset
    await user.click(screen.getByTestId('reset'))
    expect(screen.getByTestId('result-count')).toHaveTextContent('3')
  })
})
