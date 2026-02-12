import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ForumPostCard } from '@/components/community/ForumPostCard'
import { mockForumPost } from '@/tests/helpers/fixtures/forum'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('ForumPostCard', () => {
  it('게시글 제목을 렌더링한다', () => {
    const post = mockForumPost({ title: '서울 카페 추천' })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('서울 카페 추천')).toBeInTheDocument()
  })

  it('작성자 이름을 표시한다', () => {
    const post = mockForumPost({ authorName: '김노마드' })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('김노마드')).toBeInTheDocument()
  })

  it('카테고리 라벨을 표시한다', () => {
    const post = mockForumPost({ category: 'question' })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('질문')).toBeInTheDocument()
  })

  it('info 카테고리 라벨을 표시한다', () => {
    const post = mockForumPost({ category: 'info' })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('정보공유')).toBeInTheDocument()
  })

  it('조회수, 좋아요, 댓글수를 표시한다', () => {
    const post = mockForumPost({ viewCount: 42, likeCount: 5, commentCount: 3 })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('고정 게시글에 Pin 아이콘이 표시된다', () => {
    const post = mockForumPost({ isPinned: true })
    const { container } = render(<ForumPostCard post={post} />)

    // Pin icon is rendered by lucide-react as SVG
    const pinSvg = container.querySelector('.lucide-pin')
    expect(pinSvg).toBeInTheDocument()
  })

  it('비고정 게시글에 Pin 아이콘이 없다', () => {
    const post = mockForumPost({ isPinned: false })
    const { container } = render(<ForumPostCard post={post} />)

    const pinSvg = container.querySelector('.lucide-pin')
    expect(pinSvg).not.toBeInTheDocument()
  })

  it('게시글 상세 페이지로의 링크를 포함한다', () => {
    const post = mockForumPost({ id: 'post-123' })
    render(<ForumPostCard post={post} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/community/forum/post-123')
  })

  // 날짜 포맷 테스트
  it('1시간 미만이면 "방금 전"으로 표시한다', () => {
    const now = new Date()
    const post = mockForumPost({ createdAt: new Date(now.getTime() - 30 * 60 * 1000) }) // 30분 전
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('방금 전')).toBeInTheDocument()
  })

  it('24시간 미만이면 "N시간 전"으로 표시한다', () => {
    const now = new Date()
    const post = mockForumPost({ createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000) }) // 5시간 전
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('5시간 전')).toBeInTheDocument()
  })

  it('7일 미만이면 "N일 전"으로 표시한다', () => {
    const now = new Date()
    const post = mockForumPost({ createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) }) // 3일 전
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('3일 전')).toBeInTheDocument()
  })

  it('7일 이상이면 "M/D" 형식으로 표시한다', () => {
    const post = mockForumPost({ createdAt: new Date('2024-03-15T10:00:00') })
    render(<ForumPostCard post={post} />)

    expect(screen.getByText('3/15')).toBeInTheDocument()
  })
})
