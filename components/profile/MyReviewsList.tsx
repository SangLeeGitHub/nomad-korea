import Link from 'next/link';
import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { UserReview } from '@/lib/types';

interface MyReviewsListProps {
  reviews: UserReview[];
}

export function MyReviewsList({ reviews }: MyReviewsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          작성한 리뷰
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/cities/${review.citySlug}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {review.cityName}
                </Link>
                <div className="flex items-center gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {review.content}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{review.createdAt.toLocaleDateString('ko-KR')}</span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {review.helpful}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
