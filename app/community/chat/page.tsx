import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatContent } from '@/components/community/ChatContent';

export default function ChatPage() {
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
        <span className="text-foreground">채팅</span>
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
        <h1 className="text-3xl font-bold mb-2">채팅</h1>
        <p className="text-muted-foreground">
          도시별 채팅방에서 실시간으로 다른 노마드들과 대화하세요.
        </p>
      </div>

      {/* Chat Content */}
      <ChatContent />
    </div>
  );
}
