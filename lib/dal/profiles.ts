import { createClient } from '@/utils/supabase/server'
import type { UserProfile, VisitedCity, UserReview } from '@/lib/types'

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient()

  const [profileResult, visitedResult, reviewsResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase
      .from('visited_cities')
      .select('*')
      .eq('user_id', userId)
      .order('visited_at', { ascending: false }),
    supabase
      .from('reviews')
      .select('*, cities(name, slug)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
  ])

  if (profileResult.error || !profileResult.data) return null

  const profile = profileResult.data
  const visitedCities: VisitedCity[] = (visitedResult.data || []).map((v: any) => ({
    cityId: v.city_id,
    cityName: v.city_name,
    citySlug: v.city_slug,
    visitedAt: new Date(v.visited_at),
    duration: v.duration,
  }))

  const myReviews: UserReview[] = (reviewsResult.data || []).map((r: any) => ({
    id: r.id,
    cityId: r.city_id,
    cityName: r.cities?.name || '',
    citySlug: r.cities?.slug || '',
    rating: r.rating,
    content: r.content,
    createdAt: new Date(r.created_at),
    helpful: r.helpful,
  }))

  return {
    id: profile.id,
    email: profile.email || '',
    nickname: profile.nickname || '',
    avatar: profile.avatar || '',
    bio: profile.bio || '',
    currentLocation: profile.current_location || '',
    joinedAt: new Date(profile.joined_at),
    stats: {
      visitedCitiesCount: visitedCities.length,
      reviewsCount: myReviews.length,
      meetupsAttended: 0,
    },
    visitedCities,
    myReviews,
  }
}

export async function updateUserProfile(
  userId: string,
  updates: { nickname?: string; bio?: string; currentLocation?: string; avatar?: string }
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      nickname: updates.nickname,
      bio: updates.bio,
      current_location: updates.currentLocation,
      avatar: updates.avatar,
    })
    .eq('id', userId)

  return !error
}
