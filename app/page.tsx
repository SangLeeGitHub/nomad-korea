import { HeroSection } from '@/components/home/HeroSection';
import { FilterBar } from '@/components/home/FilterBar';
import { CityGrid } from '@/components/home/CityGrid';
import { Sidebar } from '@/components/home/Sidebar';
import { StatsSection } from '@/components/home/StatsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { cities } from '@/lib/data/cities';
import { meetups, stats } from '@/lib/data/meetups';

export default function Home() {
  // Display first 10 cities for the homepage
  const featuredCities = cities.slice(0, 10);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar */}
      <FilterBar />

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: City Grid */}
          <div className="lg:col-span-8">
            <CityGrid cities={featuredCities} />
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar meetups={meetups} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <StatsSection stats={stats} />
      <NewsletterSection />
    </div>
  );
}
