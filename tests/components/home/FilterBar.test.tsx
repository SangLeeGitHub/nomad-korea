import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from '@/components/home/FilterBar'

// Mock Radix UI components
vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => <div data-testid="select">{children}</div>,
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
}))

vi.mock('@/components/ui/slider', () => ({
  Slider: ({ value, onValueChange }: any) => (
    <div data-testid="slider">
      <span>{value[0]}-{value[1]}</span>
    </div>
  ),
}))

const defaultProps = {
  searchQuery: '',
  onSearchChange: vi.fn(),
  costRange: [50, 300] as [number, number],
  onCostRangeChange: vi.fn(),
  sortBy: 'overall',
  onSortChange: vi.fn(),
  viewType: 'grid' as const,
  onViewTypeChange: vi.fn(),
  onReset: vi.fn(),
  resultCount: 10,
}

describe('FilterBar', () => {
  it('검색 결과 개수를 표시한다', () => {
    render(<FilterBar {...defaultProps} resultCount={10} />)

    expect(screen.getByText('10개')).toBeInTheDocument()
    expect(screen.getByText(/도시가 검색되었습니다/)).toBeInTheDocument()
  })

  it('검색어를 입력할 수 있다', async () => {
    const onSearchChange = vi.fn()
    const user = userEvent.setup()
    render(<FilterBar {...defaultProps} onSearchChange={onSearchChange} />)

    const input = screen.getByPlaceholderText('도시명, 지역, 특징 검색...')
    await user.type(input, '서울')

    expect(onSearchChange).toHaveBeenCalled()
  })

  it('비용 범위를 포맷하여 표시한다', () => {
    render(<FilterBar {...defaultProps} costRange={[50, 300]} />)

    expect(screen.getByText(/₩50만/)).toBeInTheDocument()
    expect(screen.getByText(/₩3.0M/)).toBeInTheDocument()
  })

  it('초기화 버튼 클릭 시 onReset을 호출한다', async () => {
    const onReset = vi.fn()
    const user = userEvent.setup()
    render(<FilterBar {...defaultProps} onReset={onReset} />)

    await user.click(screen.getByText('초기화'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
