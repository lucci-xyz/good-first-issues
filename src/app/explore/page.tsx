"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Issue, Quest, issueToQuest } from '@/types/quest';
import { QuestList } from '@/components/quests/QuestList';
import { SearchInput } from '@/components/quests/SearchInput';
import { SortMenu, SortOption } from '@/components/quests/SortMenu';
import { FilterBar, FilterState } from '@/components/quests/FilterBar';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterState>({
    labels: [],
    languages: [],
    owners: [],
    hasBounty: false,
  });

  // Initialize from URL params
  useEffect(() => {
    const labelsParam = searchParams.get('labels');
    if (labelsParam) {
      const labelsArray = labelsParam.split(',').filter(Boolean);
      setFilters(prev => ({ ...prev, labels: labelsArray }));
    }
  }, [searchParams]);

  // Fetch quests
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-issues');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json() as { issues: Issue[] };
        const questsData = data.issues.map(issueToQuest);
        setQuests(questsData);
        setError(null);
      } catch (e) {
        console.error('Error fetching quests:', e);
        setError(e instanceof Error ? e.message : 'Failed to load quests');
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  // Filter and sort quests
  const filteredAndSortedQuests = useMemo(() => {
    let result = [...quests];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q =>
        q.title.toLowerCase().includes(query) ||
        q.repository.toLowerCase().includes(query) ||
        q.labels?.some(l => l.toLowerCase().includes(query))
      );
    }

    // Apply label filters
    if (filters.labels.length > 0) {
      result = result.filter(q =>
        filters.labels.some(label => q.labels?.includes(label))
      );
    }

    // Apply language filters
    if (filters.languages.length > 0) {
      result = result.filter(q =>
        q.language && filters.languages.includes(q.language)
      );
    }

    // Apply owner filters
    if (filters.owners.length > 0) {
      result = result.filter(q =>
        q.owner && filters.owners.includes(q.owner)
      );
    }

    // Apply bounty filter
    if (filters.hasBounty) {
      result = result.filter(q => q.hasBounty);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [quests, searchQuery, filters, sortBy]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-red-500">Error: {error}</p>
          <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Quests</h1>
        <p className="text-muted-foreground">
          Discover open source contribution opportunities across thousands of projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <FilterBar
              quests={quests}
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search quests by title, repo, or labels..."
              />
            </div>
            <SortMenu value={sortBy} onChange={setSortBy} />
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {loading ? (
              'Loading...'
            ) : (
              <>
                Showing {filteredAndSortedQuests.length} of {quests.length} quests
              </>
            )}
          </div>

          {/* Quest List */}
          <QuestList
            quests={filteredAndSortedQuests}
            loading={loading}
            emptyMessage="No quests match your filters"
          />
        </div>
      </div>
    </div>
  );
}

