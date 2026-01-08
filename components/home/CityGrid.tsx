import { CityCard } from './CityCard';
import { CityListItem } from './CityListItem';
import { Button } from '@/components/ui/button';
import { SearchX, RotateCcw } from 'lucide-react';
import type { City } from '@/lib/types';

interface CityGridProps {
  cities: City[];
  viewType?: 'grid' | 'list';
  onReset?: () => void;
}

export function CityGrid({ cities, viewType = 'grid', onReset }: CityGridProps) {
  // 결과 없음 UI
  if (cities.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground mb-6">
            검색 조건을 변경하거나 필터를 초기화해 보세요.
          </p>
          {onReset && (
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              필터 초기화
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="mr-2">🔥</span>
          인기 도시
        </h2>
        <p className="text-muted-foreground">
          디지털 노마드들이 가장 사랑하는 도시들
        </p>
      </div>

      {/* City Cards - Grid View */}
      {viewType === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}

      {/* City Cards - List View */}
      {viewType === 'list' && (
        <div className="space-y-4">
          {cities.map((city) => (
            <CityListItem key={city.id} city={city} />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="text-primary hover:underline font-medium">
          더 많은 도시 보기 →
        </button>
      </div>
    </div>
  );
}
