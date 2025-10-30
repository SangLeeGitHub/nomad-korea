'use client';

import { Search, SlidersHorizontal, Grid3x3, Map, List, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function FilterBar() {
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
              />
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <SlidersHorizontal className="h-3 w-3 mr-1" />
                필터
              </Button>
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive/10">
                생활비: ₩500K - ₩3M
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive/10">
                카페 100개 이상
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive/10">
                인터넷 100Mbps+
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <RotateCcw className="h-3 w-3 mr-1" />
                초기화
              </Button>
            </div>
          </div>

          {/* Right: Sort & View */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <Select defaultValue="overall">
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
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-r-none">
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none border-x"
              >
                <Map className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-l-none">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">25개</span> 도시가 검색되었습니다
        </div>
      </div>
    </div>
  );
}
