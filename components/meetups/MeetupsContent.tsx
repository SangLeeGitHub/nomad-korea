'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeetupFilterBar } from './MeetupFilterBar';
import { CalendarView } from './CalendarView';
import { MeetupListView } from './MeetupListView';
import { meetups, getUniqueCities } from '@/lib/data/meetups';
import type { MeetupCategory } from '@/lib/types';

export function MeetupsContent() {
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<MeetupCategory | 'all'>('all');
  const [viewType, setViewType] = useState<'calendar' | 'list'>('list');

  const cities = useMemo(() => getUniqueCities(), []);

  // 필터링된 밋업
  const filteredMeetups = useMemo(() => {
    return meetups.filter((meetup) => {
      // 도시 필터
      if (cityFilter !== 'all' && meetup.cityName !== cityFilter) {
        return false;
      }
      // 카테고리 필터
      if (categoryFilter !== 'all' && meetup.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [cityFilter, categoryFilter]);

  const handleReset = () => {
    setCityFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">밋업</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">밋업</h1>
          <p className="text-muted-foreground mt-1">
            디지털 노마드들과 함께하는 오프라인 모임
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <MeetupFilterBar
          cities={cities}
          cityFilter={cityFilter}
          onCityFilterChange={setCityFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          viewType={viewType}
          onViewTypeChange={setViewType}
          onReset={handleReset}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredMeetups.length}</span>개 밋업
        </p>
      </div>

      {/* View Content */}
      {viewType === 'calendar' ? (
        <CalendarView meetups={filteredMeetups} />
      ) : (
        <MeetupListView meetups={filteredMeetups} />
      )}
    </div>
  );
}
