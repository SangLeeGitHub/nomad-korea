import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MeetupsContent } from '@/components/meetups/MeetupsContent'
import { mockMeetup } from '@/tests/helpers/fixtures/meetup'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock child components
vi.mock('@/components/meetups/MeetupFilterBar', () => ({
  MeetupFilterBar: ({ cityFilter, onCityFilterChange, categoryFilter, onCategoryFilterChange, viewType, onViewTypeChange, onReset }: any) => (
    <div data-testid="filter-bar">
      <button data-testid="filter-city-서울" onClick={() => onCityFilterChange('서울')}>서울</button>
      <button data-testid="filter-city-all" onClick={() => onCityFilterChange('all')}>전체</button>
      <button data-testid="filter-cat-networking" onClick={() => onCategoryFilterChange('networking')}>네트워킹</button>
      <button data-testid="filter-cat-all" onClick={() => onCategoryFilterChange('all')}>전체</button>
      <button data-testid="view-calendar" onClick={() => onViewTypeChange('calendar')}>캘린더</button>
      <button data-testid="view-list" onClick={() => onViewTypeChange('list')}>리스트</button>
      <button data-testid="reset" onClick={onReset}>초기화</button>
    </div>
  ),
}))

vi.mock('@/components/meetups/CalendarView', () => ({
  CalendarView: ({ meetups }: any) => (
    <div data-testid="calendar-view">
      {meetups.map((m: any) => <div key={m.id}>{m.title}</div>)}
    </div>
  ),
}))

vi.mock('@/components/meetups/MeetupListView', () => ({
  MeetupListView: ({ meetups }: any) => (
    <div data-testid="list-view">
      {meetups.map((m: any) => <div key={m.id} data-testid={`meetup-${m.id}`}>{m.title}</div>)}
    </div>
  ),
}))

const meetups = [
  mockMeetup({ id: 'm1', cityName: '서울', category: 'networking', title: '서울 네트워킹' }),
  mockMeetup({ id: 'm2', cityName: '부산', category: 'workshop', title: '부산 워크샵' }),
  mockMeetup({ id: 'm3', cityName: '서울', category: 'social', title: '서울 소셜' }),
]
const cities = ['서울', '부산']

describe('MeetupsContent', () => {
  it('초기에 모든 밋업을 표시한다', () => {
    render(<MeetupsContent meetups={meetups} cities={cities} />)

    expect(screen.getByText('3')).toBeInTheDocument() // 총 3개
  })

  it('도시 필터로 밋업을 필터링한다', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    render(<MeetupsContent meetups={meetups} cities={cities} />)

    await user.click(screen.getByTestId('filter-city-서울'))

    expect(screen.getByText('2')).toBeInTheDocument() // 서울 밋업 2개
    expect(screen.getByTestId('meetup-m1')).toBeInTheDocument()
    expect(screen.queryByTestId('meetup-m2')).not.toBeInTheDocument()
  })

  it('카테고리 필터로 밋업을 필터링한다', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    render(<MeetupsContent meetups={meetups} cities={cities} />)

    await user.click(screen.getByTestId('filter-cat-networking'))

    expect(screen.getByText('1')).toBeInTheDocument() // 네트워킹 1개
    expect(screen.getByTestId('meetup-m1')).toBeInTheDocument()
    expect(screen.queryByTestId('meetup-m2')).not.toBeInTheDocument()
  })

  it('기본 뷰가 리스트 뷰이다', () => {
    render(<MeetupsContent meetups={meetups} cities={cities} />)

    expect(screen.getByTestId('list-view')).toBeInTheDocument()
  })

  it('캘린더 뷰로 전환할 수 있다', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    render(<MeetupsContent meetups={meetups} cities={cities} />)

    await user.click(screen.getByTestId('view-calendar'))

    expect(screen.getByTestId('calendar-view')).toBeInTheDocument()
  })
})
