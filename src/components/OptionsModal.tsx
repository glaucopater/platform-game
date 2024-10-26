import React from 'react';
import { useGameStore } from '../store/gameStore';

export const OptionsModal: React.FC = () => {
  const showOptions = useGameStore((state) => state.showOptions);
  const toggleOptions = useGameStore((state) => state.toggleOptions);

  if (!showOptions) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Options</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Controls:</h3>
            <p>Arrow Keys - Move</p>
            <p>Spacebar - Jump</p>
            <p>P - Pause</p>
            <p>ESC - Options</p>
          </div>
          <button
            onClick={toggleOptions}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};