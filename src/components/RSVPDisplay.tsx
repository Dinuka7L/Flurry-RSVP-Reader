import { useEffect, useRef } from 'react';
import { findORP } from '../utils/textProcessor';

interface RSVPDisplayProps {
  word: string;
  showORP: boolean;
  fontSize: number;
}

export function RSVPDisplay({ word, showORP, fontSize }: RSVPDisplayProps) {
  const orpIndex = findORP(word);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger word-change animation (if you use one)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove('word-change');
      void containerRef.current.offsetWidth; // force reflow
      containerRef.current.classList.add('word-change');
    }
  }, [word]);

  // Fallback: no ORP mode
  if (!showORP) {
    return (
      <div
        ref={containerRef}
        className="word-display word-change"
      >
        {word}
      </div>
    );
  }

  const before = word.slice(0, orpIndex);
  const orp = word[orpIndex] ?? '';
  const after = word.slice(orpIndex + 1);

  return (
    <div
      ref={containerRef}
      className="word-display-orp word-change"
      style={{ fontSize: `${fontSize}px` }}
    >
      <span className="orp-before">{before}</span>
      <span className="orp-letter">{orp}</span>
      <span className="orp-after">{after}</span>
    </div>
  );
}
