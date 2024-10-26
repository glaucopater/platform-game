import { create } from 'zustand';
import { GameState } from '../types/game';

const platformColors = [
  '#4F46E5', // indigo
  '#7C3AED', // violet
  '#DB2777', // pink
  '#059669', // emerald
  '#D97706', // amber
  '#DC2626', // red
];

export const useGameStore = create<GameState>((set) => ({
  player: {
    position: { x: 100, y: 500 },
    velocity: { x: 0, y: 0 },
    size: { width: 40, height: 40 },
    color: '#2563EB',
  },
  platforms: [
    // Ground platform
    {
      position: { x: 0, y: 600 },
      velocity: { x: 0, y: 0 },
      size: { width: 800, height: 20 },
      color: platformColors[0],
    },
    // Ascending platforms with random positions
    {
      position: { x: 200, y: 480 },
      velocity: { x: 0, y: 0 },
      size: { width: 130, height: 15 },
      color: platformColors[1],
    },
    {
      position: { x: 450, y: 380 },
      velocity: { x: 0, y: 0 },
      size: { width: 130, height: 15 },
      color: platformColors[2],
    },
    {
      position: { x: 150, y: 350 },
      velocity: { x: 0, y: 0 },
      size: { width: 130, height: 15 },
      color: platformColors[3],
    },
    {
      position: { x: 200, y: 200 },
      velocity: { x: 0, y: 0 },
      size: { width: 130, height: 15 },
      color: platformColors[4],
    },
    {
      position: { x: 250, y: 80 },
      velocity: { x: 0, y: 0 },
      size: { width: 130, height: 15 },
      color: platformColors[5],
    },
  ],
  isPaused: false,
  showOptions: false,
  hasWon: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleOptions: () => set((state) => ({ showOptions: !state.showOptions })),
  setHasWon: (won) => set(() => ({ hasWon: won })),
  updatePlayerPosition: (position) =>
    set((state) => ({
      player: { ...state.player, position },
    })),
  updatePlayerVelocity: (velocity) =>
    set((state) => ({
      player: { ...state.player, velocity },
    })),
}));
