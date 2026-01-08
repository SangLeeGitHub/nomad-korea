import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">가이드를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground mb-8">
        요청하신 가이드가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link href="/guides">
        <Button>가이드 목록으로</Button>
      </Link>
    </div>
  );
}
