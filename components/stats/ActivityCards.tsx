import { Card, CardContent } from '@/components/ui/card';
import { activityStats } from '@/lib/data/stats';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function ActivityCards() {
  const statsItems = [
    { icon: '🏙️', label: '도시', value: `${activityStats.totalCities}개` },
    { icon: '👥', label: '활성 회원', value: `${formatNumber(activityStats.activeUsers)}명` },
    { icon: '⭐', label: '리뷰', value: `${formatNumber(activityStats.reviewCount)}개` },
    { icon: '📅', label: '밋업', value: `${activityStats.meetupCount}회/년` },
    { icon: '💬', label: '메시지', value: `${formatNumber(activityStats.monthlyMessages)}/월` },
    { icon: '🌍', label: '방문자', value: `${formatNumber(activityStats.monthlyVisitors)}/월` },
    { icon: '📈', label: '성장률', value: `+${activityStats.growthRate}%` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {statsItems.map((item) => (
        <Card key={item.label} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-2xl font-bold text-primary">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
