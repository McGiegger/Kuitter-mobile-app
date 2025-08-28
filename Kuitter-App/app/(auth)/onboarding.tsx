import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext'; // central session
import supabaseClient from '../../supabaseClient';

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
  const [answers, setAnswers] = useState<Record<number, string[] | string>>({});
  const { session, loading } = useAuth(); // pull from context

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/(auth)/auth");
    }
  }, [session, loading]);

  const handleAnswer = (answer: string | number) => {
    const question = questions[currentQuestion];
    if (!question) return;
    
    if (question.multiple) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: [...((prev[currentQuestion] as string[]) || []), answer as string],
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer as string,
      }));
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {

            try {

            const { error } = await submitAnswers(answers);

            if (error) {
              console.error("Error saving answers:", error);
              return;
            }

            // check if onboarding is fully complete
            const { data, error: fetchError } = await supabaseClient
            .from("recovery_goals")
            .select("*")
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (fetchError) {
            console.error("Error checking recovery_goals:", fetchError);
            return;
          }

          if (data) {
            // user now has recovery goals → move them to main app
            router.replace("/(tabs)");
          } else {
            // If they still miss recovery goals → continue onboarding flow
            router.replace("/(onboarding)/education");
          }

          } catch (error) {
            console.error("Unexpected error in handleNext:", error);
          }
    }
  }
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
      : answers[currentQuestion] !== '');
  
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

  const submitAnswers = async function submitAnswers(answers: Record<number, string[] | string>) {
    try {

      const token = session?.access_token;
  

    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/functions/v1/set-onboarding-answers`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
      throw new Error(`Failed to submit answers: ${res.status}`);
    }

    const data = await res.json();
    return { error: data.error };

    } catch (error) {
      console.error("Error saving answers:", error);
      return { error: "Failed to save answers" };
    }
  }


  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" color="#FFFFFF" size={24} />
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
          {question.options?.map((option) => {
            const isSelected = question.multiple 
              ? Array.isArray(answers[currentQuestion]) && (answers[currentQuestion] as string[])?.includes(option)
              : answers[currentQuestion] === option;
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
          })}
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
          <Ionicons name="chevron-forward" color="#FFFFFF" size={24} />
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
