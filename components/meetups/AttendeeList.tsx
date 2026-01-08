import { Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { MeetupAttendee } from '@/lib/types';

interface AttendeeListProps {
  attendees: MeetupAttendee[];
  maxAttendees: number;
}

export function AttendeeList({ attendees, maxAttendees }: AttendeeListProps) {
  const displayedAttendees = attendees.slice(0, 12);
  const remainingCount = attendees.length - displayedAttendees.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          참가자 ({attendees.length}/{maxAttendees}명)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {displayedAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center gap-2 bg-muted rounded-full px-3 py-1"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                {attendee.name.charAt(0)}
              </div>
              <span className="text-sm">{attendee.name}</span>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
              <span className="text-sm text-muted-foreground">
                +{remainingCount}명
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
