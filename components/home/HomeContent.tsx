'use client';

import { useState, useMemo } from 'react';
import { FilterBar } from './FilterBar';
import { CityGrid } from './CityGrid';
import { Sidebar } from './Sidebar';
import { cities } from '@/lib/data/cities';
import { meetups } from '@/lib/data/meetups';
import type { City } from '@/lib/types';

const DEFAULT_COST_RANGE: [number, number] = [50, 300]; // 만원 단위

type SortOption = 'overall' | 'cost-asc' | 'cost-desc' | 'cafe' | 'internet' | 'nomads';
type ViewType = 'grid' | 'list';

export function HomeContent() {
  // 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [costRange, setCostRange] = useState<[number, number]>(DEFAULT_COST_RANGE);
  const [sortBy, setSortBy] = useState<SortOption>('overall');
  const [viewType, setViewType] = useState<ViewType>('grid');

  // 필터 초기화
  const handleReset = () => {
    setSearchQuery('');
    setCostRange(DEFAULT_COST_RANGE);
    setSortBy('overall');
  };

  // 필터링 및 정렬된 도시 목록
  const filteredCities = useMemo(() => {
    // 1. 필터링
    const filtered = cities.filter((city: City) => {
      // 검색어 필터
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query ||
        city.name.includes(searchQuery) ||
        city.nameEn.toLowerCase().includes(query) ||
        city.region.includes(searchQuery);

      // 비용 범위 필터 (만원 단위 -> 원 단위 변환)
      const [minCost, maxCost] = costRange;
      const matchesCost =
        city.monthlyCost >= minCost * 10000 &&
        city.monthlyCost <= maxCost * 10000;

      return matchesSearch && matchesCost;
    });

    // 2. 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'overall':
          return b.overallScore - a.overallScore;
        case 'cost-asc':
          return a.monthlyCost - b.monthlyCost;
        case 'cost-desc':
          return b.monthlyCost - a.monthlyCost;
        case 'cafe':
          return b.cafeCount - a.cafeCount;
        case 'internet':
          return b.internetSpeed - a.internetSpeed;
        case 'nomads':
          return b.activeNomads - a.activeNomads;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, costRange, sortBy]);

  return (
    <>
      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        costRange={costRange}
        onCostRangeChange={setCostRange}
        sortBy={sortBy}
        onSortChange={(value) => setSortBy(value as SortOption)}
        viewType={viewType}
        onViewTypeChange={(value) => setViewType(value as ViewType)}
        onReset={handleReset}
        resultCount={filteredCities.length}
      />

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: City Grid */}
          <div className="lg:col-span-8">
            <CityGrid
              cities={filteredCities}
              viewType={viewType}
              onReset={handleReset}
            />
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar meetups={meetups} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
