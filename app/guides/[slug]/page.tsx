import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getGuideBySlug, getRelatedGuides, categoryLabels, categoryColors } from '@/lib/data/guides';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: '가이드를 찾을 수 없습니다 | 노마드코리아' };
  }

  return {
    title: `${guide.title} | 노마드코리아`,
    description: guide.summary,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(slug, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-foreground">
          가이드
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground truncate max-w-[200px]">{guide.title}</span>
      </nav>

      {/* Back Button */}
      <Link href="/guides">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          목록으로
        </Button>
      </Link>

      {/* Guide Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge className={categoryColors[guide.category]}>
            {categoryLabels[guide.category]}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{guide.readTime}분 소요</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
        <p className="text-muted-foreground">{guide.summary}</p>
      </div>

      {/* Guide Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        {guide.content.split('\n').map((line, index) => {
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold mt-6 mb-3">{line.replace('### ', '')}</h3>;
          }
          if (line.startsWith('- ')) {
            return <li key={index} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
          }
          if (line.startsWith('- [ ] ')) {
            return <li key={index} className="ml-4 mb-1 list-none">☐ {line.replace('- [ ] ', '')}</li>;
          }
          if (line.match(/^\d+\. /)) {
            return <li key={index} className="ml-4 mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
          }
          if (line.startsWith('|')) {
            return null; // Skip table rows for simplicity
          }
          if (line.trim() === '') {
            return <br key={index} />;
          }
          return <p key={index} className="mb-2">{line}</p>;
        })}
      </article>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">관련 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedGuides.map((relatedGuide) => (
              <Link key={relatedGuide.id} href={`/guides/${relatedGuide.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <Badge className={`${categoryColors[relatedGuide.category]} w-fit`}>
                      {categoryLabels[relatedGuide.category]}
                    </Badge>
                    <CardTitle className="text-base">{relatedGuide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedGuide.summary}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
