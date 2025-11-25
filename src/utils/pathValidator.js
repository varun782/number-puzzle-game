export const isAdjacent = (cell1, cell2, gridCols) => {
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

export const hasValidPath = (cell1, cell2, matchedCells, visibleRows, gridCols) => {
  if (!cell1 || !cell2) return false;
  
  // Check if cells are directly adjacent (including diagonal and wrap-around)
  if (isAdjacent(cell1, cell2, gridCols)) {
    return true;
  }
  
  // BFS to find path through matched (empty) cells
  const queue = [[cell1.row, cell1.col, []]];
  const visited = new Set([`${cell1.row}-${cell1.col}`]);
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0],  // horizontal and vertical
    [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonals
  ];
  
  while (queue.length > 0) {
    const [currentRow, currentCol, path] = queue.shift();
    
    // Check all directions
    for (const [dx, dy] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;
      const newKey = `${newRow}-${newCol}`;
      
      // Check boundaries
      if (newRow < 0 || newRow >= visibleRows || newCol < 0 || newCol >= gridCols) {
        continue;
      }
      
      // Skip if already visited
      if (visited.has(newKey)) continue;
      
      // Check if we reached the target through matched cells
      if (newRow === cell2.row && newCol === cell2.col) {
        // All cells in path must be matched
        if (path.every(key => matchedCells.has(key))) {
          return true;
        }
      }
      
      // Can only move through matched cells
      if (matchedCells.has(newKey)) {
        visited.add(newKey);
        queue.push([newRow, newCol, [...path, newKey]]);
      }
    }
  }
  
  return false;
};

export const canMatch = (val1, val2) => {
  return val1 === val2 || val1 + val2 === 10;
};