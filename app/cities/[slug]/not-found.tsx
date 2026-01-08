import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CityNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <MapPin className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">도시를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mb-8">
          요청하신 도시 정보가 존재하지 않습니다. 다른 도시를 탐색해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cities">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              도시 목록으로
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
