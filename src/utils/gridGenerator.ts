import { LevelConfig } from './types';

export const generateGrid = (levelConfig: LevelConfig): number[][] => {
  const { rows, cols, numbers } = levelConfig;
  const newGrid: number[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    newGrid.push(row);
  }
  
  return newGrid;
};