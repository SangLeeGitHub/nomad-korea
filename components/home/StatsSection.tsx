import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Stats } from '@/lib/types';

interface StatsSectionProps {
  stats: Stats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const statsItems = [
    { icon: '🏙️', label: '도시', value: `${stats.totalCities}개` },
    { icon: '👥', label: '활성 회원', value: `${formatNumber(stats.activeUsers)}명` },
    { icon: '⭐', label: '리뷰', value: `${formatNumber(stats.reviewCount)}개` },
    { icon: '📅', label: '밋업', value: `${stats.meetupCount}회/년` },
    { icon: '💬', label: '메시지', value: `${formatNumber(stats.monthlyMessages)}/월` },
    { icon: '🌍', label: '방문자', value: `${formatNumber(stats.monthlyVisitors)}/월` },
    { icon: '📈', label: '성장률', value: `+${stats.growthRate}%` },
  ];

  return (
    <section className="w-full bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="mr-2">📊</span>
            실시간 통계
          </h2>
          <p className="text-muted-foreground">
            노마드코리아와 함께하는 커뮤니티
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {statsItems.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-2 p-4 rounded-lg bg-background hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/stats">
            <Button variant="outline">
              더 자세한 통계 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
