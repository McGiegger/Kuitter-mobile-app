import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const goals = [
  "Improve my relationships",
  "Increase my productivity",
  "Reduce anxiety/shame",
  "Regain control of my time",
  "Improve my self-image",
  "Align with my personal values",
  "Enhance my focus and concentration",
];

const timelineOptions = [7, 30, 90, 180, 365];

export default function GoalSettingScreen() {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(30);
  
  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.heading}>Set Your Recovery Goals</Text>
            <Text style={styles.subheading}>Select what you hope to achieve</Text>
            
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.goalOption,
                  selectedGoals.includes(goal) && styles.selectedGoal,
                ]}
                onPress={() => toggleGoal(goal)}
              >
                <View style={[
                  styles.checkbox,
                  selectedGoals.includes(goal) && styles.checkedBox,
                ]}>
                  {selectedGoals.includes(goal) && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
                <Text style={[
                  styles.goalText,
                  selectedGoals.includes(goal) && styles.selectedGoalText,
                ]}>{goal}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      
      case 2:
        return (
          <View style={styles.content}>
            <Text style={styles.heading}>Your Recovery Timeline</Text>
            <Text style={styles.timelineValue}>{timeline} days</Text>
            
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={timelineOptions.length - 1}
              step={1}
              value={timelineOptions.indexOf(timeline)}
              onValueChange={(value) => setTimeline(timelineOptions[value])}
              minimumTrackTintColor="#D4AF37"
              maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
              thumbTintColor="#D4AF37"
            />
            
            <View style={styles.timelineMarkers}>
              {timelineOptions.map((days) => (
                <Text key={days} style={styles.timelineMarker}>{days}d</Text>
              ))}
            </View>
            
            <Text style={styles.commitment}>
              I commit to my recovery journey for {timeline} days
            </Text>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.content}>
            <Text style={styles.heading}>You Will Overcome This</Text>
            <Text style={styles.assuranceText}>
              You will be porn-free in {timeline} days
            </Text>
            <Text style={styles.motivationalText}>
              Remember, every journey begins with a single step. You've already taken that step by committing to change. With dedication and support, you will achieve your goals and create lasting positive change in your life.
            </Text>
          </View>
        );
    }
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((stepNumber) => (
          <View
            key={stepNumber}
            style={[
              styles.progressDot,
              step >= stepNumber && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {renderStep()}

      <TouchableOpacity
        style={[
          styles.button,
          step === 1 && selectedGoals.length === 0 && styles.buttonDisabled,
        ]}
        onPress={handleNext}
        disabled={step === 1 && selectedGoals.length === 0}
      >
        <Text style={styles.buttonText}>
          {step === 3 ? 'Begin My Journey' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 20,
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
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 24,
    textAlign: 'center',
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedGoal: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderColor: '#D4AF37',
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedGoalText: {
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 20,
  },
  timelineValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginVertical: 20,
  },
  timelineMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timelineMarker: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  commitment: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
  },
  assuranceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginVertical: 24,
  },
  motivationalText: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});