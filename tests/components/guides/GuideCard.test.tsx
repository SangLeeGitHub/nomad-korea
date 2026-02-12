import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GuideCard } from '@/components/guides/GuideCard'
import { mockGuide } from '@/tests/helpers/fixtures/guide'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('GuideCard', () => {
  it('가이드 제목을 렌더링한다', () => {
    const guide = mockGuide({ title: '한국 비자 가이드' })
    render(<GuideCard guide={guide} />)

    expect(screen.getByText('한국 비자 가이드')).toBeInTheDocument()
  })

  it('카테고리 배지를 표시한다', () => {
    const guide = mockGuide({ category: 'visa' })
    render(<GuideCard guide={guide} />)

    expect(screen.getByText('비자')).toBeInTheDocument()
  })

  it('accommodation 카테고리 배지를 표시한다', () => {
    const guide = mockGuide({ category: 'accommodation' })
    render(<GuideCard guide={guide} />)

    expect(screen.getByText('숙소')).toBeInTheDocument()
  })

  it('읽기 시간을 표시한다', () => {
    const guide = mockGuide({ readTime: 10 })
    render(<GuideCard guide={guide} />)

    expect(screen.getByText('10분')).toBeInTheDocument()
  })

  it('요약을 표시한다', () => {
    const guide = mockGuide({ summary: '비자 정보 요약' })
    render(<GuideCard guide={guide} />)

    expect(screen.getByText('비자 정보 요약')).toBeInTheDocument()
  })

  it('가이드 상세 페이지로의 링크를 포함한다', () => {
    const guide = mockGuide({ slug: 'korea-visa-guide' })
    render(<GuideCard guide={guide} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/guides/korea-visa-guide')
  })
})
