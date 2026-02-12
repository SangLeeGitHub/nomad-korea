import { createClient } from '@/utils/supabase/server'
import type { City, CityDetail, Workspace, Review } from '@/lib/types'

export async function getCities(): Promise<City[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      city_badges (
        display_order,
        badges (*)
      )
    `)
    .order('rank', { ascending: true })

  if (error || !data) return []

  return data.map(mapCityRow)
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      city_badges (
        display_order,
        badges (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return mapCityRow(data)
}

export async function getCityDetailBySlug(slug: string): Promise<(CityDetail & { city: City }) | null> {
  const supabase = await createClient()

  const { data: cityData, error: cityError } = await supabase
    .from('cities')
    .select(`
      *,
      city_badges (
        display_order,
        badges (*)
      )
    `)
    .eq('slug', slug)
    .single()

  if (cityError || !cityData) return null

  const cityId = cityData.id

  const [detailResult, workspacesResult, reviewsResult] = await Promise.all([
    supabase.from('city_details').select('*').eq('city_id', cityId).single(),
    supabase.from('workspaces').select('*').eq('city_id', cityId),
    supabase.from('reviews').select('*').eq('city_id', cityId),
  ])

  if (detailResult.error || !detailResult.data) return null

  const detail = detailResult.data

  return {
    city: mapCityRow(cityData),
    cityId: detail.city_id,
    longDescription: detail.long_description || '',
    pros: detail.pros || [],
    cons: detail.cons || [],
    recommendedStay: detail.recommended_stay || '',
    bestSeasons: detail.best_seasons || [],
    workspaces: (workspacesResult.data || []).map(mapWorkspaceRow),
    reviews: (reviewsResult.data || []).map(mapReviewRow),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCityRow(row: any): City {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameEn: row.name_en,
    region: row.region,
    rank: row.rank,
    overallScore: Number(row.overall_score),
    thumbnailUrl: row.thumbnail_url,
    heroImageUrl: row.hero_image_url,
    galleryUrls: row.gallery_urls || [],
    monthlyCost: row.monthly_cost,
    cafeCount: row.cafe_count,
    internetSpeed: row.internet_speed,
    transitScore: row.transit_score,
    likeCount: row.like_count,
    dislikeCount: row.dislike_count,
    currentTemp: Number(row.current_temp),
    feelsLike: Number(row.feels_like),
    weatherIcon: row.weather_icon,
    airQuality: row.air_quality,
    activeNomads: row.active_nomads,
    reviewCount: row.review_count,
    badges: (row.city_badges || [])
      .sort((a: any, b: any) => a.display_order - b.display_order)
      .map((cb: any) => ({
        id: cb.badges.id,
        type: cb.badges.type as 'status' | 'feature',
        label: cb.badges.label,
        icon: cb.badges.icon,
        color: cb.badges.color,
      })),
    description: row.description,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWorkspaceRow(row: any): Workspace {
  return {
    id: row.id,
    name: row.name,
    type: row.type as 'cafe' | 'coworking',
    address: row.address,
    rating: Number(row.rating),
    priceRange: row.price_range,
    wifiSpeed: row.wifi_speed,
    hasOutlet: row.has_outlet,
    openHours: row.open_hours,
  }
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
