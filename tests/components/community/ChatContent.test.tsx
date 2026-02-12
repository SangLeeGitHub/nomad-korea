import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatContent } from '@/components/community/ChatContent'
import type { ChatChannel, ChatMessage } from '@/lib/types'

// Mock child components
vi.mock('@/components/community/ChannelList', () => ({
  ChannelList: ({ channels, selectedChannelId, onSelectChannel }: any) => (
    <div data-testid="channel-list">
      {channels.map((ch: any) => (
        <button
          key={ch.id}
          data-testid={`channel-${ch.id}`}
          data-selected={ch.id === selectedChannelId}
          onClick={() => onSelectChannel(ch.id)}
        >
          {ch.name}
        </button>
      ))}
    </div>
  ),
}))

vi.mock('@/components/community/MessageList', () => ({
  MessageList: ({ messages }: any) => (
    <div data-testid="message-list">
      {messages.map((m: any) => (
        <div key={m.id} data-testid={`msg-${m.id}`}>{m.content}</div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/community/MessageInput', () => ({
  MessageInput: () => <div data-testid="message-input" />,
}))

const channels: ChatChannel[] = [
  { id: 'ch-1', name: '서울', description: '서울 채팅방', memberCount: 42 },
  { id: 'ch-2', name: '부산', description: '부산 채팅방', memberCount: 28 },
]

const messagesByChannel: Record<string, ChatMessage[]> = {
  'ch-1': [
    { id: 'msg-1', channelId: 'ch-1', authorId: 'u1', authorName: '김', authorAvatar: '/a.jpg', content: '안녕!', createdAt: new Date() },
  ],
  'ch-2': [
    { id: 'msg-2', channelId: 'ch-2', authorId: 'u2', authorName: '이', authorAvatar: '/b.jpg', content: '부산 좋아요', createdAt: new Date() },
  ],
}

describe('ChatContent', () => {
  it('채널 목록을 렌더링한다', () => {
    render(<ChatContent channels={channels} messagesByChannel={messagesByChannel} />)

    expect(screen.getByTestId('channel-ch-1')).toBeInTheDocument()
    expect(screen.getByTestId('channel-ch-2')).toBeInTheDocument()
  })

  it('첫 번째 채널이 기본 선택된다', () => {
    render(<ChatContent channels={channels} messagesByChannel={messagesByChannel} />)

    // Channel list + header both show "서울" - verify via testid
    expect(screen.getByTestId('channel-ch-1').dataset.selected).toBe('true')
    expect(screen.getByTestId('msg-msg-1')).toBeInTheDocument()
  })

  it('선택된 채널의 이름과 설명을 표시한다', () => {
    render(<ChatContent channels={channels} messagesByChannel={messagesByChannel} />)

    // Channel header shows channel name and description
    expect(screen.getByText('서울 채팅방')).toBeInTheDocument()
  })

  it('채널 선택 시 해당 채널의 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    render(<ChatContent channels={channels} messagesByChannel={messagesByChannel} />)

    await user.click(screen.getByTestId('channel-ch-2'))

    expect(screen.getByTestId('msg-msg-2')).toBeInTheDocument()
    expect(screen.getByText('부산 좋아요')).toBeInTheDocument()
  })

  it('선택된 채널의 멤버 수를 표시한다', () => {
    render(<ChatContent channels={channels} messagesByChannel={messagesByChannel} />)

    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('채널이 없을 때 빈 상태를 처리한다', () => {
    render(<ChatContent channels={[]} messagesByChannel={{}} />)

    expect(screen.getByText('채널 선택')).toBeInTheDocument()
  })
})
