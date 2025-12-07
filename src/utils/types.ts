export interface Cell {
  row: number;
  col: number;
  value: number;
}

export interface LevelConfig {
  rows: number;
  cols: number;
  numbers: number[];
  name: string;
}

export type GameState = 'playing' | 'won' | 'lost';

export interface GameLogicReturn {
  grid: number[][];
  selectedCell: Cell | null;
  matchedCells: Set<string>;
  score: number;
  shake: string | null;
  visibleRows: number;
  handleCellClick: (row: number, col: number, value: number) => void;
  addRow: () => void;
  resetGame: () => void;
}

export interface TimerReturn {
  timeLeft: number;
  resetTimer: () => void;
}