import { MapPin, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { UserStats } from '@/lib/types';

interface ProfileStatsProps {
  stats: UserStats;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    { icon: MapPin, label: '방문 도시', value: stats.visitedCitiesCount },
    { icon: MessageSquare, label: '작성 리뷰', value: stats.reviewsCount },
    { icon: Users, label: '참가 밋업', value: stats.meetupsAttended },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {statItems.map((item) => (
        <Card key={item.label}>
          <CardContent className="pt-6 text-center">
            <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
