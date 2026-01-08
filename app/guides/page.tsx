import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { GuidesContent } from '@/components/guides/GuidesContent';

export const metadata = {
  title: '가이드 | 노마드코리아',
  description: '한국 디지털노마드 생활에 필요한 비자, 숙소, 작업공간, 생활 정보 가이드',
};

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">가이드</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">노마드 가이드</h1>
        <p className="text-muted-foreground">
          한국에서의 디지털노마드 생활에 필요한 모든 정보를 담았습니다.
        </p>
      </div>

      {/* Content */}
      <GuidesContent />
    </div>
  );
}
