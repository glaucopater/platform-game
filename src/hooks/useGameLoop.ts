import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const MOVE_SPEED = 7;
const MAX_FALL_SPEED = 15;

export const useGameLoop = () => {
  const {
    player,
    platforms,
    isPaused,
    setHasWon,
    updatePlayerPosition,
    updatePlayerVelocity,
  } = useGameStore();

  const isOnGround = useCallback(() => {
    for (const platform of platforms) {
      if (
        player.position.x < platform.position.x + platform.size.width &&
        player.position.x + player.size.width > platform.position.x &&
        Math.abs(player.position.y + player.size.height - platform.position.y) <
          2
      ) {
        return true;
      }
    }
    return false;
  }, [player, platforms]);

  const checkWinCondition = useCallback(() => {
    if (player.position.y <= 100) {
      setHasWon(true);
    }
  }, [player.position.y, setHasWon]);

  useEffect(() => {
    let moveLeft = false;
    let moveRight = false;
    let jumping = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          moveLeft = true;
          break;
        case 'arrowright':
        case 'd':
          moveRight = true;
          break;
        case 'j':
          if (isOnGround() && !jumping) {
            updatePlayerVelocity({ x: player.velocity.x, y: JUMP_FORCE });
            jumping = true;
          }

          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          moveLeft = false;
          break;
        case 'arrowright':
        case 'd':
          moveRight = false;
          break;
        case 'j':
          jumping = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      if (!isPaused) {
        // Handle movement
        let dx = 0;
        if (moveLeft) dx -= MOVE_SPEED;
        if (moveRight) dx += MOVE_SPEED;

        // Apply gravity
        let newVelocity = {
          x: dx,
          y: Math.min(player.velocity.y + GRAVITY, MAX_FALL_SPEED),
        };

        // Calculate new position
        let newPosition = {
          x: Math.max(
            0,
            Math.min(
              window.innerWidth - player.size.width,
              player.position.x + dx
            )
          ),
          y: player.position.y + newVelocity.y,
        };

        // Check platform collisions
        for (const platform of platforms) {
          if (
            newPosition.x < platform.position.x + platform.size.width &&
            newPosition.x + player.size.width > platform.position.x &&
            newPosition.y + player.size.height >= platform.position.y &&
            player.position.y + player.size.height <= platform.position.y
          ) {
            newPosition.y = platform.position.y - player.size.height;
            newVelocity.y = 0;
            jumping = false;
            break;
          }
        }

        // Reset if fallen off
        if (newPosition.y > window.innerHeight) {
          newPosition = { x: 100, y: 500 };
          newVelocity = { x: 0, y: 0 };
          jumping = false;
        }

        updatePlayerPosition(newPosition);
        updatePlayerVelocity(newVelocity);
        checkWinCondition();
      }
    };

    const intervalId = setInterval(gameLoop, 1000 / 60);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    player,
    platforms,
    isPaused,
    isOnGround,
    updatePlayerPosition,
    updatePlayerVelocity,
    checkWinCondition,
  ]);
};
