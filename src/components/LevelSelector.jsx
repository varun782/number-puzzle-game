import React from 'react';

const LevelSelector = ({ currentLevel, onLevelChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3].map(lvl => (
        <button
          key={lvl}
          onClick={() => onLevelChange(lvl)}
          className={`flex-1 py-3 rounded-xl font-bold transition ${
            currentLevel === lvl
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Level {lvl}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;