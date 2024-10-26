export interface Position {
  x: number;
  y: number;
}

export interface GameObject {
  position: Position;
  velocity: Position;
  size: {
    width: number;
    height: number;
  };
  color?: string;
}

export interface GameState {
  player: GameObject;
  platforms: GameObject[];
  isPaused: boolean;
  showOptions: boolean;
  hasWon: boolean;
  togglePause: () => void;
  toggleOptions: () => void;
  setHasWon: (won: boolean) => void;
  updatePlayerPosition: (position: Position) => void;
  updatePlayerVelocity: (velocity: Position) => void;
}