export type Theme = 'light' | 'dark';

export interface ReaderState {
  words: string[];
  currentIndex: number;
  isPlaying: boolean;
  wpm: number;
}
