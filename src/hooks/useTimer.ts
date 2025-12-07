import { useState, useEffect } from 'react';
import { GameState } from '../utils/types';

export const useTimer = (
  initialTime: number,
  gameState: GameState,
  onTimeUp: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, onTimeUp]);

  const resetTimer = () => setTimeLeft(initialTime);

  return { timeLeft, resetTimer };
};