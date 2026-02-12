import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCities, getCityDetailBySlug } from '@/lib/dal/cities';
import { Button } from '@/components/ui/button';
import { CityDetailContent } from '@/components/cities/CityDetailContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getCityDetailBySlug(slug);

  if (!result) {
    notFound();
  }

  const { city, ...detail } = result;

  // Get related cities
  const allCities = await getCities();
  const relatedCities = allCities.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link href="/cities" className="hover:text-foreground transition-colors">
          도시 탐색
        </Link>
        <span>/</span>
        <span className="text-foreground">{city.name}</span>
      </nav>

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/cities">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            도시 목록으로
          </Button>
        </Link>
      </div>

      {/* Client Component with tab state */}
      <CityDetailContent city={city} detail={detail} relatedCities={relatedCities} />
    </div>
  );
}
