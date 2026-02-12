import { createClient } from '@/utils/supabase/server'
import type { Guide, GuideCategory } from '@/lib/types'

export async function getAllGuides(): Promise<Guide[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapGuideRow)
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return mapGuideRow(data)
}

export async function getGuidesByCategory(category: GuideCategory): Promise<Guide[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapGuideRow)
}

export async function getRelatedGuides(currentSlug: string, limit: number = 3): Promise<Guide[]> {
  const supabase = await createClient()

  const currentGuide = await getGuideBySlug(currentSlug)
  if (!currentGuide) return []

  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('category', currentGuide.category)
    .neq('slug', currentSlug)
    .limit(limit)

  if (error || !data) return []

  return data.map(mapGuideRow)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGuideRow(row: any): Guide {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category as GuideCategory,
    title: row.title,
    summary: row.summary,
    content: row.content,
    thumbnailUrl: row.thumbnail_url,
    readTime: row.read_time,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}
