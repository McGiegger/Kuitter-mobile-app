import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const BREATH_DURATION = 4000; // 4 seconds for each phase
const TOTAL_ROUNDS = 4;

export default function BreathingScreen() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [round, setRound] = useState(1);
  const [isActive, setIsActive] = useState(false);

  const circleScale = useAnimatedStyle(() => ({
    transform: [{ scale: withRepeat(
      withSequence(
        withTiming(2, { duration: BREATH_DURATION, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(2, { duration: BREATH_DURATION }),
        withTiming(1, { duration: BREATH_DURATION, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(1, { duration: BREATH_DURATION })
      ),
      -1,
      true
    ) }],
  }));

  const glowOpacity = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.8, { duration: BREATH_DURATION }),
        withTiming(0.4, { duration: BREATH_DURATION })
      ),
      -1,
      true
    ),
  }));

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setPhase(current => {
        const nextPhase = (() => {
          switch (current) {
            case 'inhale': return 'hold';
            case 'hold': return 'exhale';
            case 'exhale': return 'rest';
            case 'rest': return 'inhale';
          }
        })();

        // If we're transitioning from rest to inhale, increment the round
        if (current === 'rest') {
          setRound(prevRound => {
            if (prevRound >= TOTAL_ROUNDS) {
              // Stop the exercise when we complete all rounds
              setIsActive(false);
              return 1;
            }
            return prevRound + 1;
          });
        }

        return nextPhase;
      });
    }, BREATH_DURATION);

    return () => clearInterval(timer);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setRound(1);
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
    }
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercise</Text>
      </View>

      <View style={styles.content}>
        {isActive ? (
          <>
            <Text style={styles.roundText}>Round {round} of {TOTAL_ROUNDS}</Text>
            <View style={styles.breathContainer}>
              <Animated.View style={[styles.breathCircle, circleScale]} />
              <Animated.View style={[styles.glowCircle, glowOpacity]} />
              <View style={styles.iconContainer}>
                <Ionicons name="leaf" color="#FFFFFF" size={48} />
              </View>
            </View>
            <Text style={styles.instructions}>{getInstructions()}</Text>
            <View style={styles.progressDots}>
              {['inhale', 'hold', 'exhale', 'rest'].map((p) => (
                <View
                  key={p}
                  style={[
                    styles.progressDot,
                    phase === p && styles.activeDot
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.startContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="leaf" color="#D4AF37" size={64} />
            </View>
            <Text style={styles.description}>
              Take a moment to breathe and center yourself. This exercise uses the 4-4-4 technique:
            </Text>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>Inhale deeply for 4 seconds</Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>Hold your breath for 4 seconds</Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>Exhale completely for 4 seconds</Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <Text style={styles.stepText}>Rest for 4 seconds</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStart}
            >
              <Text style={styles.startButtonText}>Begin Exercise</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  roundText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  breathContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  breathCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  glowCircle: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 150,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#D4AF37',
    width: 16,
  },
  startContainer: {
    padding: 20,
    alignItems: 'center',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  stepsList: {
    alignSelf: 'stretch',
    marginBottom: 40,
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  startButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});