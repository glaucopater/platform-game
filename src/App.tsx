import React, { useEffect } from 'react';
import { Player } from './components/Player';
import { Platform } from './components/Platform';
import { OptionsModal } from './components/OptionsModal';
import { WinModal } from './components/WinModal';
import { useGameStore } from './store/gameStore';
import { useGameLoop } from './hooks/useGameLoop';

function App() {
  const { platforms, togglePause, toggleOptions, isPaused } = useGameStore();
  useGameLoop();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p') togglePause();
      if (e.key === 'Escape') toggleOptions();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePause, toggleOptions]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-200 to-purple-200">
      {isPaused && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded">
          PAUSED
        </div>
      )}
      <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded text-sm">
        Controls: A/D or ←/→ to move, J to jump
      </div>
      <Player />
      {platforms.map((platform, index) => (
        <Platform key={index} platform={platform} />
      ))}
      <OptionsModal />
      <WinModal />
    </div>
  );
}

export default App;