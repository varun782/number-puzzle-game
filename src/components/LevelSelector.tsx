import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface LevelSelectorProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onLevelChange }) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map(lvl => (
        <TouchableOpacity
          key={lvl}
          onPress={() => onLevelChange(lvl)}
          style={styles.buttonWrapper}
          activeOpacity={0.8}
        >
          {currentLevel === lvl ? (
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.activeText}>Level {lvl}</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.button, styles.inactiveButton]}>
              <Text style={styles.inactiveText}>Level {lvl}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    backgroundColor: colors.gray[200],
  },
  activeText: {
    ...typography.subtitle,
    color: colors.white,
  },
  inactiveText: {
    ...typography.subtitle,
    color: colors.gray[700],
  },
});

export default LevelSelector;