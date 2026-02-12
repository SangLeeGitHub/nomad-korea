import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MeetupCard } from '@/components/meetups/MeetupCard'
import { mockMeetup } from '@/tests/helpers/fixtures/meetup'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('MeetupCard', () => {
  it('밋업 제목을 렌더링한다', () => {
    const meetup = mockMeetup({ title: '서울 노마드 밋업' })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('서울 노마드 밋업')).toBeInTheDocument()
  })

  it('카테고리 배지를 표시한다', () => {
    const meetup = mockMeetup({ category: 'networking' })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('네트워킹')).toBeInTheDocument()
  })

  it('workshop 카테고리 배지를 표시한다', () => {
    const meetup = mockMeetup({ category: 'workshop' })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('워크샵')).toBeInTheDocument()
  })

  it('도시 이름을 표시한다', () => {
    const meetup = mockMeetup({ cityName: '서울' })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('서울')).toBeInTheDocument()
  })

  it('장소명을 표시한다', () => {
    const meetup = mockMeetup({ locationName: '강남 코워킹스페이스' })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('강남 코워킹스페이스')).toBeInTheDocument()
  })

  it('참석자 현황을 표시한다', () => {
    const meetup = mockMeetup({ rsvpCount: 15, maxAttendees: 30 })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('15/30명')).toBeInTheDocument()
  })

  it('정원이 차면 마감 배지를 표시한다', () => {
    const meetup = mockMeetup({ rsvpCount: 30, maxAttendees: 30 })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('마감')).toBeInTheDocument()
  })

  it('정원 미달이면 마감 배지가 없다', () => {
    const meetup = mockMeetup({ rsvpCount: 15, maxAttendees: 30 })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.queryByText('마감')).not.toBeInTheDocument()
  })

  it('태그를 최대 3개까지 표시한다', () => {
    const meetup = mockMeetup({ tags: ['a', 'b', 'c', 'd'] })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('#a')).toBeInTheDocument()
    expect(screen.getByText('#b')).toBeInTheDocument()
    expect(screen.getByText('#c')).toBeInTheDocument()
    expect(screen.queryByText('#d')).not.toBeInTheDocument()
  })

  it('상세 보기 링크를 포함한다', () => {
    const meetup = mockMeetup({ id: 'meetup-123' })
    render(<MeetupCard meetup={meetup} />)

    const link = screen.getByRole('link', { name: /상세 보기/i })
    expect(link).toHaveAttribute('href', '/meetups/meetup-123')
  })

  it('날짜를 M/D (요일) HH:MM 형식으로 표시한다', () => {
    const meetup = mockMeetup({ date: new Date('2024-07-15T14:00:00') })
    render(<MeetupCard meetup={meetup} />)

    expect(screen.getByText('7/15 (월) 14:00')).toBeInTheDocument()
  })
})
