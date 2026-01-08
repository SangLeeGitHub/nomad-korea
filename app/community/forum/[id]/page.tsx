import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Eye, Heart, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getPostById, getCommentsByPostId, categoryLabels, categoryColors } from '@/lib/data/forum';

interface ForumPostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ForumPostDetailPage({ params }: ForumPostDetailPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  const comments = getCommentsByPostId(id);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const formatCommentDate = (date: Date) => {
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
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span>/</span>
        <Link href="/community" className="hover:text-foreground">
          커뮤니티
        </Link>
        <span>/</span>
        <Link href="/community/forum" className="hover:text-foreground">
          포럼
        </Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{post.title}</span>
      </nav>

      {/* Back Button */}
      <Link href="/community/forum">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          포럼으로 돌아가기
        </Button>
      </Link>

      {/* Post Content */}
      <Card className="mb-6">
        <CardHeader>
          {/* Category Badge */}
          <div className="mb-2">
            <Badge className={`${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-lg">{post.authorName.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{post.authorName}</p>
              <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Post Body */}
          <div className="prose prose-sm max-w-none mb-6">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              조회 {post.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              좋아요 {post.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              댓글 {post.commentCount}
            </span>
          </div>

          {/* Like Button */}
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              좋아요
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">댓글 {comments.length}개</h2>
        </CardHeader>

        <CardContent>
          {/* Comment Input */}
          <div className="flex gap-2 mb-6">
            <Input placeholder="댓글을 입력하세요..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 pb-4 border-b last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center text-sm">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatCommentDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                        {comment.likeCount}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
