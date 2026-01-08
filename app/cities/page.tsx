import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cities } from '@/lib/data/cities';
import { CityCard } from '@/components/home/CityCard';
import { Button } from '@/components/ui/button';

export default function CitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">도시 탐색</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">도시 탐색</h1>
          <p className="text-muted-foreground mt-1">
            디지털 노마드를 위한 한국의 도시들을 살펴보세요
          </p>
        </div>
      </div>

      {/* City Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{cities.length}</span>개 도시
        </p>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
