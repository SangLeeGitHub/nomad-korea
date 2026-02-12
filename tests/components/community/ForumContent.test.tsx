import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ForumContent } from '@/components/community/ForumContent'
import { mockForumPost } from '@/tests/helpers/fixtures/forum'

// Mock ForumPostCard
vi.mock('@/components/community/ForumPostCard', () => ({
  ForumPostCard: ({ post }: any) => <div data-testid={`post-${post.id}`}>{post.title}</div>,
}))

describe('ForumContent', () => {
  const posts = [
    mockForumPost({ id: 'p1', category: 'question', title: '질문 게시글' }),
    mockForumPost({ id: 'p2', category: 'info', title: '정보 게시글' }),
    mockForumPost({ id: 'p3', category: 'job', title: '구인 게시글' }),
    mockForumPost({ id: 'p4', category: 'free', title: '자유 게시글' }),
  ]

  it('초기에 모든 게시글을 표시한다', () => {
    render(<ForumContent posts={posts} />)

    expect(screen.getByText('총 4개의 게시글')).toBeInTheDocument()
    expect(screen.getByTestId('post-p1')).toBeInTheDocument()
    expect(screen.getByTestId('post-p2')).toBeInTheDocument()
    expect(screen.getByTestId('post-p3')).toBeInTheDocument()
    expect(screen.getByTestId('post-p4')).toBeInTheDocument()
  })

  it('카테고리 탭이 5개 표시된다 (전체 + 4개)', () => {
    render(<ForumContent posts={posts} />)

    expect(screen.getByText('전체')).toBeInTheDocument()
    expect(screen.getByText('질문')).toBeInTheDocument()
    expect(screen.getByText('정보공유')).toBeInTheDocument()
    expect(screen.getByText('구인구직')).toBeInTheDocument()
    expect(screen.getByText('자유게시판')).toBeInTheDocument()
  })

  it('질문 카테고리 탭 클릭 시 질문 게시글만 표시한다', async () => {
    const user = userEvent.setup()
    render(<ForumContent posts={posts} />)

    await user.click(screen.getByText('질문'))

    expect(screen.getByText('총 1개의 게시글')).toBeInTheDocument()
    expect(screen.getByTestId('post-p1')).toBeInTheDocument()
    expect(screen.queryByTestId('post-p2')).not.toBeInTheDocument()
  })

  it('정보공유 카테고리 탭 클릭 시 해당 게시글만 표시한다', async () => {
    const user = userEvent.setup()
    render(<ForumContent posts={posts} />)

    await user.click(screen.getByText('정보공유'))

    expect(screen.getByText('총 1개의 게시글')).toBeInTheDocument()
    expect(screen.getByTestId('post-p2')).toBeInTheDocument()
  })

  it('전체 탭 클릭 시 모든 게시글을 다시 표시한다', async () => {
    const user = userEvent.setup()
    render(<ForumContent posts={posts} />)

    await user.click(screen.getByText('질문'))
    expect(screen.getByText('총 1개의 게시글')).toBeInTheDocument()

    await user.click(screen.getByText('전체'))
    expect(screen.getByText('총 4개의 게시글')).toBeInTheDocument()
  })

  it('빈 게시글 목록일 때 안내 메시지를 표시한다', () => {
    render(<ForumContent posts={[]} />)

    expect(screen.getByText('게시글이 없습니다.')).toBeInTheDocument()
  })
})
