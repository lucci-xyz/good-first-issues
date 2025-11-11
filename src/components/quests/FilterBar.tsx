"use client";

import React, { useMemo } from 'react';
import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FilterState {
  labels: string[];
  languages: string[];
  owners: string[];
  hasBounty: boolean;
}

interface FilterBarProps {
  quests: Quest[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ quests, filters, onChange }: FilterBarProps) {
  const [labelsOpen, setLabelsOpen] = React.useState(true);
  const [languagesOpen, setLanguagesOpen] = React.useState(true);
  const [ownersOpen, setOwnersOpen] = React.useState(false);

  const availableLabels = useMemo(() => {
    const labels = new Set<string>();
    quests.forEach(q => q.labels?.forEach(l => labels.add(l)));
    return Array.from(labels).sort();
  }, [quests]);

  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    quests.forEach(q => q.language && languages.add(q.language));
    return Array.from(languages).sort();
  }, [quests]);

  const availableOwners = useMemo(() => {
    const owners = new Set<string>();
    quests.forEach(q => q.owner && owners.add(q.owner));
    return Array.from(owners).sort();
  }, [quests]);

  const toggleLabel = (label: string) => {
    const newLabels = filters.labels.includes(label)
      ? filters.labels.filter(l => l !== label)
      : [...filters.labels, label];
    onChange({ ...filters, labels: newLabels });
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    onChange({ ...filters, languages: newLanguages });
  };

  const toggleOwner = (owner: string) => {
    const newOwners = filters.owners.includes(owner)
      ? filters.owners.filter(o => o !== owner)
      : [...filters.owners, owner];
    onChange({ ...filters, owners: newOwners });
  };

  const clearAll = () => {
    onChange({
      labels: [],
      languages: [],
      owners: [],
      hasBounty: false,
    });
  };

  const activeFiltersCount = 
    filters.labels.length + 
    filters.languages.length + 
    filters.owners.length + 
    (filters.hasBounty ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Bounty Toggle */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasBounty"
          checked={filters.hasBounty}
          onCheckedChange={(checked) => 
            onChange({ ...filters, hasBounty: checked as boolean })
          }
        />
        <label
          htmlFor="hasBounty"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          💰 Has Bounty
        </label>
      </div>

      {/* Labels */}
      <Collapsible open={labelsOpen} onOpenChange={setLabelsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium hover:underline">
          <span>Labels {filters.labels.length > 0 && `(${filters.labels.length})`}</span>
          <span className="text-xs">{labelsOpen ? '▼' : '▶'}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {availableLabels.slice(0, 10).map(label => (
            <div key={label} className="flex items-center space-x-2">
              <Checkbox
                id={`label-${label}`}
                checked={filters.labels.includes(label)}
                onCheckedChange={() => toggleLabel(label)}
              />
              <label
                htmlFor={`label-${label}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Languages */}
      <Collapsible open={languagesOpen} onOpenChange={setLanguagesOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium hover:underline">
          <span>Languages {filters.languages.length > 0 && `(${filters.languages.length})`}</span>
          <span className="text-xs">{languagesOpen ? '▼' : '▶'}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {availableLanguages.map(language => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={`language-${language}`}
                checked={filters.languages.includes(language)}
                onCheckedChange={() => toggleLanguage(language)}
              />
              <label
                htmlFor={`language-${language}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {language}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Owners */}
      <Collapsible open={ownersOpen} onOpenChange={setOwnersOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium hover:underline">
          <span>Owners {filters.owners.length > 0 && `(${filters.owners.length})`}</span>
          <span className="text-xs">{ownersOpen ? '▼' : '▶'}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2 max-h-48 overflow-y-auto">
          {availableOwners.slice(0, 20).map(owner => (
            <div key={owner} className="flex items-center space-x-2">
              <Checkbox
                id={`owner-${owner}`}
                checked={filters.owners.includes(owner)}
                onCheckedChange={() => toggleOwner(owner)}
              />
              <label
                htmlFor={`owner-${owner}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer truncate"
              >
                {owner}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

