import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGameStore } from '../store/gameStore';

export const Player: React.FC = () => {
  const player = useGameStore((state) => state.player);
  
  const spring = useSpring({
    to: {
      transform: `translate(${player.position.x}px, ${player.position.y}px)`
    },
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div
      style={{
        ...spring,
        width: player.size.width,
        height: player.size.height,
        backgroundColor: player.color,
        position: 'absolute',
        borderRadius: '4px'
      }}
    />
  );
};