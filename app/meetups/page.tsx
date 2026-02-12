import { MeetupsContent } from '@/components/meetups/MeetupsContent';
import { getMeetups, getUniqueCities } from '@/lib/dal/meetups';

export default async function MeetupsPage() {
  const [meetups, cities] = await Promise.all([
    getMeetups(),
    getUniqueCities(),
  ]);

  return <MeetupsContent meetups={meetups} cities={cities} />;
}
