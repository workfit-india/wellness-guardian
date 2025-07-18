'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { tags } from "./data/tag";

interface TagSelectorProps {
  onSearch: (tags: string[]) => void;
}

export default function TagSelector({ onSearch }: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = tags;

  const filteredTags = searchTerm
    ? availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedTags.includes(tag)
      )
    : [];

  const handleAddTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchTerm('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSearch = async () => {
    if (selectedTags.length > 0) {
      onSearch(selectedTags);
    }
  };

  return (
    <div className="space-y-4 p-1 w-full max-w-none">
      <div className="w-full">
        <div className="relative w-full">
          <Input
            className="w-full pr-12"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedTags.length > 0) {
                handleSearch();
              }
            }}
          />
          <Button
            onClick={handleSearch}
            disabled={selectedTags.length === 0}
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {filteredTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 cursor-pointer text-green-600">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-red-500"
                onClick={() => handleRemoveTag(tag)}
              >
                ✕
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};