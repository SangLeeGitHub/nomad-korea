import { createClient } from '@/utils/supabase/server'
import type { Meetup, MeetupDetail, MeetupAttendee } from '@/lib/types'

export async function getMeetups(): Promise<Meetup[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('meetups')
    .select('*')
    .order('date', { ascending: true })

  if (error || !data) return []

  return data.map(mapMeetupRow)
}

export async function getMeetupsByCity(cityName: string): Promise<Meetup[]> {
  const supabase = await createClient()

  let query = supabase.from('meetups').select('*').order('date', { ascending: true })

  if (cityName && cityName !== 'all') {
    query = query.eq('city_name', cityName)
  }

  const { data, error } = await query

  if (error || !data) return []

  return data.map(mapMeetupRow)
}

export async function getMeetupById(id: string): Promise<Meetup | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('meetups')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return mapMeetupRow(data)
}

export async function getMeetupDetailById(id: string): Promise<MeetupDetail | null> {
  const supabase = await createClient()

  const [meetupResult, attendeesResult] = await Promise.all([
    supabase.from('meetups').select('*').eq('id', id).single(),
    supabase.from('meetup_attendees').select('*').eq('meetup_id', id).order('joined_at', { ascending: true }),
  ])

  if (meetupResult.error || !meetupResult.data) return null

  const row = meetupResult.data
  const attendees: MeetupAttendee[] = (attendeesResult.data || []).map((a: any) => ({
    id: a.id,
    name: a.name,
    avatar: a.avatar,
    joinedAt: new Date(a.joined_at),
  }))

  return {
    ...mapMeetupRow(row),
    longDescription: row.long_description || row.description || '',
    attendees,
    requirements: row.requirements || undefined,
    agenda: row.agenda || undefined,
  }
}

export async function getUniqueCities(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('meetups')
    .select('city_name')

  if (error || !data) return []

  return [...new Set(data.map((m: any) => m.city_name))]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMeetupRow(row: any): Meetup {
  return {
    id: row.id,
    cityId: row.city_id,
    cityName: row.city_name,
    title: row.title,
    description: row.description,
    date: new Date(row.date),
    locationName: row.location_name,
    locationAddress: row.location_address,
    rsvpCount: row.rsvp_count,
    maxAttendees: row.max_attendees,
    tags: row.tags || [],
    category: row.category,
    hostName: row.host_name,
    hostAvatar: row.host_avatar,
    imageUrl: row.image_url || undefined,
  }
}
