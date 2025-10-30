'use client';

import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterSection() {
  return (
    <section className="w-full bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              <Mail className="inline h-8 w-8 mr-2 mb-1" />
              뉴스레터 구독
            </h2>
            <p className="text-muted-foreground">
              매주 월요일, 새로운 도시 정보와 노마드 팁을 받아보세요!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              className="flex-1 h-11"
            />
            <Button size="lg" className="h-11 px-8">
              구독하기 →
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✅ <span className="font-semibold text-foreground">12,450명</span>이 이미 구독
            중입니다
          </p>
        </div>
      </div>
    </section>
  );
}
