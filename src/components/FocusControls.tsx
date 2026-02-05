// src/components/FocusControls.tsx
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Type,
  Eye,
  EyeOff
} from 'lucide-react';

interface FocusControlsProps {
  isPlaying: boolean;
  wpm: number;
  currentWord: number;
  totalWords: number;
  fontSize: number;
  showORP?: boolean; // optional ORP highlight toggle
  onTogglePlayPause: () => void;
  onRestart: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onWpmChange: (wpm: number) => void;
  onFontSizeChange: (size: number) => void;
  onExit: () => void;
  focusColor: string;
  setFocusColor: (color: string) => void;
  onModeSwitch?: () => void; // optional mode toggle
}

export function FocusControls({
  isPlaying,
  wpm,
  currentWord,
  totalWords,
  fontSize,
  showORP,
  onTogglePlayPause,
  onRestart,
  onSkipForward,
  onSkipBackward,
  onWpmChange,
  onFontSizeChange,
  onExit,
  focusColor,
  setFocusColor,
  onModeSwitch
}: FocusControlsProps) {
  return (
    <div className="controls-container bottom-center">
      {/* Progress & Stats */}
      <div className="controls-stats">
        <span>{currentWord} / {totalWords}</span>
        <span>•</span>
        <span>{wpm} WPM</span>
        <span>•</span>
        <span>{Math.round((totalWords / wpm) * 10) / 10} min</span>
      </div>

      {/* Buttons */}
      <div className="controls-buttons">
        <button onClick={onSkipBackward} title="Skip backward 10 words">
          <ChevronLeft size={20} />
        </button>

        <button onClick={onRestart} title="Restart">
          <RotateCcw size={20} />
        </button>

        <button
          onClick={onTogglePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button onClick={onSkipForward} title="Skip forward 10 words">
          <ChevronRight size={20} />
        </button>

        {showORP !== undefined && (
          <button
            onClick={() => console.log('Toggle ORP')}
            title={showORP ? 'Hide ORP' : 'Show ORP'}
          >
            {showORP ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}

      </div>

      {/* Speed & Font Controls */}
      <div className="controls-sliders">
        <div className="speed-control">
          <label htmlFor="wpm-slider">Speed</label>
          <input
            id="wpm-slider"
            type="range"
            min={100}
            max={1000}
            step={10}
            value={wpm}
            onChange={(e) => onWpmChange(parseInt(e.target.value))}
          />
          <div className="speed-markers">
            <span>100</span>
            <span>300</span>
            <span>600</span>
            <span>1000</span>
          </div>
        </div>

        <div className="font-control">
          <label htmlFor="font-size-slider">
            <Type size={14} /> Font size
          </label>
          <input
            id="font-size-slider"
            type="range"
            min={24}
            max={96}
            step={2}
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
          />
        </div>

        <div className="color-control">
          <label htmlFor="focus-color">Focus Color</label>
          <input
            id="focus-color"
            type="color"
            value={focusColor}
            onChange={(e) => setFocusColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
