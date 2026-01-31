import React from 'react';
import type { CommandEntry } from '../store/useTerminalStore';

export const CommandOutput: React.FC<{ entry: CommandEntry }> = ({ entry }) => {
  if (entry.type === 'command') {
    return (
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white/50">guest@portfolio:{entry.cwd || '~'}$</span>
        <span className="text-primary">{entry.content}</span>
      </div>
    );
  }

  return (
    <div className="mb-6 pl-0 md:pl-4 w-full overflow-hidden">
      {typeof entry.content === 'string' ? (
         // Handle basic text output ensuring whitespace is preserved
        <div className="whitespace-pre-wrap break-words text-primary/90">{entry.content}</div>
      ) : (
        // Render detailed component output (React Node)
        entry.content
      )}
    </div>
  );
};
