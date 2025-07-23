'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TrendingTagsProps = {
  onTagSelection: (tags: string[]) => void;
};

export default function TrendingTags({ onTagSelection }: TrendingTagsProps) {

  const tranding = [
    "happiness",
    "peace",
    "calm",
    "focus",
    "productivity",
    "inspiration",
    "sleepless",
    "grateful",
    "manage stress",
    "lonely",
    "racing mind",
    "sleep meditation",
    "seed of life meditation"
  ];

  const onTagClick = (tag: string) => {
    onTagSelection([tag]);
  }

  return <>
    <div className="flex flex-wrap gap-2">
      {tranding.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 text-green-600"
          onClick={() => onTagClick(tag)}
        >
          {tag}
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-red-500"
          >
          </Button>
        </Badge>
      ))}
    </div>
  </>
}