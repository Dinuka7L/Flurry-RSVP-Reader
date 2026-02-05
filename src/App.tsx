import { useState } from 'react';
import { Upload } from './components/Upload';
import { Reader } from './components/Reader';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { FocusReader } from './components/FocusReader';

import FlurryLogo from './public/flurry-logo.png';

type ReadingMode = 'rsvp' | 'focus';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<ReadingMode>('rsvp');

  const handleTextReady = (processedWords: string[]) => {
    setWords(processedWords);
  };

  const handleExit = () => {
    setWords([]);
  };

  return (
    <div className="app">
      <img
        src={FlurryLogo}
        alt="Flurry Logo"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          width: '240px',
          maxWidth: '20%',
          height: 'auto',
        }}
      />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <div className="reader-mode-toggle">
        <button onClick={() => setMode('rsvp')} className={mode === 'rsvp' ? 'active' : ''}>
          RSVP
        </button>
        <button onClick={() => setMode('focus')} className={mode === 'focus' ? 'active' : ''}>
          Focus
        </button>
      </div>

      {words.length === 0 ? (
        <Upload onTextReady={handleTextReady} />
      ) : mode === 'rsvp' ? (
        <Reader words={words} onExit={handleExit} />
      ) : (
        <FocusReader words={words} />
      )}
    </div>
  );
}

export default App;
