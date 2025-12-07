import { Cell } from './types';

export const isAdjacent = (cell1: Cell, cell2: Cell, gridCols: number): boolean => {
  if (!cell1 || !cell2) return false;
  
  const rowDiff = Math.abs(cell1.row - cell2.row);
  const colDiff = Math.abs(cell1.col - cell2.col);
  
  // Adjacent horizontally, vertically, or diagonally
  if (rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0)) {
    return true;
  }
  
  // Check wrap-around: end of one line to beginning of next line
  if (cell1.col === gridCols - 1 && cell2.col === 0 && cell2.row === cell1.row + 1) {
    return true;
  }
  
  return false;
};

export const hasValidPath = (
  cell1: Cell,
  cell2: Cell,
  matchedCells: Set<string>,
  visibleRows: number,
  gridCols: number
): boolean => {
  if (!cell1 || !cell2) return false;
  
  // Check if cells are directly adjacent
  if (isAdjacent(cell1, cell2, gridCols)) {
    return true;
  }
  
  // BFS to find path through matched cells
  const queue: [number, number, string[]][] = [[cell1.row, cell1.col, []]];
  const visited = new Set<string>([`${cell1.row}-${cell1.col}`]);
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],  // horizontal and vertical
    [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonals
  ];
  
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    
    const [currentRow, currentCol, path] = current;
    
    for (const [dx, dy] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;
      const newKey = `${newRow}-${newCol}`;
      
      if (newRow < 0 || newRow >= visibleRows || newCol < 0 || newCol >= gridCols) {
        continue;
      }
      
      if (visited.has(newKey)) continue;
      
      if (newRow === cell2.row && newCol === cell2.col) {
        if (path.every(key => matchedCells.has(key))) {
          return true;
        }
      }
      
      if (matchedCells.has(newKey)) {
        visited.add(newKey);
        queue.push([newRow, newCol, [...path, newKey]]);
      }
    }
  }
  
  return false;
};

export const canMatch = (val1: number, val2: number): boolean => {
  return val1 === val2 || val1 + val2 === 10;
};