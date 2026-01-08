import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MeetupNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">밋업을 찾을 수 없습니다</h2>
        <p className="text-muted-foreground">
          요청하신 밋업이 존재하지 않거나 삭제되었습니다.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/meetups">
            <Button>밋업 목록으로</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
