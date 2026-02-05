import { useState } from 'react';
import { Upload } from './components/Upload';
import { Reader } from './components/Reader';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

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
