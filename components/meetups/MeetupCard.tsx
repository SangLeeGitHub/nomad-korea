import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Meetup, MeetupCategory } from '@/lib/types';

interface MeetupCardProps {
  meetup: Meetup;
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

function formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} (${weekday}) ${hour}:${minute}`;
}

export function MeetupCard({ meetup }: MeetupCardProps) {
  const isFull = meetup.rsvpCount >= meetup.maxAttendees;
  const attendancePercent = (meetup.rsvpCount / meetup.maxAttendees) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={categoryColors[meetup.category]}>
            {categoryLabels[meetup.category]}
          </Badge>
          <span className="text-sm text-muted-foreground">{meetup.cityName}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-3 line-clamp-2">{meetup.title}</h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(meetup.date)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{meetup.locationName}</span>
        </div>

        {/* Attendees */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>
            {meetup.rsvpCount}/{meetup.maxAttendees}명
          </span>
          {isFull && (
            <Badge variant="destructive" className="text-xs">
              마감
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all ${
              isFull ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(attendancePercent, 100)}%` }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {meetup.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/meetups/${meetup.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            상세 보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
