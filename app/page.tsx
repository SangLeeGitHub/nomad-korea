import { HeroSection } from '@/components/home/HeroSection';
import { HomeContent } from '@/components/home/HomeContent';
import { StatsSection } from '@/components/home/StatsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getCities } from '@/lib/dal/cities';
import { getMeetups } from '@/lib/dal/meetups';
import { getStats } from '@/lib/dal/stats';

export default async function Home() {
  const [cities, meetups, stats] = await Promise.all([
    getCities(),
    getMeetups(),
    getStats(),
  ]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar + Main Content (Client Component) */}
      <HomeContent cities={cities} meetups={meetups} />

      {/* Bottom Sections */}
      <StatsSection stats={stats} />
      <NewsletterSection />
    </div>
  );
}
