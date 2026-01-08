'use client';

import { ActivityCards } from './ActivityCards';
import { CostComparisonChart } from './CostComparisonChart';
import { InternetSpeedChart } from './InternetSpeedChart';
import { MonthlyTrendChart } from './MonthlyTrendChart';
import { PopularCitiesChart } from './PopularCitiesChart';

export function StatsContent() {
  return (
    <div className="space-y-8">
      {/* 실시간 활동 지표 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">실시간 활동 지표</h2>
        <ActivityCards />
      </section>

      {/* 차트 섹션 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 도시별 비용 비교 */}
        <CostComparisonChart />

        {/* 인터넷 속도 순위 */}
        <InternetSpeedChart />
      </div>

      {/* 월별 추이 차트 (전체 너비) */}
      <MonthlyTrendChart />

      {/* 인기 도시 차트 */}
      <div className="grid md:grid-cols-2 gap-6">
        <PopularCitiesChart />

        {/* 추가 정보 카드 */}
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎯 노마드코리아 하이라이트</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                한국 전역 50개 도시 정보 제공
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                매월 12만+ 노마드 방문
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                연 355회 오프라인 밋업 개최
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                실시간 커뮤니티 채팅
              </li>
            </ul>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">📊 데이터 업데이트</h3>
            <p className="text-sm text-muted-foreground">
              모든 통계는 실시간으로 업데이트됩니다. 도시별 생활비와 인터넷 속도는
              커뮤니티 회원들의 제보를 바탕으로 매월 갱신됩니다.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              마지막 업데이트: 2024년 1월 15일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
