'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ForumPostCard } from './ForumPostCard';
import { getAllPosts } from '@/lib/data/forum';
import type { ForumCategory } from '@/lib/types';

type CategoryFilter = ForumCategory | 'all';

interface CategoryTab {
  id: CategoryFilter;
  label: string;
}

const categoryTabs: CategoryTab[] = [
  { id: 'all', label: '전체' },
  { id: 'question', label: '질문' },
  { id: 'info', label: '정보공유' },
  { id: 'job', label: '구인구직' },
  { id: 'free', label: '자유게시판' },
];

export function ForumContent() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const posts = getAllPosts();

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={selectedCategory === tab.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Posts Count */}
      <p className="text-sm text-muted-foreground mb-4">
        총 {filteredPosts.length}개의 게시글
      </p>

      {/* Posts List */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
