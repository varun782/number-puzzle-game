import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

const Instructions: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Match <Text style={styles.bold}>equal numbers</Text> or pairs that{' '}
        <Text style={styles.bold}>sum to 10</Text> • Adjacent cells or connected through matched cells
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#93C5FD',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  text: {
    ...typography.body,
    color: '#1E40AF',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Instructions;