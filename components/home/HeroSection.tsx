import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const popularTags = [
    { label: '저렴함', icon: '💰' },
    { label: '카페천국', icon: '☕' },
    { label: '바다', icon: '🌊' },
    { label: 'KTX', icon: '🚄' },
    { label: '산', icon: '🏔️' },
    { label: '대학가', icon: '🎓' },
    { label: '온화한 날씨', icon: '🌤️' },
    { label: '커뮤니티', icon: '👥' },
  ];

  const featuredIn = ['조선일보', 'TechCrunch', '노마드 매거진', '스타트업 위클리'];

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="inline-block">🌏</span>{' '}
              <span className="text-foreground">당신에게 맞는</span>
              <br />
              <span className="text-primary">한국 노마드 도시</span>
              <span className="text-foreground">를 찾아보세요</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              전국 50개 도시의 실시간 데이터와 2,500개 이상의 리얼 리뷰를 한곳에서
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="어떤 도시를 찾고 계신가요? (예: 저렴하고 카페 많은 도시)"
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                <Search className="h-5 w-5 mr-2" />
                도시 찾기
              </Button>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">인기 태그:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag.label}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                >
                  <span className="mr-1">{tag.icon}</span>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured In */}
          <div className="pt-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="mr-2">📰</span>Featured in:
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {featuredIn.map((media) => (
                <span
                  key={media}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1 border rounded-md"
                >
                  {media}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
