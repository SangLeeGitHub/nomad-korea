'use client';

import { useMemo } from 'react';
import { MeetupCard } from './MeetupCard';
import type { Meetup } from '@/lib/types';

interface MeetupListViewProps {
  meetups: Meetup[];
}

interface GroupedMeetups {
  dateKey: string;
  dateLabel: string;
  meetups: Meetup[];
}

function formatDateLabel(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function MeetupListView({ meetups }: MeetupListViewProps) {
  // 날짜별 그룹핑
  const groupedMeetups = useMemo(() => {
    const groups = new Map<string, GroupedMeetups>();

    // 날짜순 정렬
    const sortedMeetups = [...meetups].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedMeetups.forEach((meetup) => {
      const meetupDate = new Date(meetup.date);
      const dateKey = getDateKey(meetupDate);

      if (!groups.has(dateKey)) {
        groups.set(dateKey, {
          dateKey,
          dateLabel: formatDateLabel(meetupDate),
          meetups: [],
        });
      }
      groups.get(dateKey)!.meetups.push(meetup);
    });

    return Array.from(groups.values());
  }, [meetups]);

  if (meetups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">표시할 밋업이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupedMeetups.map((group) => (
        <div key={group.dateKey}>
          {/* Date Header */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-semibold text-lg">{group.dateLabel}</h3>
            <span className="text-sm text-muted-foreground">
              ({group.meetups.length}개)
            </span>
          </div>

          {/* Meetup Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.meetups.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
