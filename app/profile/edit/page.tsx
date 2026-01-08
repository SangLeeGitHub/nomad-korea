import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { getUserProfile } from '@/lib/data/user-profile';

export const metadata = {
  title: '프로필 수정 | 노마드코리아',
  description: '프로필 정보 수정',
};

export default function ProfileEditPage() {
  const profile = getUserProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/profile" className="hover:text-foreground transition-colors">
          내 프로필
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">수정</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">프로필 수정</h1>
        <p className="text-muted-foreground">
          프로필 정보를 수정할 수 있습니다.
        </p>
      </div>

      <div className="max-w-2xl">
        <ProfileEditForm profile={profile} />
      </div>
    </div>
  );
}
