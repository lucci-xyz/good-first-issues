"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'newest' | 'oldest' | 'stars' | 'updated';

interface SortMenuProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortMenu({ value, onChange }: SortMenuProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest first</SelectItem>
        <SelectItem value="oldest">Oldest first</SelectItem>
        <SelectItem value="stars">Most stars</SelectItem>
      </SelectContent>
    </Select>
  );
}

