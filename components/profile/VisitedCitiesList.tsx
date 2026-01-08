import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { VisitedCity } from '@/lib/types';

interface VisitedCitiesListProps {
  cities: VisitedCity[];
}

export function VisitedCitiesList({ cities }: VisitedCitiesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          방문 기록
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {cities.map((city, index) => (
              <div key={`${city.cityId}-${index}`} className="relative pl-10">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <Link
                    href={`/cities/${city.citySlug}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {city.cityName}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    {city.visitedAt.toLocaleDateString('ko-KR')} · {city.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
