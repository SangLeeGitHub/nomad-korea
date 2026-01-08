import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForumPostNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          게시글을 찾을 수 없습니다.
        </p>
        <Link href="/community/forum">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            포럼으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
