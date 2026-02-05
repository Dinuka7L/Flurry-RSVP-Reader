import { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, Loader2 } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfParser';
import { processText } from '../utils/textProcessor';

interface UploadProps {
  onTextReady: (words: string[]) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function Upload({ onTextReady }: UploadProps) {
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      setError('Please enter some text');
      return;
    }
    setError('');
    const words = processText(textInput);
    if (words.length === 0) {
      setError('No valid words found');
      return;
    }
    onTextReady(words);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      let text = '';

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain') {
        text = await file.text();
      } else {
        setError('Please upload a PDF or TXT file');
        setIsProcessing(false);
        return;
      }

      const words = processText(text);

      if (words.length === 0) {
        setError('No text could be extracted from the file');
        setIsProcessing(false);
        return;
      }

      onTextReady(words);
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Failed to process file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1 className="upload-title">RSVP Speed Reader</h1>
        <p className="upload-subtitle">
          Read at 600+ words per minute with precision and focus
        </p>
      </div>

      <div className="upload-content">
        <div className="input-section">
          <label htmlFor="text-input" className="input-label">
            Paste Text
          </label>
          <textarea
            id="text-input"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your text here..."
            className="text-input"
            rows={10}
          />
          <button
            onClick={handleTextSubmit}
            className="submit-btn"
            disabled={isProcessing || !textInput.trim()}
          >
            <FileText size={20} />
            Start Reading
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="upload-section">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="file-input"
            disabled={isProcessing}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="upload-btn"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 size={24} className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <UploadIcon size={24} />
                Upload PDF or TXT
              </>
            )}
          </button>

          <p className="upload-hint">
            Maximum file size: 5MB
          </p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="upload-footer">
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>100-1000 WPM</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>ORP Highlighting</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌓</span>
            <span>Light & Dark Themes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
