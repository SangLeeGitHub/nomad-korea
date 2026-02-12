import type { Guide } from '@/lib/types'

export function mockGuide(overrides?: Partial<Guide>): Guide {
  return {
    id: 'guide-1',
    slug: 'korea-visa-guide',
    category: 'visa',
    title: '한국 비자 가이드',
    summary: '한국에서 디지털 노마드로 체류하기 위한 비자 정보',
    content: '한국 비자 상세 내용...',
    thumbnailUrl: '/images/visa-guide.jpg',
    readTime: 10,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-15'),
    ...overrides,
  }
}
