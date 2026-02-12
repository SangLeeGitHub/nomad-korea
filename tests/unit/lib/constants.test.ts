import { describe, it, expect } from 'vitest'
import {
  forumCategoryLabels,
  forumCategoryColors,
  guideCategoryLabels,
  guideCategoryColors,
} from '@/lib/constants'

describe('Forum 카테고리 상수', () => {
  const forumCategories = ['question', 'info', 'job', 'free'] as const

  it('forumCategoryLabels에 4개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(forumCategoryLabels)).toHaveLength(4)
    for (const cat of forumCategories) {
      expect(forumCategoryLabels[cat]).toBeDefined()
      expect(typeof forumCategoryLabels[cat]).toBe('string')
    }
  })

  it('forumCategoryColors에 4개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(forumCategoryColors)).toHaveLength(4)
    for (const cat of forumCategories) {
      expect(forumCategoryColors[cat]).toBeDefined()
      expect(forumCategoryColors[cat]).toContain('bg-')
      expect(forumCategoryColors[cat]).toContain('text-')
    }
  })

  it('forumCategoryLabels 값이 한국어 라벨이다', () => {
    expect(forumCategoryLabels.question).toBe('질문')
    expect(forumCategoryLabels.info).toBe('정보공유')
    expect(forumCategoryLabels.job).toBe('구인구직')
    expect(forumCategoryLabels.free).toBe('자유게시판')
  })
})

describe('Guide 카테고리 상수', () => {
  const guideCategories = ['visa', 'accommodation', 'workspace', 'lifestyle'] as const

  it('guideCategoryLabels에 4개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(guideCategoryLabels)).toHaveLength(4)
    for (const cat of guideCategories) {
      expect(guideCategoryLabels[cat]).toBeDefined()
      expect(typeof guideCategoryLabels[cat]).toBe('string')
    }
  })

  it('guideCategoryColors에 4개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(guideCategoryColors)).toHaveLength(4)
    for (const cat of guideCategories) {
      expect(guideCategoryColors[cat]).toBeDefined()
      expect(guideCategoryColors[cat]).toContain('bg-')
      expect(guideCategoryColors[cat]).toContain('text-')
    }
  })

  it('guideCategoryLabels 값이 한국어 라벨이다', () => {
    expect(guideCategoryLabels.visa).toBe('비자')
    expect(guideCategoryLabels.accommodation).toBe('숙소')
    expect(guideCategoryLabels.workspace).toBe('작업공간')
    expect(guideCategoryLabels.lifestyle).toBe('생활팁')
  })
})
