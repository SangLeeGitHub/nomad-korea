'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  MapPin,
  Wifi,
  DollarSign,
  Coffee,
  Users,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Zap,
  Calendar,
} from 'lucide-react';
import { cities } from '@/lib/data/cities';
import { getCityDetailBySlug } from '@/lib/data/city-details';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { City, CityDetail, Workspace, Review } from '@/lib/types';

type TabType = 'overview' | 'workspaces' | 'reviews';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function CityHeader({ city }: { city: City }) {
  const formatCurrency = (amount: number) => {
    return `${(amount / 10000).toFixed(0)}만원`;
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{city.name}</h1>
            <span className="text-lg text-muted-foreground">({city.nameEn})</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              #{city.rank}
            </Badge>
          </div>
          <p className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            {city.region}
          </p>
          <div className="flex flex-wrap gap-2">
            {city.badges.map((badge) => (
              <Badge key={badge.id} variant="secondary" className={badge.color}>
                <span className="mr-1">{badge.icon}</span>
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-background rounded-lg p-4">
          <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
          <span className="text-3xl font-bold">{city.overallScore}</span>
          <span className="text-muted-foreground">/ 5.0</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-background rounded-lg p-3 text-center">
          <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-600" />
          <p className="text-sm text-muted-foreground">월 비용</p>
          <p className="font-semibold">{formatCurrency(city.monthlyCost)}</p>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <Wifi className="h-5 w-5 mx-auto mb-1 text-blue-600" />
          <p className="text-sm text-muted-foreground">인터넷</p>
          <p className="font-semibold">{city.internetSpeed}Mbps</p>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <Coffee className="h-5 w-5 mx-auto mb-1 text-amber-600" />
          <p className="text-sm text-muted-foreground">카페</p>
          <p className="font-semibold">{city.cafeCount}개</p>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <Users className="h-5 w-5 mx-auto mb-1 text-purple-600" />
          <p className="text-sm text-muted-foreground">활동 노마드</p>
          <p className="font-semibold">{city.activeNomads}명</p>
        </div>
      </div>
    </div>
  );
}

function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: '개요' },
    { id: 'workspaces', label: '작업공간' },
    { id: 'reviews', label: '리뷰' },
  ];

  return (
    <div className="flex border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function OverviewTab({ detail }: { detail: CityDetail }) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>도시 소개</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{detail.longDescription}</p>
        </CardContent>
      </Card>

      {/* Pros & Cons */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <ThumbsUp className="h-5 w-5" />
              장점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {detail.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <ThumbsDown className="h-5 w-5" />
              단점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {detail.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>추천 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">추천 체류 기간</p>
                <p className="font-medium">{detail.recommendedStay}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">추천 시즌</p>
                <p className="font-medium">{detail.bestSeasons.join(', ')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold">{workspace.name}</h3>
            <p className="text-sm text-muted-foreground">{workspace.address}</p>
          </div>
          <Badge variant={workspace.type === 'coworking' ? 'default' : 'secondary'}>
            {workspace.type === 'coworking' ? '코워킹' : '카페'}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="font-medium">{workspace.rating}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{workspace.priceRange}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-4 w-4 text-muted-foreground" />
            <span>{workspace.wifiSpeed}Mbps</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span>{workspace.hasOutlet ? '콘센트 있음' : '콘센트 없음'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{workspace.openHours}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WorkspacesTab({ workspaces }: { workspaces: Workspace[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        작업 공간 ({workspaces.length}개)
      </h2>
      {workspaces.length === 0 ? (
        <p className="text-muted-foreground">등록된 작업공간이 없습니다.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-lg">{review.userName[0]}</span>
            </div>
            <div>
              <p className="font-medium">{review.userName}</p>
              <p className="text-sm text-muted-foreground">
                {review.stayDuration} 체류 | {review.visitDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{review.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-3">{review.content}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{review.helpful}명이 도움됨</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewsTab({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        리뷰 ({reviews.length}개)
      </h2>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground">등록된 리뷰가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

function RelatedCities({ currentSlug }: { currentSlug: string }) {
  const relatedCities = cities.filter((city) => city.slug !== currentSlug).slice(0, 3);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>다른 도시도 둘러보세요</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedCities.map((city) => (
            <Link
              key={city.id}
              href={`/cities/${city.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-lg font-bold">#{city.rank}</span>
              </div>
              <div>
                <p className="font-medium">{city.name}</p>
                <p className="text-sm text-muted-foreground">{city.region}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CityDetailPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  // Resolve the params promise
  if (!resolvedParams) {
    params.then(setResolvedParams);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-4"></div>
        </div>
      </div>
    );
  }

  const { slug } = resolvedParams;
  const city = cities.find((c) => c.slug === slug);
  const detail = getCityDetailBySlug(slug);

  if (!city || !detail) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link href="/cities" className="hover:text-foreground transition-colors">
          도시 탐색
        </Link>
        <span>/</span>
        <span className="text-foreground">{city.name}</span>
      </nav>

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/cities">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            도시 목록으로
          </Button>
        </Link>
      </div>

      {/* City Header */}
      <CityHeader city={city} />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab detail={detail} />}
      {activeTab === 'workspaces' && <WorkspacesTab workspaces={detail.workspaces} />}
      {activeTab === 'reviews' && <ReviewsTab reviews={detail.reviews} />}

      {/* Related Cities */}
      <RelatedCities currentSlug={slug} />
    </div>
  );
}
