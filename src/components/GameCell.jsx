import React from 'react';

const GameCell = ({ value, isMatched, isSelected, isShaking, isHidden, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isMatched || isHidden}
      className={`
        w-14 h-14 rounded-xl font-bold text-xl transition-all duration-300
        ${isHidden
          ? 'bg-gray-100 border-2 border-dashed border-gray-300 text-transparent cursor-not-allowed'
          : isMatched 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' 
          : isSelected
          ? 'bg-yellow-400 text-white shadow-lg scale-110'
          : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
        }
        ${isShaking ? 'animate-shake' : ''}
      `}
      style={{
        animation: isShaking ? 'shake 0.5s' : 'none'
      }}
    >
      {isHidden ? '' : value}
    </button>
  );
};

export default GameCell;