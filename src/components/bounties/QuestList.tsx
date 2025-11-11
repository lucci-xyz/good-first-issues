import React from 'react';
import { Quest } from '@/types/quest';
import { QuestCard } from './QuestCard';

interface QuestListProps {
  quests: Quest[];
  loading?: boolean;
  emptyMessage?: string;
}

export function QuestList({ quests, loading, emptyMessage = 'No bounties found' }: QuestListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading bounties...</p>
        </div>
      </div>
    );
  }

  if (quests.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <p className="text-lg text-muted-foreground mb-2">{emptyMessage}</p>
          <p className="text-sm text-muted-foreground/70">Try adjusting your filters or search query</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </div>
  );
}

