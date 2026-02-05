// src/components/FocusReader.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { wpmToMs } from '../utils/textProcessor';
import './FocusReader.css';
import { FocusControls } from './FocusControls';

interface FocusReaderProps {
  words: string[];
  initialWpm?: number;
  onExit: () => void;
}

export function FocusReader({
  words,
  initialWpm = 300,
  onExit,
}: FocusReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(() => {
    const stored = localStorage.getItem('rsvp-wpm');
    return stored ? parseInt(stored, 10) : initialWpm;
  });

  const [focusColor, setFocusColor] = useState('#ff0000');
  const [isPlaying, setIsPlaying] = useState(true);
  const [fontSize, setFontSize] = useState(48);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]> = useRef([]);
  const timerRef = useRef<number>();

  // Store WPM in localStorage
  useEffect(() => localStorage.setItem('rsvp-wpm', wpm.toString()), [wpm]);

  const playNextWord = useCallback(
    () => setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1)),
    [words.length]
  );

  useEffect(() => {
    if (!isPlaying || currentIndex >= words.length) return;
    const delay = wpmToMs(wpm);
    timerRef.current = window.setTimeout(playNextWord, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying, wpm, playNextWord]);

  // Auto-scroll to keep current word in view
  useEffect(() => {
    const el = wordRefs.current[currentIndex];
    const container = containerRef.current;
    if (!el || !container) return;

    const scrollY = el.offsetTop - container.clientHeight / 2 + el.offsetHeight / 2;
    container.scrollTo({ top: scrollY, behavior: 'smooth' });
  }, [currentIndex]);

  return (
    <div className="focus-reader-wrapper">
      <div
        className="focus-reader-container"
        ref={containerRef}
        style={{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.5}px` }}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            ref={(el) => { if (el) wordRefs.current[idx] = el; }}
            className={`focus-word ${idx === currentIndex ? 'active' : ''}`}
            style={{ color: idx === currentIndex ? focusColor : 'white' }}
          >
            {word}{' '}
          </span>
        ))}
      </div>

      {/* Bottom-center controls */}
      <FocusControls
        isPlaying={isPlaying}
        wpm={wpm}
        currentWord={currentIndex + 1}
        totalWords={words.length}
        fontSize={fontSize}
        onTogglePlayPause={() => setIsPlaying((prev) => !prev)}
        onRestart={() => setCurrentIndex(0)}
        onSkipForward={() =>
          setCurrentIndex((prev) => Math.min(prev + 10, words.length - 1))
        }
        onSkipBackward={() =>
          setCurrentIndex((prev) => Math.max(prev - 10, 0))
        }
        onWpmChange={setWpm}
        onFontSizeChange={setFontSize}
        focusColor={focusColor}
        setFocusColor={setFocusColor}
        onExit={onExit}
        onModeSwitch={() => console.log('Switch mode pressed')}
      />
    </div>
  );
}
