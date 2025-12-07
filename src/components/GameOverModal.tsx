import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GameState } from '../utils/types';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

interface GameOverModalProps {
  gameState: GameState;
  score: number;
  level: number;
  onNext: () => void;
  onRetry: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  score,
  level,
  onNext,
  onRetry,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (gameState !== 'playing') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }).start();
    }
  }, [gameState]);

  if (gameState === 'playing') return null;

  return (
    <Modal transparent visible={gameState !== 'playing'} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
          {gameState === 'won' ? (
            <>
              <Icon name="trophy" size={64} color={colors.warning} />
              <Text style={styles.title}>Level Complete!</Text>
              <Text style={styles.score}>Score: {score}</Text>
              <TouchableOpacity onPress={onNext} activeOpacity={0.8}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    {level < 3 ? 'Next Level' : 'Play Again'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Icon name="alert-circle" size={64} color={colors.error} />
              <Text style={[styles.title, styles.errorTitle]}>Time's Up!</Text>
              <Text style={styles.score}>Score: {score}</Text>
              <TouchableOpacity onPress={onRetry} activeOpacity={0.8}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Try Again</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: 300,
    elevation: 5,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginVertical: spacing.md,
  },
  errorTitle: {
    color: colors.error,
  },
  score: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.button,
    color: '#fff',
  },
});

export default GameOverModal;