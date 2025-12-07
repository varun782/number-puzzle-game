import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borderRadius } from '../styles/theme';

interface GameCellProps {
  value: number;
  isMatched: boolean;
  isSelected: boolean;
  isShaking: boolean;
  isHidden: boolean;
  onClick: () => void;
}

const GameCell: React.FC<GameCellProps> = ({
  value,
  isMatched,
  isSelected,
  isShaking,
  isHidden,
  onClick,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSelected) {
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        useNativeDriver: true,
        friction: 3,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
      }).start();
    }
  }, [isSelected]);

  useEffect(() => {
    if (isShaking) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isShaking]);

  useEffect(() => {
    if (isMatched) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isMatched]);

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { translateX: shakeAnim },
    ],
    opacity: fadeAnim,
  };

  if (isHidden) {
    return (
      <Animated.View style={[styles.cell, styles.hiddenCell]}>
        <Text style={styles.hiddenText}> </Text>
      </Animated.View>
    );
  }

  if (isMatched) {
    return (
      <Animated.View style={[styles.cell, styles.matchedCell, animatedStyle]}>
        <Text style={styles.matchedText}>{value}</Text>
      </Animated.View>
    );
  }

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={0.8} disabled={isMatched || isHidden}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={isSelected ? [colors.yellow, colors.warning] : [colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cell}
        >
          <Text style={styles.cellText}>{value}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  matchedCell: {
    backgroundColor: colors.gray[200],
  },
  matchedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[400],
  },
  hiddenCell: {
    backgroundColor: colors.gray[100],
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderStyle: 'dashed',
  },
  hiddenText: {
    color: 'transparent',
  },
});

export default GameCell;