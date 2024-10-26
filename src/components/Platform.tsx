import React from 'react';
import { GameObject } from '../types/game';

interface PlatformProps {
  platform: GameObject;
}

export const Platform: React.FC<PlatformProps> = ({ platform }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: platform.position.x,
        top: platform.position.y,
        width: platform.size.width,
        height: platform.size.height,
        backgroundColor: platform.color,
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};