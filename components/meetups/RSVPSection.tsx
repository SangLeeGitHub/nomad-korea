'use client';

import { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RSVPSectionProps {
  rsvpCount: number;
  maxAttendees: number;
}

export function RSVPSection({ rsvpCount, maxAttendees }: RSVPSectionProps) {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFull = rsvpCount >= maxAttendees;
  const attendancePercent = (rsvpCount / maxAttendees) * 100;

  const handleRSVP = async () => {
    setIsLoading(true);
    // 가짜 딜레이 (실제 저장 미구현)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRSVPed(!isRSVPed);
    setIsLoading(false);
    alert(isRSVPed ? 'RSVP가 취소되었습니다.' : 'RSVP 완료! 밋업에서 만나요!');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Attendance Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">
                {rsvpCount}/{maxAttendees}명
              </span>
            </div>
            {isFull && !isRSVPed && (
              <span className="text-sm text-destructive font-medium">마감</span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                isFull ? 'bg-destructive' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(attendancePercent, 100)}%` }}
            />
          </div>

          {/* RSVP Button */}
          <Button
            onClick={handleRSVP}
            disabled={(isFull && !isRSVPed) || isLoading}
            variant={isRSVPed ? 'secondary' : 'default'}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              '처리 중...'
            ) : isRSVPed ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                RSVP 완료 (클릭하여 취소)
              </>
            ) : isFull ? (
              '마감되었습니다'
            ) : (
              'RSVP 하기'
            )}
          </Button>

          {/* Helper Text */}
          <p className="text-xs text-muted-foreground text-center">
            {isRSVPed
              ? '참가 신청이 완료되었습니다'
              : isFull
              ? '대기자 명단에 등록하시려면 주최자에게 문의하세요'
              : '참가 신청은 무료이며, 자리가 제한되어 있습니다'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
