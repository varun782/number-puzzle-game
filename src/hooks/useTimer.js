import { useState, useEffect } from 'react';

export const useTimer = (initialTime, gameState, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

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