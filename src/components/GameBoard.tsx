import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import GameCell from './GameCell';
import { Cell } from '../utils/types';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface GameBoardProps {
  grid: number[][];
  selectedCell: Cell | null;
  matchedCells: Set<string>;
  shake: string | null;
  visibleRows: number;
  onCellClick: (row: number, col: number, value: number) => void;
  onAddRow: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  grid,
  selectedCell,
  matchedCells,
  shake,
  visibleRows,
  onCellClick,
  onAddRow,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {grid.slice(0, visibleRows).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((value, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const isMatched = matchedCells.has(cellKey);
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isShaking = shake === cellKey;

                return (
                  <GameCell
                    key={cellKey}
                    value={value}
                    isMatched={isMatched}
                    isSelected={isSelected}
                    isShaking={isShaking}
                    isHidden={isMatched}
                    onClick={() => onCellClick(rowIndex, colIndex, value)}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {visibleRows < grid.length && (
          <TouchableOpacity onPress={onAddRow} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add More Rows</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingTop: spacing.lg,
    marginTop: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  grid: {
    width: '100%',
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  addButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  addButtonText: {
    ...typography.button,
    color: colors.gray[600],
  },
});

export default GameBoard;
