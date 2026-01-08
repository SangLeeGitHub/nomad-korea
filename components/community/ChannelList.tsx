import { Hash, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatChannel } from '@/lib/types';

interface ChannelListProps {
  channels: ChatChannel[];
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelList({ channels, selectedChannelId, onSelectChannel }: ChannelListProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-muted-foreground px-3 py-2">
        채팅방
      </h3>
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onSelectChannel(channel.id)}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors',
            selectedChannelId === channel.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          )}
        >
          <Hash className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 font-medium truncate">{channel.name}</span>
          <span className={cn(
            'flex items-center gap-1 text-xs',
            selectedChannelId === channel.id
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground'
          )}>
            <Users className="h-3 w-3" />
            {channel.memberCount}
          </span>
        </button>
      ))}
    </div>
  );
}
