import React from 'react';
import { useGameStore } from '../store/gameStore';

export const WinModal: React.FC = () => {
  const hasWon = useGameStore((state) => state.hasWon);

  if (!hasWon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">🎉 You Won! 🎉</h2>
        <p className="text-gray-700 mb-4">Congratulations! You reached the top!</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};