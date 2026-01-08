'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { GuideCard } from './GuideCard';
import { getAllGuides, categoryLabels } from '@/lib/data/guides';
import type { GuideCategory } from '@/lib/types';

type CategoryFilter = 'all' | GuideCategory;

const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'visa', label: categoryLabels.visa },
  { value: 'accommodation', label: categoryLabels.accommodation },
  { value: 'workspace', label: categoryLabels.workspace },
  { value: 'lifestyle', label: categoryLabels.lifestyle },
];

export function GuidesContent() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const guides = useMemo(() => {
    const allGuides = getAllGuides();
    if (selectedCategory === 'all') {
      return allGuides;
    }
    return allGuides.filter((guide) => guide.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      {guides.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          해당 카테고리에 가이드가 없습니다.
        </div>
      )}
    </div>
  );
}
