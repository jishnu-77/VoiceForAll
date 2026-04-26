// src/data/types.ts
// VoiceForAll — Shared types across all data files

export type Language =
  | 'english'
  | 'hindi'
  | 'malayalam'
  | 'marathi'
  | 'tamil'
  | 'telugu'
  | 'bengali';

export interface OfficialLink {
  name: string;         // Display name e.g. "Kisan Call Centre"
  url: string | null;   // Opens browser — null if not applicable
  phone: string | null; // Opens phone dialer — null if not applicable
}

export interface TopicContent {
  title: string;
  shortDescription: string; // shown on card
  fullContent: string;      // spoken via TTS + shown on detail screen
}
