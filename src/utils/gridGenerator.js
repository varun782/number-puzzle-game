export const generateGrid = (levelConfig) => {
  const { rows, cols, numbers } = levelConfig;
  const newGrid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    newGrid.push(row);
  }
  return newGrid;
};