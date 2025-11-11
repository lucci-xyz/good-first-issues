import React from 'react';
import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <a
      href={quest.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-lg border border-border/40 bg-card hover:border-foreground/20 transition-all group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-base font-medium group-hover:text-foreground/80 transition-colors line-clamp-2 flex-1">
          {quest.title}
        </h3>
        {quest.hasBounty && (
          <Badge variant="default" className="shrink-0 text-xs">
            Bounty
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span className="font-mono text-xs">{quest.repository}</span>
        <span>·</span>
        <span className="text-xs">#{quest.number}</span>
        <span>·</span>
        <span className="text-xs">{formatDate(quest.created_at)}</span>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {quest.language && (
          <Badge variant="secondary" className="text-xs font-normal">
            {quest.language}
          </Badge>
        )}
        {quest.labels?.slice(0, 3).map((label, idx) => (
          <Badge key={idx} variant="outline" className="text-xs font-normal">
            {label}
          </Badge>
        ))}
        {quest.stars !== undefined && quest.stars > 0 && (
          <span className="text-xs text-muted-foreground ml-auto">
            {quest.stars.toLocaleString()} stars
          </span>
        )}
      </div>
    </a>
  );
}

