import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TriangleAlert as AlertTriangle, MessageSquare, Brain, Book, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function PanicScreen() {
  const borderWidth = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    borderWidth.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );

    scale.value = withRepeat(
      withSequence(
        withSpring(1.1),
        withSpring(1)
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
  }));

  const warningStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleBreathing = () => {
    router.push('/breathing');
  };

  return (
    <LinearGradient
      colors={['#1A0505', '#0A0A0A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.contentContainer, containerStyle]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color="#FFFFFF" size={20} />
            </TouchableOpacity>

            <Animated.View style={[styles.warningContainer, warningStyle]}>
              <AlertTriangle color="#FF3B30" size={48} />
              <Text style={styles.warningTitle}>STOP!</Text>
            </Animated.View>

            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>You're about to throw away</Text>
              <Text style={styles.streakValue}>7 days</Text>
              <Text style={styles.streakText}>of progress</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.goalsContainer}>
              <Text style={styles.goalsTitle}>Remember why you started:</Text>
              <View style={styles.goalsList}>
                <Text style={styles.goalItem}>
                  • <Text style={styles.goalHighlight}>Improve relationships</Text>
                </Text>
                <Text style={styles.goalItem}>
                  • <Text style={styles.goalHighlight}>Increase productivity</Text>
                </Text>
                <Text style={styles.goalItem}>
                  • <Text style={styles.goalHighlight}>Regain control</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.mainButton}
              onPress={() => router.back()}
            >
              <Text style={styles.mainButtonText}>I WILL STAY STRONG</Text>
            </TouchableOpacity>

            <View style={styles.secondaryActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/partner-chat/1')}
              >
                <MessageSquare color="#FFFFFF" size={16} />
                <Text style={styles.actionButtonText}>Msg Partner</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleBreathing}
              >
                <Brain color="#FFFFFF" size={16} />
                <Text style={styles.actionButtonText}>Breathe</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/journal')}
              >
                <Book color="#FFFFFF" size={16} />
                <Text style={styles.actionButtonText}>Journal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    borderColor: '#FF3B30',
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 4,
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  streakText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  streakValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  goalsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  goalsList: {
    gap: 8,
  },
  goalItem: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  goalHighlight: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingTop: 12,
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
});