'use client';

import { Calendar, List, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MeetupCategory } from '@/lib/types';

interface MeetupFilterBarProps {
  cities: string[];
  cityFilter: string;
  onCityFilterChange: (city: string) => void;
  categoryFilter: MeetupCategory | 'all';
  onCategoryFilterChange: (category: MeetupCategory | 'all') => void;
  viewType: 'calendar' | 'list';
  onViewTypeChange: (type: 'calendar' | 'list') => void;
  onReset: () => void;
}

const categories: { value: MeetupCategory | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'networking', label: '네트워킹' },
  { value: 'workshop', label: '워크샵' },
  { value: 'social', label: '소셜' },
  { value: 'coworking', label: '코워킹' },
  { value: 'study', label: '스터디' },
];

export function MeetupFilterBar({
  cities,
  cityFilter,
  onCityFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  viewType,
  onViewTypeChange,
  onReset,
}: MeetupFilterBarProps) {
  const hasActiveFilters = cityFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className="space-y-4">
      {/* First Row: City Filter & View Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        {/* City Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">도시</span>
          <Select value={cityFilter} onValueChange={onCityFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant={viewType === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewTypeChange('calendar')}
            aria-label="달력 보기"
          >
            <Calendar className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">달력</span>
          </Button>
          <Button
            variant={viewType === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewTypeChange('list')}
            aria-label="리스트 보기"
          >
            <List className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">리스트</span>
          </Button>
        </div>
      </div>

      {/* Second Row: Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">카테고리</span>
        {categories.map((cat) => (
          <Badge
            key={cat.value}
            variant={categoryFilter === cat.value ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => onCategoryFilterChange(cat.value)}
          >
            {cat.label}
          </Badge>
        ))}

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            초기화
          </Button>
        )}
      </div>
    </div>
  );
}
