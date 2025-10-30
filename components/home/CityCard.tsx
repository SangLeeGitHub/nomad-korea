import { Star, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { City } from '@/lib/types';

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const formatCurrency = (amount: number) => {
    return `₩${(amount / 10000).toFixed(1)}M`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    return '⭐'.repeat(fullStars);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold">
          #{city.rank}
        </div>
      </div>

      <CardContent className="pt-4 space-y-4">
        {/* Title & Rating */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              {city.name}
              <span className="text-yellow-500 text-sm">
                <Star className="h-4 w-4 inline fill-yellow-500" />
                {city.overallScore}
              </span>
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {city.region}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span>💰</span>
              <span className="font-semibold">{formatCurrency(city.monthlyCost)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📡</span>
              <span className="font-semibold">{city.internetSpeed}Mbps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🌤️</span>
              <span className="font-semibold">{city.currentTemp}°C</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span>☕</span>
              <span className="font-semibold">{city.cafeCount}개</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🚇</span>
              <span className="font-semibold">{renderStars(city.transitScore)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>👤</span>
              <span className="font-semibold">{city.activeNomads}명</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {city.badges.slice(0, 3).map((badge) => (
            <Badge key={badge.id} variant="secondary" className={badge.color}>
              <span className="mr-1">{badge.icon}</span>
              {badge.label}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          상세 보기
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
