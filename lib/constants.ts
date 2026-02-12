import type { ForumCategory, GuideCategory } from '@/lib/types'

// Forum category labels and colors
export const forumCategoryLabels: Record<ForumCategory, string> = {
  question: '질문',
  info: '정보공유',
  job: '구인구직',
  free: '자유게시판',
}

export const forumCategoryColors: Record<ForumCategory, string> = {
  question: 'bg-blue-100 text-blue-800',
  info: 'bg-green-100 text-green-800',
  job: 'bg-purple-100 text-purple-800',
  free: 'bg-gray-100 text-gray-800',
}

// Guide category labels and colors
export const guideCategoryLabels: Record<GuideCategory, string> = {
  visa: '비자',
  accommodation: '숙소',
  workspace: '작업공간',
  lifestyle: '생활팁',
}

export const guideCategoryColors: Record<GuideCategory, string> = {
  visa: 'bg-blue-100 text-blue-800',
  accommodation: 'bg-green-100 text-green-800',
  workspace: 'bg-purple-100 text-purple-800',
  lifestyle: 'bg-orange-100 text-orange-800',
}
