import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('단일 문자열을 그대로 반환한다', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('여러 문자열을 병합한다', () => {
    expect(cn('p-4', 'mt-2')).toBe('p-4 mt-2')
  })

  it('조건부 클래스를 처리한다', () => {
    expect(cn('p-4', false && 'hidden', 'mt-2')).toBe('p-4 mt-2')
    expect(cn('p-4', true && 'hidden', 'mt-2')).toBe('p-4 hidden mt-2')
  })

  it('undefined/null 값을 무시한다', () => {
    expect(cn('p-4', undefined, null, 'mt-2')).toBe('p-4 mt-2')
  })

  it('Tailwind 클래스 충돌을 해결한다', () => {
    // twMerge: 뒤에 오는 p-6이 p-4를 대체
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('같은 축의 Tailwind 클래스 충돌을 해결한다', () => {
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6')
  })

  it('빈 입력에 빈 문자열을 반환한다', () => {
    expect(cn()).toBe('')
  })

  it('객체 형태의 조건부 클래스를 처리한다', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })

  it('배열 형태의 클래스를 처리한다', () => {
    expect(cn(['p-4', 'mt-2'])).toBe('p-4 mt-2')
  })
})
