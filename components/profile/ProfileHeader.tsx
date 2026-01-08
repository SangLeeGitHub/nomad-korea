import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { UserProfile } from '@/lib/types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const joinDate = profile.joinedAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-4xl shrink-0">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.nickname}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>👤</span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{profile.nickname}</h1>
            <p className="text-muted-foreground mb-4">{profile.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.currentLocation}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {joinDate} 가입
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
