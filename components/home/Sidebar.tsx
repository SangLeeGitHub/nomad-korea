import Link from 'next/link';
import { Calendar, Users, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Meetup } from '@/lib/types';
import { meetups as allMeetups } from '@/lib/data/meetups';

interface SidebarProps {
  meetups: Meetup[];
}

export function Sidebar({ meetups }: SidebarProps) {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} (${weekday}) ${hour}:${minute}`;
  };

  return (
    <aside className="space-y-6">
      {/* Meetup Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span>🥥</span>
            다음 밋업 (이번 주)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {meetups.map((meetup) => (
            <div key={meetup.id} className="pb-4 border-b last:border-0 last:pb-0">
              <div className="flex items-start gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {meetup.cityName} · {formatDate(meetup.date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    &quot;{meetup.title}&quot;
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  RSVP: {meetup.rsvpCount}명
                </span>
                <Link href={`/meetups/${meetup.id}`}>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    참여하기 →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/meetups" className="w-full">
            <Button variant="link" className="w-full p-0 h-auto text-primary">
              → 모든 밋업 보기 ({allMeetups.length}개)
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Traveling Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span>🛩️</span>
            지금 여행 중
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-3">
            <p className="text-3xl font-bold text-primary">124명</p>
            <div className="flex flex-wrap justify-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg"
                >
                  😊
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full p-0 h-auto text-primary text-sm">
              실시간 활동 지도 →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            실시간 채팅
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold">
              💬 #전체-채널 <span className="text-muted-foreground text-xs">(523 온라인)</span>
            </p>
            <div className="pl-4 space-y-1 text-xs text-muted-foreground">
              <p>@nomad_kim: 제주 카페 추천 좀!</p>
              <p>@cafe_pro: 델문도 좋아요</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">
              💬 #서울-노마드 <span className="text-muted-foreground text-xs">(234 온라인)</span>
            </p>
            <div className="pl-4 space-y-1 text-xs text-muted-foreground">
              <p>@seoul_dev: 강남 코워킹 어때?</p>
            </div>
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

      {/* New Members Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span>👋</span>
            신규 멤버
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">52명</span>/주
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {['@nomad_kim', '@seoul_dev', '@cafe_lover', '@jeju_life', '@busan_nomad', '@designer_j'].map(
                (member) => (
                  <span
                    key={member}
                    className="px-2 py-1 bg-muted rounded-md hover:bg-muted/70 cursor-pointer transition-colors"
                  >
                    {member}
                  </span>
                )
              )}
            </div>
            <Button variant="link" className="w-full p-0 h-auto text-primary text-sm">
              → 모든 멤버 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
