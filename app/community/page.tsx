import Link from 'next/link';
import { ArrowRight, MessageCircle, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/data/forum';
import { getChannels } from '@/lib/data/chat';

export default function CommunityPage() {
  const posts = getAllPosts();
  const channels = getChannels();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">커뮤니티</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">커뮤니티</h1>
        <p className="text-muted-foreground">
          디지털 노마드들과 소통하고, 정보를 공유하세요.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <p className="text-sm text-muted-foreground">총 게시글</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{channels.length}</div>
            <p className="text-sm text-muted-foreground">채팅방</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">523</div>
            <p className="text-sm text-muted-foreground">온라인 멤버</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <p className="text-sm text-muted-foreground">총 멤버</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Forum Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>포럼</CardTitle>
                <CardDescription>질문하고, 정보를 공유하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              노마드 생활에 대한 질문, 유용한 정보 공유, 구인구직, 자유로운 이야기를 나눌 수 있는 공간입니다.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">질문</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">정보공유</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">구인구직</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">자유게시판</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/community/forum" className="w-full">
              <Button className="w-full">
                포럼 바로가기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Chat Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>채팅</CardTitle>
                <CardDescription>실시간으로 소통하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              도시별 채팅방에서 실시간으로 다른 노마드들과 대화하고, 현지 정보를 공유받으세요.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {channels.slice(0, 4).map((channel) => (
                <span
                  key={channel.id}
                  className="px-2 py-1 bg-muted rounded flex items-center gap-1"
                >
                  #{channel.name}
                  <span className="text-muted-foreground">({channel.memberCount})</span>
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/community/chat" className="w-full">
              <Button className="w-full">
                채팅 참여하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
