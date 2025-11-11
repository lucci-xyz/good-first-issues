"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Issue, Quest, issueToQuest } from '@/types/quest';
import { QuestCard } from '@/components/quests/QuestCard';
import { SearchInput } from '@/components/quests/SearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showGoodFirstOnly, setShowGoodFirstOnly] = useState(false);

  // Fetch quests
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch('/api/get-issues');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json() as { issues: Issue[] };
        setQuests(data.issues.map(issueToQuest));
      } catch (e) {
        console.error('Error fetching quests:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  // Get available languages
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    quests.forEach(q => q.language && languages.add(q.language));
    return Array.from(languages).sort().slice(0, 8); // Top 8 languages
  }, [quests]);

  // Filter quests
  const filteredQuests = useMemo(() => {
    let result = [...quests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q =>
        q.title.toLowerCase().includes(query) ||
        q.repository.toLowerCase().includes(query)
      );
    }

    if (showGoodFirstOnly) {
      result = result.filter(q =>
        q.labels?.some(l => l.toLowerCase().includes('good first issue'))
      );
    }

    if (selectedLanguages.length > 0) {
      result = result.filter(q => q.language && selectedLanguages.includes(q.language));
    }

    return result.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [quests, searchQuery, showGoodFirstOnly, selectedLanguages]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            {/* Search & Filters */}
            <div className="mb-8 space-y-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search projects or issues..."
              />
              
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  variant={showGoodFirstOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowGoodFirstOnly(!showGoodFirstOnly)}
                  className="h-9"
                >
                  Good First Issues
                </Button>

                <div className="h-4 w-px bg-border mx-1" />

                {availableLanguages.map(lang => (
                  <Button
                    key={lang}
                    variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleLanguage(lang)}
                    className="h-9"
                  >
                    {lang}
                  </Button>
                ))}

                {(selectedLanguages.length > 0 || showGoodFirstOnly) && (
                  <>
                    <div className="h-4 w-px bg-border mx-1" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedLanguages([]);
                        setShowGoodFirstOnly(false);
                      }}
                      className="h-9 text-muted-foreground"
                    >
                      Clear filters
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground mb-6">
              {loading ? 'Loading...' : `${filteredQuests.length} quests`}
            </div>

            {/* Quest List */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : filteredQuests.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No quests found</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLanguages([]);
                      setShowGoodFirstOnly(false);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuests.map(quest => (
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

