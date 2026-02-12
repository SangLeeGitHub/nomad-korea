import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GuidesContent } from '@/components/guides/GuidesContent'
import { mockGuide } from '@/tests/helpers/fixtures/guide'

vi.mock('@/components/guides/GuideCard', () => ({
  GuideCard: ({ guide }: any) => <div data-testid={`guide-${guide.id}`}>{guide.title}</div>,
}))

const guides = [
  mockGuide({ id: 'g1', category: 'visa', title: '비자 가이드' }),
  mockGuide({ id: 'g2', category: 'accommodation', title: '숙소 가이드' }),
  mockGuide({ id: 'g3', category: 'workspace', title: '작업공간 가이드' }),
  mockGuide({ id: 'g4', category: 'lifestyle', title: '생활팁 가이드' }),
]

describe('GuidesContent', () => {
  it('초기에 모든 가이드를 표시한다', () => {
    render(<GuidesContent guides={guides} />)

    expect(screen.getByTestId('guide-g1')).toBeInTheDocument()
    expect(screen.getByTestId('guide-g2')).toBeInTheDocument()
    expect(screen.getByTestId('guide-g3')).toBeInTheDocument()
    expect(screen.getByTestId('guide-g4')).toBeInTheDocument()
  })

  it('카테고리 버튼이 5개 표시된다 (전체 + 4개)', () => {
    render(<GuidesContent guides={guides} />)

    expect(screen.getByText('전체')).toBeInTheDocument()
    expect(screen.getByText('비자')).toBeInTheDocument()
    expect(screen.getByText('숙소')).toBeInTheDocument()
    expect(screen.getByText('작업공간')).toBeInTheDocument()
    expect(screen.getByText('생활팁')).toBeInTheDocument()
  })

  it('비자 카테고리 클릭 시 비자 가이드만 표시한다', async () => {
    const user = userEvent.setup()
    render(<GuidesContent guides={guides} />)

    await user.click(screen.getByText('비자'))

    expect(screen.getByTestId('guide-g1')).toBeInTheDocument()
    expect(screen.queryByTestId('guide-g2')).not.toBeInTheDocument()
    expect(screen.queryByTestId('guide-g3')).not.toBeInTheDocument()
  })

  it('전체 클릭 시 모든 가이드를 다시 표시한다', async () => {
    const user = userEvent.setup()
    render(<GuidesContent guides={guides} />)

    await user.click(screen.getByText('비자'))
    expect(screen.queryByTestId('guide-g2')).not.toBeInTheDocument()

    await user.click(screen.getByText('전체'))
    expect(screen.getByTestId('guide-g2')).toBeInTheDocument()
  })

  it('해당 카테고리에 가이드가 없으면 안내 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    const limitedGuides = [mockGuide({ id: 'g1', category: 'visa', title: '비자 가이드' })]
    render(<GuidesContent guides={limitedGuides} />)

    await user.click(screen.getByText('숙소'))

    expect(screen.getByText('해당 카테고리에 가이드가 없습니다.')).toBeInTheDocument()
  })
})
