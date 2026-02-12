import { createClient } from '@/utils/supabase/server'
import type { Stats } from '@/lib/types'

export async function getStats(): Promise<Stats> {
  const supabase = await createClient()

  const [citiesResult, meetupsResult, reviewsResult, messagesResult] = await Promise.all([
    supabase.from('cities').select('id', { count: 'exact', head: true }),
    supabase.from('meetups').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
    supabase.from('chat_messages').select('id', { count: 'exact', head: true }),
  ])

  return {
    totalCities: citiesResult.count || 0,
    activeUsers: 12450,
    reviewCount: reviewsResult.count || 0,
    meetupCount: meetupsResult.count || 0,
    monthlyMessages: messagesResult.count || 0,
    monthlyVisitors: 124000,
    growthRate: 35,
  }
}
