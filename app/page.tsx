import { HeroSection } from '@/components/home/HeroSection';
import { HomeContent } from '@/components/home/HomeContent';
import { StatsSection } from '@/components/home/StatsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { stats } from '@/lib/data/meetups';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar + Main Content (Client Component) */}
      <HomeContent />

      {/* Bottom Sections */}
      <StatsSection stats={stats} />
      <NewsletterSection />
    </div>
  );
}
