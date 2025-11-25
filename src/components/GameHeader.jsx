import React from 'react';
import { RotateCcw } from 'lucide-react';
import LevelSelector from './LevelSelector';
import { LEVELS } from '../utils/constants';

const GameHeader = ({ level, score, timeLeft, onReset, onLevelChange }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700">Number Puzzle</h1>
        <button
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <LevelSelector currentLevel={level} onLevelChange={onLevelChange} />
      
      <div className="flex justify-between items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4">
        <div>
          <p className="text-sm text-gray-600">{LEVELS[level].name}</p>
          <p className="text-2xl font-bold text-purple-700">{score} pts</p>
        </div>
        <div className={`text-right ${timeLeft < 30 ? 'text-red-600' : 'text-blue-700'}`}>
          <p className="text-sm text-gray-600">Time</p>
          <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;