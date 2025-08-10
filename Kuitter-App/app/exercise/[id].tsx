import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Timer, Dumbbell } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const exercises = {
  'push-ups': {
    name: 'Push-ups',
    duration: '1 minute',
    steps: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the ground',
      'Push back up to starting position',
      'Keep your core tight and body straight',
      'Breathe steadily throughout the movement'
    ],
    benefits: [
      'Releases physical tension',
      'Builds upper body strength',
      'Increases mental focus',
      'Boosts endorphins'
    ]
  },
  'jumping-jacks': {
    name: 'Jumping Jacks',
    duration: '2 minutes',
    steps: [
      'Stand with feet together and arms at sides',
      'Jump and spread legs while raising arms above head',
      'Jump back to starting position',
      'Maintain a steady rhythm',
      'Focus on your breathing'
    ],
    benefits: [
      'Increases heart rate',
      'Releases endorphins',
      'Improves coordination',
      'Burns excess energy'
    ]
  },
  'squats': {
    name: 'Deep Squats',
    duration: '1 minute',
    steps: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep chest up and core engaged',
      'Push through heels to stand',
      'Breathe deeply throughout'
    ],
    benefits: [
      'Grounds your energy',
      'Strengthens lower body',
      'Improves focus',
      'Releases tension'
    ]
  },
  'plank': {
    name: 'Plank Hold',
    duration: '30 seconds',
    steps: [
      'Start in push-up position',
      'Keep body straight from head to heels',
      'Engage core and glutes',
      'Hold position steady',
      'Focus on steady breathing'
    ],
    benefits: [
      'Builds mental resilience',
      'Strengthens core',
      'Improves concentration',
      'Reduces anxiety'
    ]
  }
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const exercise = exercises[id as keyof typeof exercises];
  const [currentStep, setCurrentStep] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1000, easing: Easing.ease }),
            withTiming(1, { duration: 1000, easing: Easing.ease })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % exercise.steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [exercise.steps.length]);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

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
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exercise.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.timerSection}>
          <Animated.View style={[styles.iconContainer, animatedStyle]}>
            <Dumbbell color="#D4AF37" size={48} />
          </Animated.View>
          <View style={styles.timerInfo}>
            <Timer color="#D4AF37" size={24} />
            <Text style={styles.duration}>{exercise.duration}</Text>
          </View>
        </View>

        <View style={styles.currentStep}>
          <Text style={styles.stepNumber}>Step {currentStep + 1}</Text>
          <Text style={styles.stepText}>{exercise.steps[currentStep]}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Steps</Text>
          {exercise.steps.map((step, index) => (
            <View 
              key={index} 
              style={[
                styles.stepItem,
                currentStep === index && styles.activeStep
              ]}
            >
              <Text style={styles.stepItemNumber}>{index + 1}</Text>
              <Text style={styles.stepItemText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.benefitsGrid}>
            {exercise.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Dumbbell color="#D4AF37" size={20} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 60,
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
  },
  timerSection: {
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 20,
    gap: 8,
  },
  duration: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentStep: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  stepNumber: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activeStep: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  stepItemNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontWeight: 'bold',
  },
  stepItemText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  benefitsGrid: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  benefitText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});