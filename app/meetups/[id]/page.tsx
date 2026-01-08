'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MeetupHeader } from '@/components/meetups/MeetupHeader';
import { AttendeeList } from '@/components/meetups/AttendeeList';
import { RSVPSection } from '@/components/meetups/RSVPSection';
import { getMeetupDetailById, meetups } from '@/lib/data/meetups';
import { MeetupCard } from '@/components/meetups/MeetupCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MeetupDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const meetup = getMeetupDetailById(id);

  if (!meetup) {
    notFound();
  }

  // 같은 도시의 다른 밋업 (최대 3개)
  const relatedMeetups = meetups
    .filter((m) => m.cityName === meetup.cityName && m.id !== meetup.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link href="/meetups" className="hover:text-foreground transition-colors">
          밋업
        </Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{meetup.title}</span>
      </nav>

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/meetups">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            밋업 목록으로
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <MeetupHeader meetup={meetup} />

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>소개</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{meetup.longDescription}</p>
            </CardContent>
          </Card>

          {/* Agenda (if exists) */}
          {meetup.agenda && meetup.agenda.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>일정</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meetup.agenda.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-medium">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Requirements (if exists) */}
          {meetup.requirements && meetup.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>준비물 / 참가 조건</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {meetup.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Location Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                위치
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{meetup.locationName}</p>
                  <p className="text-sm">{meetup.locationAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendees */}
          <AttendeeList
            attendees={meetup.attendees}
            maxAttendees={meetup.maxAttendees}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* RSVP Section */}
          <div className="sticky top-24">
            <RSVPSection
              rsvpCount={meetup.rsvpCount}
              maxAttendees={meetup.maxAttendees}
            />
          </div>
        </div>
      </div>

      {/* Related Meetups */}
      {relatedMeetups.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {meetup.cityName}의 다른 밋업
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMeetups.map((m) => (
              <MeetupCard key={m.id} meetup={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
