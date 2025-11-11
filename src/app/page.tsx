"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Issue, Quest, issueToQuest } from '@/types/quest';
import { QuestCard } from '@/components/bounties/QuestCard';
import { SearchInput } from '@/components/bounties/SearchInput';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { SortOption } from '@/types/quest';

export default function HomePage() {
  const [bounties, setBounties] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [onlyBounties, setOnlyBounties] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Fetch bounties
  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch('/api/get-issues');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json() as { issues: Issue[] };
        setBounties(data.issues.map(issueToQuest));
      } catch (e) {
        console.error('Error fetching bounties:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchBounties();
  }, []);

  // Available options
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    bounties.forEach(q => q.language && languages.add(q.language));
    return Array.from(languages).sort();
  }, [bounties]);

  const issueTypes = useMemo(() => {
    const types = new Set<string>();
    bounties.forEach(q => {
      q.labels?.forEach(label => {
        const lower = label.toLowerCase();
        if (lower.includes('good first issue')) types.add('good first issue');
        else if (lower.includes('bug')) types.add('bug');
        else if (lower.includes('feature') || lower.includes('enhancement')) types.add('feature');
        else if (lower.includes('documentation') || lower.includes('docs')) types.add('documentation');
        else if (lower.includes('help wanted')) types.add('help wanted');
      });
    });
    return Array.from(types).sort();
  }, [bounties]);

  const industries = useMemo(() => {
    const ind = new Set<string>();
    bounties.forEach(q => {
      q.tags?.forEach(tag => {
        const lower = tag.toLowerCase();
        // Map tags to industries
        if (['ethereum', 'solidity', 'smartcontracts', 'defi', 'blockchain'].some(t => lower.includes(t))) ind.add('blockchain');
        if (['frontend', 'react', 'vue', 'angular', 'ui'].some(t => lower.includes(t))) ind.add('frontend');
        if (['backend', 'api', 'server'].some(t => lower.includes(t))) ind.add('backend');
        if (['docs', 'documentation'].some(t => lower.includes(t))) ind.add('documentation');
        if (['security', 'crypto'].some(t => lower.includes(t))) ind.add('security');
        if (['tooling', 'cli', 'dev-tools'].some(t => lower.includes(t))) ind.add('tooling');
        if (['web3', 'ipfs', 'p2p'].some(t => lower.includes(t))) ind.add('web3');
        if (['ai', 'ml', 'data'].some(t => lower.includes(t))) ind.add('ai/ml');
      });
    });
    return Array.from(ind).sort();
  }, [bounties]);

  // Filter and sort bounties
  const filteredAndSortedBounties = useMemo(() => {
    let result = [...bounties];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q =>
        q.title.toLowerCase().includes(query) ||
        q.repository.toLowerCase().includes(query)
      );
    }

    // Issue types
    if (selectedIssueTypes.length > 0) {
      result = result.filter(q =>
        selectedIssueTypes.some(type =>
          q.labels?.some(l => l.toLowerCase().includes(type))
        )
      );
    }

    // Languages
    if (selectedLanguages.length > 0) {
      result = result.filter(q => q.language && selectedLanguages.includes(q.language));
    }

    // Industries (via tags)
    if (selectedIndustries.length > 0) {
      result = result.filter(q =>
        selectedIndustries.some(ind => {
          const tagStr = q.tags?.join(' ').toLowerCase() || '';
          if (ind === 'blockchain') return ['ethereum', 'solidity', 'smartcontracts', 'defi', 'blockchain'].some(t => tagStr.includes(t));
          if (ind === 'frontend') return ['frontend', 'react', 'vue', 'angular', 'ui'].some(t => tagStr.includes(t));
          if (ind === 'backend') return ['backend', 'api', 'server'].some(t => tagStr.includes(t));
          if (ind === 'documentation') return ['docs', 'documentation'].some(t => tagStr.includes(t));
          if (ind === 'security') return ['security', 'crypto'].some(t => tagStr.includes(t));
          if (ind === 'tooling') return ['tooling', 'cli', 'dev-tools'].some(t => tagStr.includes(t));
          if (ind === 'web3') return ['web3', 'ipfs', 'p2p'].some(t => tagStr.includes(t));
          if (ind === 'ai/ml') return ['ai', 'ml', 'data'].some(t => tagStr.includes(t));
          return false;
        })
      );
    }

    // Bounties
    if (onlyBounties) {
      result = result.filter(q => q.hasBounty);
    }

    // Sort
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
  }, [bounties, searchQuery, selectedIssueTypes, selectedLanguages, selectedIndustries, onlyBounties, sortBy]);

  const toggleFilter = (value: string, current: string[], setter: (val: string[]) => void) => {
    setter(current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  };

  const clearAllFilters = () => {
    setSelectedIssueTypes([]);
    setSelectedLanguages([]);
    setSelectedIndustries([]);
    setOnlyBounties(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedIssueTypes.length > 0 || selectedLanguages.length > 0 || 
    selectedIndustries.length > 0 || onlyBounties || searchQuery;

  return (
    <div className="min-h-screen">
      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            {/* Search & Sort */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search bounties..."
                />
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="stars">Most stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filters - Compact with Labels */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-6">
              {/* Issue Types */}
              {issueTypes.length > 0 && (
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Type</span>
                  {issueTypes.map(type => (
                    <Button
                      key={type}
                      variant={selectedIssueTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(type, selectedIssueTypes, setSelectedIssueTypes)}
                      className="h-7 text-xs capitalize"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              )}

              {/* Languages */}
              {availableLanguages.length > 0 && (
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Language</span>
                  {availableLanguages.slice(0, 8).map(lang => (
                    <Button
                      key={lang}
                      variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(lang, selectedLanguages, setSelectedLanguages)}
                      className="h-7 text-xs"
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              )}

              {/* Industries */}
              {industries.length > 0 && (
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Industry</span>
                  {industries.map(ind => (
                    <Button
                      key={ind}
                      variant={selectedIndustries.includes(ind) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(ind, selectedIndustries, setSelectedIndustries)}
                      className="h-7 text-xs capitalize"
                    >
                      {ind}
                    </Button>
                  ))}
                </div>
              )}

              {/* Bounty */}
              <div className="flex gap-2 items-center">
                <span className="text-xs text-muted-foreground">Bounty</span>
                <Button
                  variant={onlyBounties ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOnlyBounties(!onlyBounties)}
                  className="h-7 text-xs"
                >
                  Has bounty
                </Button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-7 text-xs text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground mb-6">
              {loading ? 'Loading...' : `${filteredAndSortedBounties.length} bounties`}
            </div>

            {/* Bounty List */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : filteredAndSortedBounties.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No bounties found</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedBounties.map(quest => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

