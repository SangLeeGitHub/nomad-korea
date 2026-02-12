import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('children을 렌더링한다', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByText('클릭')).toBeInTheDocument()
  })

  it('기본 variant는 default이다', () => {
    render(<Button>버튼</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary')
  })

  it('destructive variant를 적용한다', () => {
    render(<Button variant="destructive">삭제</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-destructive')
  })

  it('outline variant를 적용한다', () => {
    render(<Button variant="outline">테두리</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('border')
  })

  it('sm size를 적용한다', () => {
    render(<Button size="sm">작은 버튼</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('h-8')
  })

  it('lg size를 적용한다', () => {
    render(<Button size="lg">큰 버튼</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('h-10')
  })

  it('disabled 상태를 지원한다', () => {
    render(<Button disabled>비활성</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('추가 className을 병합한다', () => {
    render(<Button className="custom-class">커스텀</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })
})
