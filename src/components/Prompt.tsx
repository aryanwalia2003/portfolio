import React, { useEffect, useRef } from 'react';
import { useTerminalStore } from '../store/useTerminalStore';

export const Prompt: React.FC<{ onSubmit: (cmd: string) => void }> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { input, setInput, cwd, commandHistory, historyPointer, setHistoryPointer } = useTerminalStore();

  useEffect(() => {
    // Keep focus on input
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener('click', focusInput);
    focusInput();
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPointer < commandHistory.length - 1) {
        const newPointer = historyPointer + 1;
        setHistoryPointer(newPointer);
        setInput(commandHistory[commandHistory.length - 1 - newPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const newPointer = historyPointer - 1;
        setHistoryPointer(newPointer);
        setInput(commandHistory[commandHistory.length - 1 - newPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-white/50">guest@portfolio:{cwd}$</span>
      </div>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text bg-transparent"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div className="flex items-center whitespace-pre-wrap break-all">
          <span className="text-primary">{input}</span>
          <span className="animate-blink block w-[10px] h-[1.2rem] bg-primary ml-0.5"></span>
        </div>
      </div>
    </div>
  );
};
