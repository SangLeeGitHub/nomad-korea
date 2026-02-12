import { createClient } from '@/utils/supabase/server'
import type { ChatChannel, ChatMessage } from '@/lib/types'

export async function getChannels(): Promise<ChatChannel[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('chat_channels')
    .select('*')
    .order('member_count', { ascending: false })

  if (error || !data) return []

  return data.map(mapChannelRow)
}

export async function getChannelById(id: string): Promise<ChatChannel | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('chat_channels')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return mapChannelRow(data)
}

export async function getMessagesByChannelId(channelId: string): Promise<ChatMessage[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })

  if (error || !data) return []

  return data.map(mapMessageRow)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapChannelRow(row: any): ChatChannel {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    memberCount: row.member_count,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMessageRow(row: any): ChatMessage {
  return {
    id: row.id,
    channelId: row.channel_id,
    authorId: row.author_id || '',
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    content: row.content,
    createdAt: new Date(row.created_at),
  }
}
