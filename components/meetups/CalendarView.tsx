'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeetupCard } from './MeetupCard';
import type { Meetup } from '@/lib/types';

interface CalendarViewProps {
  meetups: Meetup[];
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();

  const days: (Date | null)[] = [];

  // 이전 달 빈 셀
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  // 현재 달 날짜들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

export function CalendarView({ meetups }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  // 해당 월의 밋업만 필터링
  const monthMeetups = useMemo(() => {
    return meetups.filter((meetup) => {
      const meetupDate = new Date(meetup.date);
      return (
        meetupDate.getFullYear() === year && meetupDate.getMonth() === month
      );
    });
  }, [meetups, year, month]);

  // 날짜별 밋업 맵
  const meetupsByDate = useMemo(() => {
    const map = new Map<string, Meetup[]>();
    monthMeetups.forEach((meetup) => {
      const dateKey = new Date(meetup.date).toDateString();
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(meetup);
    });
    return map;
  }, [monthMeetups]);

  // 선택된 날짜의 밋업
  const selectedMeetups = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = selectedDate.toDateString();
    return meetupsByDate.get(dateKey) || [];
  }, [selectedDate, meetupsByDate]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold min-w-[140px] text-center">
            {year}년 {month + 1}월
          </h2>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={goToToday}>
          오늘
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-muted">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className={`p-2 text-center text-sm font-medium ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="p-2 h-20 bg-muted/30" />;
            }

            const dateKey = date.toDateString();
            const dateMeetups = meetupsByDate.get(dateKey) || [];
            const isToday = isSameDay(date, new Date());
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const dayOfWeek = date.getDay();

            return (
              <button
                key={dateKey}
                onClick={() => handleDateClick(date)}
                className={`p-2 h-20 border-t border-l first:border-l-0 text-left transition-colors hover:bg-muted/50 ${
                  isSelected ? 'bg-primary/10' : ''
                } ${isToday ? 'ring-2 ring-primary ring-inset' : ''}`}
              >
                <span
                  className={`text-sm ${
                    dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''
                  } ${isToday ? 'font-bold' : ''}`}
                >
                  {date.getDate()}
                </span>
                {dateMeetups.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {dateMeetups.slice(0, 2).map((meetup) => (
                      <span
                        key={meetup.id}
                        className="inline-block w-2 h-2 rounded-full bg-primary"
                        title={meetup.title}
                      />
                    ))}
                    {dateMeetups.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{dateMeetups.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Meetups */}
      {selectedDate && (
        <div className="space-y-4">
          <h3 className="font-semibold">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 밋업
            {selectedMeetups.length > 0 && (
              <span className="text-muted-foreground font-normal ml-2">
                ({selectedMeetups.length}개)
              </span>
            )}
          </h3>
          {selectedMeetups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedMeetups.map((meetup) => (
                <MeetupCard key={meetup.id} meetup={meetup} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              이 날짜에 예정된 밋업이 없습니다.
            </p>
          )}
        </div>
      )}

      {/* Month Summary */}
      {!selectedDate && monthMeetups.length > 0 && (
        <div className="text-sm text-muted-foreground">
          이번 달 총 {monthMeetups.length}개의 밋업이 있습니다. 날짜를 클릭하여 자세히 보세요.
        </div>
      )}
    </div>
  );
}
