import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { TerminalWindow } from './components/TerminalWindow';
import { Prompt } from './components/Prompt';
import { CommandOutput } from './components/CommandOutput';
import { useTerminalStore } from './store/useTerminalStore';
import { processCommand } from './utils/commandRegistry';

function App() {
  const history = useTerminalStore((state) => state.history);
  const addEntry = useTerminalStore((state) => state.addEntry);

  useEffect(() => {
    // Initial banner
    addEntry({
      type: 'output',
      content: (
        <div className="mb-4 text-primary/80">
          <pre className="text-[10px] md:text-sm leading-none font-bold">
{`
  _____   ____  _____ _______ ______ ____  _      _____ ____  
 |  __ \\ / __ \\|  __ \\__   __|  ____/ __ \\| |    |_   _/ __ \\ 
 | |__) | |  | | |__) | | |  | |__ | |  | | |      | || |  | |
 |  ___/| |  | |  _  /  | |  |  __|| |  | | |      | || |  | |
 | |    | |__| | | \\ \\  | |  | |   | |__| | |____ _| || |__| |
 |_|     \\____/|_|  \\_\\ |_|  |_|    \\____/|______|_____\\____/ 
`}
          </pre>
          <div className="mt-2 border-b border-primary/20 pb-2 mb-2">
            Welcome to Portfolio Terminal v1.0.0
          </div>
          <div className="text-white/60">Type <span className="text-primary font-bold">help</span> to see available commands.</div>
        </div>
      )
    });
  }, [addEntry]);

  return (
    <Layout>
      <TerminalWindow>
        {history.map((entry) => (
          <CommandOutput key={entry.id} entry={entry} />
        ))}
        <Prompt onSubmit={processCommand} />
      </TerminalWindow>
    </Layout>
  );
}

export default App;
