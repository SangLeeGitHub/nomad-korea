'use client';

import { useState } from 'react';
import { ArrowLeft, Hash, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChannelList } from './ChannelList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { getChannels, getMessagesByChannelId, getChannelById } from '@/lib/data/chat';

export function ChatContent() {
  const channels = getChannels();
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0]?.id || '');
  const [showChannelList, setShowChannelList] = useState(true);

  const selectedChannel = getChannelById(selectedChannelId);
  const messages = getMessagesByChannelId(selectedChannelId);

  // Mobile: Toggle between channel list and messages
  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    setShowChannelList(false);
  };

  const handleBackToChannels = () => {
    setShowChannelList(true);
  };

  return (
    <Card className="h-[600px] flex overflow-hidden">
      {/* Channel List - Desktop always visible, Mobile conditional */}
      <div
        className={`w-full md:w-64 border-r flex-shrink-0 ${
          showChannelList ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="font-semibold">채널</h2>
        </div>
        <div className="p-2 overflow-y-auto h-[calc(100%-57px)]">
          <ChannelList
            channels={channels}
            selectedChannelId={selectedChannelId}
            onSelectChannel={handleSelectChannel}
          />
        </div>
      </div>

      {/* Message Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 ${
          showChannelList ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Channel Header */}
        <div className="p-4 border-b flex items-center gap-3">
          {/* Mobile Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleBackToChannels}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Hash className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">
              {selectedChannel?.name || '채널 선택'}
            </h2>
            {selectedChannel && (
              <p className="text-xs text-muted-foreground truncate">
                {selectedChannel.description}
              </p>
            )}
          </div>
          {selectedChannel && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {selectedChannel.memberCount}
            </span>
          )}
        </div>

        {/* Messages */}
        <MessageList messages={messages} />

        {/* Input */}
        <MessageInput />
      </div>
    </Card>
  );
}
