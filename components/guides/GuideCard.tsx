'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Guide } from '@/lib/types';
import { categoryLabels, categoryColors } from '@/lib/data/guides';

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge className={categoryColors[guide.category]}>
              {categoryLabels[guide.category]}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{guide.readTime}분</span>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight mt-2">
            {guide.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {guide.summary}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
