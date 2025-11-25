import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import GameHeader from './GameHeader';
import GameCell from './GameCell';
import GameOverModal from './GameOverModal';
import { useGameLogic } from '../hooks/useGameLogic';
import { useTimer } from '../hooks/useTimer';
import { GAME_TIME } from '../utils/constants';

const NumberPuzzleGame = () => {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('playing');

  const {
    grid,
    selectedCell,
    matchedCells,
    score,
    shake,
    visibleRows,
    handleCellClick,
    addRow,
    resetGame
  } = useGameLogic(level);

  const { timeLeft, resetTimer } = useTimer(GAME_TIME, gameState, () => setGameState('lost'));

  useEffect(() => {
    if (matchedCells.size === grid.length * grid[0]?.length && grid.length > 0) {
      setGameState('won');
    }
  }, [matchedCells, grid]);

  const handleReset = () => {
    resetGame();
    resetTimer();
    setGameState('playing');
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setGameState('playing');
    resetTimer();
  };

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
    } else {
      setLevel(1);
    }
    setGameState('playing');
    resetTimer();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full">
        <GameHeader
          level={level}
          score={score}
          timeLeft={timeLeft}
          onReset={handleReset}
          onLevelChange={handleLevelChange}
        />

        <GameOverModal
          gameState={gameState}
          score={score}
          level={level}
          onNext={handleNextLevel}
          onRetry={handleReset}
        />

        {/* Game Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4">
          <p className="text-sm text-blue-800 text-center">
            Match <strong>equal numbers</strong> or pairs that <strong>sum to 10</strong> • Adjacent cells or connected through matched cells
          </p>
        </div>

        {/* Grid */}
        <div className="mb-4 overflow-auto max-h-96">
          <div className="inline-block">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 mb-2">
                {row.map((cell, colIndex) => {
                  const cellKey = `${rowIndex}-${colIndex}`;
                  const isMatched = matchedCells.has(cellKey);
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isShaking = shake === cellKey;
                  const isHidden = rowIndex >= visibleRows;

                  return (
                    <GameCell
                      key={colIndex}
                      value={cell}
                      isMatched={isMatched}
                      isSelected={isSelected}
                      isShaking={isShaking}
                      isHidden={isHidden}
                      onClick={() => handleCellClick(rowIndex, colIndex, cell)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Add Row Button */}
        {visibleRows < grid.length && gameState === 'playing' && (
          <button
            onClick={addRow}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <Plus size={24} />
            Add Row
          </button>
        )}
      </div>
    </div>
  );
};

export default NumberPuzzleGame;