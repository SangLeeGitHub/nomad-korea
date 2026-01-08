'use client';

import { Search, Grid3x3, List, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  costRange: [number, number];
  onCostRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewType: 'grid' | 'list';
  onViewTypeChange: (type: 'grid' | 'list') => void;
  onReset: () => void;
  resultCount: number;
}

const MIN_COST = 50;  // 50만원
const MAX_COST = 300; // 300만원

export function FilterBar({
  searchQuery,
  onSearchChange,
  costRange,
  onCostRangeChange,
  sortBy,
  onSortChange,
  viewType,
  onViewTypeChange,
  onReset,
  resultCount,
}: FilterBarProps) {
  const formatCost = (value: number) => {
    if (value >= 100) {
      return `${(value / 100).toFixed(1)}M`;
    }
    return `${value}만`;
  };

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Filters */}
          <div className="flex-1 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="도시명, 지역, 특징 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            {/* Cost Range Slider */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                생활비:
              </span>
              <div className="flex-1 px-2">
                <Slider
                  value={costRange}
                  onValueChange={(value) => onCostRangeChange(value as [number, number])}
                  min={MIN_COST}
                  max={MAX_COST}
                  step={10}
                />
              </div>
              <span className="text-sm font-medium whitespace-nowrap min-w-[100px] text-right">
                ₩{formatCost(costRange[0])} - ₩{formatCost(costRange[1])}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={onReset}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                초기화
              </Button>
            </div>
          </div>

          {/* Right: Sort & View */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">종합 점수</SelectItem>
                <SelectItem value="cost-asc">생활비 (낮은순)</SelectItem>
                <SelectItem value="cost-desc">생활비 (높은순)</SelectItem>
                <SelectItem value="cafe">카페 수 (많은순)</SelectItem>
                <SelectItem value="internet">인터넷 속도 (빠른순)</SelectItem>
                <SelectItem value="nomads">노마드 인구 (많은순)</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewType === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={() => onViewTypeChange('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewType === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={() => onViewTypeChange('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultCount}개</span> 도시가 검색되었습니다
        </div>
      </div>
    </div>
  );
}
