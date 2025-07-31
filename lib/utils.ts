import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string | null | undefined): string {
  if (!name || typeof name !== 'string') return '';

  const words = name.trim().split(/\s+/);

  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0]?.toUpperCase() ?? '';

  const first = words[0][0] ?? '';
  const last = words[words.length - 1][0] ?? '';

  return (first + last).toUpperCase();
}