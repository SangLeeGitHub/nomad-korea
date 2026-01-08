import Link from 'next/link';
import { ChevronRight, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { VisitedCitiesList } from '@/components/profile/VisitedCitiesList';
import { MyReviewsList } from '@/components/profile/MyReviewsList';
import { getUserProfile } from '@/lib/data/user-profile';

export const metadata = {
  title: '내 프로필 | 노마드코리아',
  description: '나의 노마드 활동 기록',
};

export default function ProfilePage() {
  const profile = getUserProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">내 프로필</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">내 프로필</h1>
        <Link href="/profile/edit">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            프로필 수정
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <ProfileHeader profile={profile} />
        <ProfileStats stats={profile.stats} />

        <div className="grid md:grid-cols-2 gap-6">
          <VisitedCitiesList cities={profile.visitedCities} />
          <MyReviewsList reviews={profile.myReviews} />
        </div>
      </div>
    </div>
  );
}
