import { useState } from 'react';
import { Upload } from './components/Upload';
import { Reader } from './components/Reader';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

import FlurryLogo from './public/flurry-logo.png';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();

  const handleTextReady = (processedWords: string[]) => {
    setWords(processedWords);
  };

  const handleExit = () => {
    setWords([]);
  };

  return (
    <div className="app">

      {/* Top-left logo */}
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

      {words.length === 0 ? (
        <Upload onTextReady={handleTextReady} />
      ) : (
        <Reader words={words} onExit={handleExit} />
      )}
    </div>
  );
}

export default App;
