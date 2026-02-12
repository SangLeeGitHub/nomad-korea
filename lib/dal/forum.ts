import { createClient } from '@/utils/supabase/server'
import type { ForumPost, ForumComment, ForumCategory } from '@/lib/types'

export async function getAllPosts(): Promise<ForumPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapPostRow)
}

export async function getPostById(id: string): Promise<ForumPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return mapPostRow(data)
}

export async function getPostsByCategory(category: ForumCategory): Promise<ForumPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('category', category)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapPostRow)
}

export async function getCommentsByPostId(postId: string): Promise<ForumComment[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error || !data) return []

  return data.map(mapCommentRow)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPostRow(row: any): ForumPost {
  return {
    id: row.id,
    category: row.category as ForumCategory,
    title: row.title,
    content: row.content,
    authorId: row.author_id || '',
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    createdAt: new Date(row.created_at),
    viewCount: row.view_count,
    likeCount: row.like_count,
    commentCount: row.comment_count,
    isPinned: row.is_pinned || false,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCommentRow(row: any): ForumComment {
  return {
    id: row.id,
    postId: row.post_id,
    authorId: row.author_id || '',
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    content: row.content,
    createdAt: new Date(row.created_at),
    likeCount: row.like_count,
  }
}
