import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Dumbbell, Timer, CircleCheck as CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';

const exercises = [
  {
    id: 'push-ups',
    name: 'Push-ups',
    duration: '1 minute',
    description: 'Great for releasing tension and building upper body strength.',
    completed: false,
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    duration: '2 minutes',
    description: 'Helps increase heart rate and release endorphins.',
    completed: true,
  },
  {
    id: 'squats',
    name: 'Deep Squats',
    duration: '1 minute',
    description: 'Engages large muscle groups and promotes grounding.',
    completed: false,
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    duration: '30 seconds',
    description: 'Builds core strength and mental resilience.',
    completed: false,
  },
];

export default function ExerciseScreen() {
  const handleExercise = (id: string) => {
    router.push(`/exercise/${id}`);
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
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quick Exercise</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Physical exercise is a powerful way to redirect energy and improve mood. Choose an exercise to begin:
        </Text>

        {exercises.map((exercise) => (
          <TouchableOpacity 
            key={exercise.id}
            style={[
              styles.exerciseCard,
              exercise.completed && styles.completedCard
            ]}
            onPress={() => handleExercise(exercise.id)}
          >
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseIcon}>
                <Dumbbell color="#D4AF37" size={24} />
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.durationContainer}>
                  <Timer size={16} color="#E0E0E0" />
                  <Text style={styles.duration}>{exercise.duration}</Text>
                </View>
              </View>
              {exercise.completed && (
                <CheckCircle color="#4CAF50" size={24} />
              )}
            </View>
            <Text style={styles.exerciseDescription}>
              {exercise.description}
            </Text>
          </TouchableOpacity>
        ))}
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
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 24,
  },
  exerciseCard: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  completedCard: {
    opacity: 0.7,
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  duration: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  exerciseDescription: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
  },
});