import { useState, useEffect } from 'react';
import { generateGrid } from '../utils/gridGenerator';
import { hasValidPath, canMatch } from '../utils/pathValidator';
import {
  LEVELS,
  INITIAL_VISIBLE_ROWS,
  POINTS_PER_MATCH,
  ROWS_TO_ADD,
} from '../utils/constants';
import { Cell } from '../utils/types';

export const useGameLogic = (level: number) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [matchedCells, setMatchedCells] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const [visibleRows, setVisibleRows] = useState(INITIAL_VISIBLE_ROWS);

  useEffect(() => {
    const config = LEVELS[level];
    setGrid(generateGrid(config));
    setMatchedCells(new Set());
    setSelectedCell(null);
    setScore(0);
    setVisibleRows(INITIAL_VISIBLE_ROWS);
  }, [level]);

  const handleCellClick = (row: number, col: number, value: number) => {
    if (matchedCells.has(`${row}-${col}`)) return;
    if (row >= visibleRows) return;

    const cellKey = `${row}-${col}`;

    if (!selectedCell) {
      setSelectedCell({ row, col, value });
    } else {
      if (selectedCell.row === row && selectedCell.col === col) {
        setSelectedCell(null);
        return;
      }

      if (
        canMatch(selectedCell.value, value) &&
        hasValidPath(selectedCell, { row, col, value }, matchedCells, visibleRows, grid[0].length)
      ) {
        const newMatched = new Set(matchedCells);
        newMatched.add(`${selectedCell.row}-${selectedCell.col}`);
        newMatched.add(cellKey);
        setMatchedCells(newMatched);
        setScore(score + POINTS_PER_MATCH);
        setSelectedCell(null);
      } else {
        setShake(cellKey);
        setTimeout(() => setShake(null), 500);
        setSelectedCell(null);
      }
    }
  };

  const addRow = () => {
    if (visibleRows < grid.length) {
      setVisibleRows(Math.min(visibleRows + ROWS_TO_ADD, grid.length));
    }
  };

  const resetGame = () => {
    const config = LEVELS[level];
    setGrid(generateGrid(config));
    setMatchedCells(new Set());
    setSelectedCell(null);
    setScore(0);
    setVisibleRows(INITIAL_VISIBLE_ROWS);
  };

  return {
    grid,
    selectedCell,
    matchedCells,
    score,
    shake,
    visibleRows,
    handleCellClick,
    addRow,
    resetGame,
  };
};