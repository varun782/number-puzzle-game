import React from 'react';
import { Trophy, AlertCircle } from 'lucide-react';

const GameOverModal = ({ gameState, score, level, onNext, onRetry }) => {
  if (gameState === 'playing') return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md mx-4">
        {gameState === 'won' ? (
          <>
            <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
            <h2 className="text-3xl font-bold text-green-600 mb-2">Level Complete!</h2>
            <p className="text-xl mb-4">Score: {score}</p>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition"
            >
              {level < 3 ? 'Next Level' : 'Play Again'}
            </button>
          </>
        ) : (
          <>
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <h2 className="text-3xl font-bold text-red-600 mb-2">Time's Up!</h2>
            <p className="text-xl mb-4">Score: {score}</p>
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;