import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Brain, Users, Clock, Eye, Sprout } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    icon: Brain,
    heading: "Rewires Your Brain",
    content: "Pornography hijacks your brain's natural reward system, creating artificial neural pathways that can affect motivation and pleasure responses.",
    color: '#4A90E2',
  },
  {
    id: 2,
    icon: Users,
    heading: "Affects Real Connections",
    content: "Regular porn use can impact your ability to form and maintain meaningful relationships, affecting intimacy and emotional connections.",
    color: '#E24A67',
  },
  {
    id: 3,
    icon: Clock,
    heading: "Drains Your Energy",
    content: "Excessive use can lead to decreased productivity, poor concentration, and reduced motivation in daily activities.",
    color: '#50C878',
  },
  {
    id: 4,
    icon: Eye,
    heading: "Distorts Perceptions",
    content: "Continuous exposure can alter your self-image and create unrealistic expectations about relationships and intimacy.",
    color: '#9B59B6',
  },
  {
    id: 5,
    icon: Sprout,
    heading: "Your Brain Can Heal",
    content: "Through neuroplasticity, your brain can form new, healthy neural pathways. Recovery is possible with commitment and support.",
    color: '#F1C40F',
  },
];

function AnimatedIcon({ Icon, color }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withTiming(1.2, { duration: 1000, easing: Easing.ease }),
              withTiming(1, { duration: 1000, easing: Easing.ease })
            ),
            -1,
            true
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.iconContainer, { backgroundColor: color }, animatedStyle]}>
      <Icon color="#FFFFFF" size={48} />
    </Animated.View>
  );
}

export default function EducationScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        await AsyncStorage.setItem('hasCompletedEducation', 'true');
        router.push('/goals');
      } catch (error) {
        console.error('Error saving education completion status:', error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <AnimatedIcon Icon={slides[currentIndex].icon} color={slides[currentIndex].color} />
        
        <Text style={styles.heading}>{slides[currentIndex].heading}</Text>
        <Text style={styles.description}>{slides[currentIndex].content}</Text>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Set Your Goals' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: '80%',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#D4AF37',
    width: 16,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});