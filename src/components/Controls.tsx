import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  EyeOff,
  Type
} from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  wpm: number;
  fontSize: number;
  progress: number;
  currentWord: number;
  totalWords: number;
  showORP: boolean;
  onTogglePlayPause: () => void;
  onRestart: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onWpmChange: (wpm: number) => void;
  onFontSizeChange: (size: number) => void;
  onToggleORP: () => void;
  onExit: () => void;
}

export function Controls({
  isPlaying,
  wpm,
  fontSize,
  progress,
  currentWord,
  totalWords,
  showORP,
  onTogglePlayPause,
  onRestart,
  onSkipForward,
  onSkipBackward,
  onWpmChange,
  onFontSizeChange,
  onToggleORP,
  onExit,
}: ControlsProps) {
  return (
    <div className="controls-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="controls-content">
        <div className="controls-stats">
          <span className="stat-item">{currentWord} / {totalWords}</span>
          <span className="stat-separator">•</span>
          <span className="stat-item">{wpm} WPM</span>
          <span className="stat-separator">•</span>
          <span className="stat-item">
            {Math.round((totalWords / wpm) * 10) / 10} min
          </span>
        </div>

        <div className="controls-buttons">
          <button
            onClick={onSkipBackward}
            className="control-btn secondary"
            title="Skip backward 10 words"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={onRestart}
            className="control-btn secondary"
            title="Restart"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={onTogglePlayPause}
            className="control-btn primary"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={onSkipForward}
            className="control-btn secondary"
            title="Skip forward 10 words"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={onToggleORP}
            className="control-btn secondary"
            title={showORP ? 'Hide ORP' : 'Show ORP'}
          >
            {showORP ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Speed Control */}
        <div className="speed-control">
          <label htmlFor="wpm-slider" className="speed-label">
            Speed
          </label>
          <input
            id="wpm-slider"
            type="range"
            min="100"
            max="1000"
            step="50"
            value={wpm}
            onChange={(e) =>
              onWpmChange(parseInt(e.target.value, 10))
            }
            className="speed-slider"
          />
          <div className="speed-markers">
            <span>100</span>
            <span>300</span>
            <span>600</span>
            <span>1000</span>
          </div>
        </div>

        {/* Font Size Control */}
        <div className="font-control">
          <label htmlFor="font-size-slider" className="speed-label">
            <Type size={14} /> Font size
          </label>
          <input
            id="font-size-slider"
            type="range"
            min="24"
            max="96"
            step="2"
            value={fontSize}
            onChange={(e) =>
              onFontSizeChange(parseInt(e.target.value, 10))
            }
            className="speed-slider"
          />
          <div className="speed-markers">
            <span>A</span>
            <span>AA</span>
            <span>AAA</span>
          </div>
        </div>

        <button
          onClick={onExit}
          className="exit-btn"
          title="Exit reader"
        >
          <X size={20} />
          Exit
        </button>
      </div>
    </div>
  );
}
