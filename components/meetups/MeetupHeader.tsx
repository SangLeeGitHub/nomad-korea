import { Calendar, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { MeetupDetail, MeetupCategory } from '@/lib/types';

interface MeetupHeaderProps {
  meetup: MeetupDetail;
}

const categoryLabels: Record<MeetupCategory, string> = {
  networking: '네트워킹',
  workshop: '워크샵',
  social: '소셜',
  coworking: '코워킹',
  study: '스터디',
};

const categoryColors: Record<MeetupCategory, string> = {
  networking: 'bg-blue-100 text-blue-800',
  workshop: 'bg-purple-100 text-purple-800',
  social: 'bg-green-100 text-green-800',
  coworking: 'bg-orange-100 text-orange-800',
  study: 'bg-pink-100 text-pink-800',
};

function formatFullDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 (${weekday}) ${hour}:${minute}`;
}

export function MeetupHeader({ meetup }: MeetupHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <div className="flex items-center gap-2">
        <Badge className={categoryColors[meetup.category]}>
          {categoryLabels[meetup.category]}
        </Badge>
        <span className="text-sm text-muted-foreground">{meetup.cityName}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold">{meetup.title}</h1>

      {/* Meta Info */}
      <div className="space-y-2 text-muted-foreground">
        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>{formatFullDate(meetup.date)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <div>
            <span className="text-foreground">{meetup.locationName}</span>
            <span className="block text-sm">{meetup.locationAddress}</span>
          </div>
        </div>

        {/* Host */}
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>주최자: {meetup.hostName}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {meetup.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
