import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Slider } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';

const questions = [
  {
    id: 1,
    question: "How long have you been struggling with porn?",
    options: ["Less than 6 months", "6-12 months", "1-3 years", "3-5 years", "5+ years"],
  },
  {
    id: 2,
    question: "How frequently do you currently use porn?",
    options: ["Multiple times daily", "Daily", "Several times a week", "Weekly", "Monthly"],
  },
  {
    id: 3,
    question: "What time of day do you typically experience the strongest urges?",
    options: ["Morning", "Afternoon", "Evening", "Late Night/Before Bed", "After Midnight"],
  },
  {
    id: 4,
    question: "What emotions typically trigger you?",
    options: ["Stress", "Loneliness", "Boredom", "Anxiety", "Depression", "Anger", "Frustration"],
    multiple: true,
  },
];

export default function OnboardingScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[] | number>>({});

  const handleAnswer = (answer: string | number) => {
    const question = questions[currentQuestion];
    if (!question) return;
    
    if (question.type === 'slider') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer,
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: question.multiple 
          ? [...((prev[currentQuestion] as string[]) || []), answer as string]
          : [answer as string],
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      router.push('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const isAnswered = answers[currentQuestion] !== undefined && 
    (Array.isArray(answers[currentQuestion]) 
      ? (answers[currentQuestion] as string[]).length > 0 
      : true);
  
  const question = questions[currentQuestion];

  // If there's no valid question, show an error state
  if (!question) {
    return (
      <LinearGradient
        colors={['#131836', '#0A0A1A']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.errorText}>Error loading question</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.progress}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.question}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.type === 'slider' ? (
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={question.min}
                maximumValue={question.max}
                step={question.step}
                value={answers[currentQuestion] as number || 5}
                onValueChange={handleAnswer}
                minimumTrackTintColor="#D4AF37"
                maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                thumbTintColor="#D4AF37"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Not Comfortable</Text>
                <Text style={styles.sliderValue}>
                  {answers[currentQuestion] !== undefined ? answers[currentQuestion] : 5}
                </Text>
                <Text style={styles.sliderLabel}>Very Comfortable</Text>
              </View>
            </View>
          ) : (
            question.options?.map((option) => {
              const isSelected = Array.isArray(answers[currentQuestion]) && 
                (answers[currentQuestion] as string[])?.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isAnswered && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isAnswered}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Text>
          <ChevronRight color="#FFFFFF" size={24} />
        </TouchableOpacity>
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
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  progress: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    backgroundColor: '#3A3A8C',
    borderColor: '#D4AF37',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginTop: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderLabel: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  sliderValue: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    gap: 8,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});