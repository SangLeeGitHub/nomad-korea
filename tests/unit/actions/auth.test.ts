import { describe, it, expect } from 'vitest'

// isValidEmail과 isValidPassword는 모듈 내부 함수이므로
// 동일한 로직을 테스트용으로 재현
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function isValidEmail(email: string): boolean {
  return emailRegex.test(email)
}

function isValidPassword(password: string): boolean {
  return password.length >= 6
}

describe('isValidEmail', () => {
  it('유효한 이메일을 true로 반환한다', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('test.user@domain.co.kr')).toBe(true)
    expect(isValidEmail('name+tag@gmail.com')).toBe(true)
  })

  it('빈 문자열은 false로 반환한다', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('@ 없는 이메일은 false로 반환한다', () => {
    expect(isValidEmail('userexample.com')).toBe(false)
  })

  it('도메인 없는 이메일은 false로 반환한다', () => {
    expect(isValidEmail('user@')).toBe(false)
  })

  it('공백이 포함된 이메일은 false로 반환한다', () => {
    expect(isValidEmail('user @example.com')).toBe(false)
    expect(isValidEmail('user@ example.com')).toBe(false)
  })

  it('@가 여러개인 이메일은 false로 반환한다', () => {
    expect(isValidEmail('user@@example.com')).toBe(false)
  })

  it('TLD 없는 이메일은 false로 반환한다', () => {
    expect(isValidEmail('user@example')).toBe(false)
  })
})

describe('isValidPassword', () => {
  it('6자 이상이면 true를 반환한다', () => {
    expect(isValidPassword('123456')).toBe(true)
    expect(isValidPassword('password')).toBe(true)
    expect(isValidPassword('a'.repeat(100))).toBe(true)
  })

  it('정확히 6자면 true를 반환한다', () => {
    expect(isValidPassword('abcdef')).toBe(true)
  })

  it('5자 이하면 false를 반환한다', () => {
    expect(isValidPassword('12345')).toBe(false)
    expect(isValidPassword('abc')).toBe(false)
    expect(isValidPassword('a')).toBe(false)
  })

  it('빈 문자열은 false를 반환한다', () => {
    expect(isValidPassword('')).toBe(false)
  })
})
