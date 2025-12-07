import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import { colors } from './styles/theme';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import Instructions from './components/Instructions';
import GameOverModal from './components/GameOverModal';
import { useGameLogic } from './hooks/useGameLogic';
import { useTimer } from './hooks/useTimer';
import { LEVELS } from './utils/constants';
import { GameState } from './utils/types';

const App = () => {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('playing');

  const {
    grid,
    selectedCell,
    matchedCells,
    score,
    shake,
    visibleRows,
    handleCellClick,
    addRow,
    resetGame: resetLogic,
  } = useGameLogic(level);

  const handleTimeUp = () => {
    setGameState('lost');
  };

  const { timeLeft, resetTimer } = useTimer(LEVELS[level].time, gameState, handleTimeUp);

  useEffect(() => {
    if (grid.length > 0 && matchedCells.size === grid.flat().length) {
      setGameState('won');
    }
  }, [matchedCells, grid]);

  const handleReset = () => {
    setGameState('playing');
    resetLogic();
    resetTimer();
  };

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    setGameState('playing');
  };

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
    }
    setGameState('playing');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        <GameHeader
          level={level}
          score={score}
          timeLeft={timeLeft}
          onReset={handleReset}
          onLevelChange={handleLevelChange}
        />
        
        <Instructions />

        <GameBoard
          grid={grid}
          selectedCell={selectedCell}
          matchedCells={matchedCells}
          shake={shake}
          visibleRows={visibleRows}
          onCellClick={handleCellClick}
          onAddRow={addRow}
        />
      </View>

      <GameOverModal
        gameState={gameState}
        score={score}
        level={level}
        onNext={handleNextLevel}
        onRetry={handleReset}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default App;
