import Link from 'next/link';
import { StatsContent } from '@/components/stats/StatsContent';

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">통계</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="mr-2">📊</span>
          노마드코리아 통계
        </h1>
        <p className="text-muted-foreground">
          한국 디지털 노마드 커뮤니티의 실시간 통계와 인사이트를 확인하세요.
        </p>
      </div>

      {/* Stats Content */}
      <StatsContent />
    </div>
  );
}
