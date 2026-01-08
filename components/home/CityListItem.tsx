import { Star, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { City } from '@/lib/types';

interface CityListItemProps {
  city: City;
}

export function CityListItem({ city }: CityListItemProps) {
  const formatCurrency = (amount: number) => {
    return `₩${(amount / 10000).toFixed(1)}M`;
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    return '⭐'.repeat(fullStars);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary">#{city.rank}</span>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold truncate">{city.name}</h3>
              <span className="text-yellow-500 text-sm flex items-center">
                <Star className="h-4 w-4 fill-yellow-500" />
                {city.overallScore}
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {city.region}
            </p>
          </div>

          {/* Metrics */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold">{formatCurrency(city.monthlyCost)}</div>
              <div className="text-xs text-muted-foreground">월 생활비</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{city.cafeCount}개</div>
              <div className="text-xs text-muted-foreground">카페</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{city.internetSpeed}Mbps</div>
              <div className="text-xs text-muted-foreground">인터넷</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{renderStars(city.transitScore)}</div>
              <div className="text-xs text-muted-foreground">교통</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{city.activeNomads}명</div>
              <div className="text-xs text-muted-foreground">노마드</div>
            </div>
          </div>

          {/* Badges */}
          <div className="hidden lg:flex flex-wrap gap-1 max-w-[200px]">
            {city.badges.slice(0, 2).map((badge) => (
              <Badge key={badge.id} variant="secondary" className={`${badge.color} text-xs`}>
                <span className="mr-1">{badge.icon}</span>
                {badge.label}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" className="hidden sm:flex">
              상세 보기
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Mobile Metrics */}
        <div className="flex md:hidden items-center gap-4 mt-3 pt-3 border-t text-xs">
          <span>💰 {formatCurrency(city.monthlyCost)}</span>
          <span>☕ {city.cafeCount}개</span>
          <span>📡 {city.internetSpeed}Mbps</span>
          <span>👤 {city.activeNomads}명</span>
        </div>
      </CardContent>
    </Card>
  );
}
