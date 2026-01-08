import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ForumContent } from '@/components/community/ForumContent';

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span>/</span>
        <Link href="/community" className="hover:text-foreground">
          커뮤니티
        </Link>
        <span>/</span>
        <span className="text-foreground">포럼</span>
      </nav>

      {/* Back Button */}
      <Link href="/community">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          커뮤니티로 돌아가기
        </Button>
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">포럼</h1>
        <p className="text-muted-foreground">
          노마드 생활에 대한 질문, 정보 공유, 구인구직 등 다양한 이야기를 나눠보세요.
        </p>
      </div>

      {/* Forum Content */}
      <ForumContent />
    </div>
  );
}
