import { useState, useEffect, useRef, useCallback } from 'react';
import { RSVPDisplay } from './RSVPDisplay';
import { Controls } from './Controls';
import { wpmToMs } from '../utils/textProcessor';

interface ReaderProps {
  words: string[];
  onExit: () => void;
}

export function Reader({ words, onExit }: ReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Speed
  const [wpm, setWpm] = useState(() => {
    const stored = localStorage.getItem('rsvp-wpm');
    return stored ? parseInt(stored, 10) : 300;
  });

  // Show ORP
  const [showORP, setShowORP] = useState(() => {
    const stored = localStorage.getItem('rsvp-show-orp');
    return stored === 'true';
  });

  // Font size
  const [fontSize, setFontSize] = useState(() => {
    const stored = localStorage.getItem('rsvp-font-size');
    return stored ? parseInt(stored, 10) : 48;
  });

  const timerRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('rsvp-wpm', wpm.toString());
  }, [wpm]);

  useEffect(() => {
    localStorage.setItem('rsvp-show-orp', showORP.toString());
  }, [showORP]);

  useEffect(() => {
    localStorage.setItem('rsvp-font-size', fontSize.toString());
  }, [fontSize]);

  const stopPlayback = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsPlaying(false);
  }, []);

  const playNextWord = useCallback(() => {
    setCurrentIndex(prev => {
      const next = prev + 1;
      if (next >= words.length) {
        stopPlayback();
        return prev;
      }
      return next;
    });
  }, [words.length, stopPlayback]);

  // Playback loop
  useEffect(() => {
    if (isPlaying && currentIndex < words.length) {
      const interval = wpmToMs(wpm);
      const now = Date.now();
      const elapsed = lastTimeRef.current ? now - lastTimeRef.current : 0;
      const delay = Math.max(0, interval - elapsed);

      timerRef.current = window.setTimeout(() => {
        lastTimeRef.current = Date.now();
        playNextWord();
      }, delay);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [isPlaying, currentIndex, wpm, playNextWord, words.length]);

  // Controls handlers
  const togglePlayPause = () => {
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
      setIsPlaying(true);
      lastTimeRef.current = Date.now();
    } else {
      setIsPlaying(!isPlaying);
      if (!isPlaying) lastTimeRef.current = Date.now();
    }
  };

  const restart = () => {
    stopPlayback();
    setCurrentIndex(0);
    lastTimeRef.current = 0;
  };

  const skipForward = () => {
    setCurrentIndex(prev => Math.min(prev + 10, words.length - 1));
  };

  const skipBackward = () => {
    setCurrentIndex(prev => Math.max(prev - 10, 0));
  };

  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

  return (
    <div className="reader-container">
      <div
        className="reader-display"
        style={{ fontSize: `${fontSize}px` }} // APPLY font size here
      >
        <RSVPDisplay
          word={words[currentIndex] || ''}
          showORP={showORP}
          fontSize={fontSize} // PASS font size to RSVPDisplay
        />
      </div>

      <Controls
        isPlaying={isPlaying}
        wpm={wpm}
        fontSize={fontSize}               
        progress={progress}
        currentWord={currentIndex + 1}
        totalWords={words.length}
        showORP={showORP}
        onTogglePlayPause={togglePlayPause}
        onRestart={restart}
        onSkipForward={skipForward}
        onSkipBackward={skipBackward}
        onWpmChange={setWpm}
        onFontSizeChange={setFontSize}   
        onToggleORP={() => setShowORP(!showORP)}
        onExit={onExit}
      />
    </div>
  );
}
