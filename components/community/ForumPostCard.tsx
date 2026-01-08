import Link from 'next/link';
import { Eye, Heart, MessageSquare, Pin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ForumPost } from '@/lib/types';
import { categoryLabels, categoryColors } from '@/lib/data/forum';

interface ForumPostCardProps {
  post: ForumPost;
}

export function ForumPostCard({ post }: ForumPostCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return '방금 전';
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Author Avatar */}
          <div className="hidden sm:block w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center text-lg">
            {post.authorAvatar ? (
              <span>{post.authorName.charAt(0)}</span>
            ) : (
              <span>{post.authorName.charAt(0)}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {post.isPinned && (
                <Pin className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              <Badge className={`${categoryColors[post.category]} text-xs`}>
                {categoryLabels[post.category]}
              </Badge>
            </div>

            {/* Title */}
            <Link
              href={`/community/forum/${post.id}`}
              className="block group"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </h3>
            </Link>

            {/* Meta Info */}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
              <span>{post.authorName}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {post.likeCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {post.commentCount}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
