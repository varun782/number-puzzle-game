import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LevelSelector from './LevelSelector';
import { LEVELS } from '../utils/constants';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface GameHeaderProps {
  level: number;
  score: number;
  timeLeft: number;
  onReset: () => void;
  onLevelChange: (level: number) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  level,
  score,
  timeLeft,
  onReset,
  onLevelChange,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Number Puzzle</Text>
        <TouchableOpacity onPress={onReset} style={styles.resetButton}>
          <Icon name="restart" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>

      <LevelSelector currentLevel={level} onLevelChange={onLevelChange} />

      <LinearGradient
        colors={['#EDE9FE', '#DBEAFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statsContainer}
      >
        <View>
          <Text style={styles.statsLabel}>{LEVELS[level].name}</Text>
          <Text style={styles.statsValue}>{score} pts</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.statsLabel}>Time</Text>
          <Text style={[styles.statsValue, timeLeft < 30 && styles.timerWarning]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.primary,
  },
  resetButton: {
    backgroundColor: colors.secondary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  statsLabel: {
    ...typography.caption,
    color: colors.gray[600],
  },
  statsValue: {
    ...typography.title,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  timerContainer: {
    alignItems: 'flex-end',
  },
  timerWarning: {
    color: colors.error,
  },
});

export default GameHeader;