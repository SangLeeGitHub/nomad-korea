import { createClient } from '@/utils/supabase/server'
import type { Review } from '@/lib/types'

export async function getReviewsByCityId(cityId: string): Promise<Review[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('city_id', cityId)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapReviewRow)
}

export async function createReview(review: {
  cityId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  stayDuration: string
  visitDate: string
}): Promise<Review | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      id: `r-${crypto.randomUUID()}`,
      city_id: review.cityId,
      user_id: review.userId,
      user_name: review.userName,
      user_avatar: review.userAvatar,
      rating: review.rating,
      content: review.content,
      stay_duration: review.stayDuration,
      visit_date: review.visitDate,
      helpful: 0,
    })
    .select()
    .single()

  if (error || !data) return null

  return mapReviewRow(data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapReviewRow(row: any): Review {
  return {
    id: row.id,
    userId: row.user_id || '',
    userName: row.user_name,
    userAvatar: row.user_avatar,
    rating: row.rating,
    content: row.content,
    stayDuration: row.stay_duration,
    visitDate: row.visit_date,
    helpful: row.helpful,
  }
}
