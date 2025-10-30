import { CityCard } from './CityCard';
import type { City } from '@/lib/types';

interface CityGridProps {
  cities: City[];
}

export function CityGrid({ cities }: CityGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="mr-2">🔥</span>
          인기 도시 TOP 10
        </h2>
        <p className="text-muted-foreground">
          디지털 노마드들이 가장 사랑하는 도시들
        </p>
      </div>

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="text-primary hover:underline font-medium">
          더 많은 도시 보기 →
        </button>
      </div>
    </div>
  );
}
