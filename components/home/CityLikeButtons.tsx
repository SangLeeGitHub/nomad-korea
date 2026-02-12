'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface CityLikeButtonsProps {
  cityId: string;
  initialLikeCount: number;
  initialDislikeCount: number;
}

type VoteType = 'like' | 'dislike' | null;

export function CityLikeButtons({
  cityId,
  initialLikeCount,
  initialDislikeCount,
}: CityLikeButtonsProps) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [userVote, setUserVote] = useState<VoteType>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's existing vote on mount
  useEffect(() => {
    const fetchUserVote = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('city_likes')
        .select('type')
        .eq('user_id', user.id)
        .eq('city_id', cityId)
        .single();

      if (data) {
        setUserVote(data.type as VoteType);
      }
    };

    fetchUserVote();
  }, [cityId]);

  const handleVote = useCallback(async (type: 'like' | 'dislike') => {
    if (isLoading) return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    // Save previous state for rollback
    const prevLikeCount = likeCount;
    const prevDislikeCount = dislikeCount;
    const prevUserVote = userVote;

    // Optimistic update
    if (userVote === type) {
      // Toggle off
      setUserVote(null);
      if (type === 'like') setLikeCount((c) => Math.max(c - 1, 0));
      else setDislikeCount((c) => Math.max(c - 1, 0));
    } else if (userVote === null) {
      // New vote
      setUserVote(type);
      if (type === 'like') setLikeCount((c) => c + 1);
      else setDislikeCount((c) => c + 1);
    } else {
      // Switch vote
      setUserVote(type);
      if (type === 'like') {
        setLikeCount((c) => c + 1);
        setDislikeCount((c) => Math.max(c - 1, 0));
      } else {
        setLikeCount((c) => Math.max(c - 1, 0));
        setDislikeCount((c) => c + 1);
      }
    }

    setIsLoading(true);
    const { data, error } = await supabase.rpc('toggle_city_like', {
      p_city_id: cityId,
      p_type: type,
    });

    if (error) {
      // Rollback on error
      setLikeCount(prevLikeCount);
      setDislikeCount(prevDislikeCount);
      setUserVote(prevUserVote);
    } else if (data) {
      // Sync with server response
      const result = data as { like_count: number; dislike_count: number; user_vote: string | null };
      setLikeCount(result.like_count);
      setDislikeCount(result.dislike_count);
      setUserVote((result.user_vote as VoteType) || null);
    }

    setIsLoading(false);
  }, [cityId, likeCount, dislikeCount, userVote, isLoading, router]);

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote('like');
        }}
        disabled={isLoading}
        className={`flex items-center gap-1 transition-colors hover:text-blue-600 ${
          userVote === 'like' ? 'text-blue-600 font-semibold' : ''
        }`}
      >
        <ThumbsUp className={`h-4 w-4 ${userVote === 'like' ? 'fill-blue-600' : ''}`} />
        <span>{likeCount.toLocaleString()}</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote('dislike');
        }}
        disabled={isLoading}
        className={`flex items-center gap-1 transition-colors hover:text-red-600 ${
          userVote === 'dislike' ? 'text-red-600 font-semibold' : ''
        }`}
      >
        <span>{dislikeCount.toLocaleString()}</span>
        <ThumbsDown className={`h-4 w-4 ${userVote === 'dislike' ? 'fill-red-600' : ''}`} />
      </button>
    </div>
  );
}
