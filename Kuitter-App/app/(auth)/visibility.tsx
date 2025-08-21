import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type VisibilityOption = 'public' | 'anonymous';

export default function VisibilityScreen() {
  const { fromSettings } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState<VisibilityOption>('anonymous');

  const handleContinue = () => {
    if (fromSettings === 'true') {
      router.back();
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="shield" color="#D4AF37" size={48} />
          <Text style={styles.title}>Choose Your Visibility</Text>
          <Text style={styles.subtitle}>
            Select how you want to appear to others in the community
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'public' && styles.selectedOption
            ]}
            onPress={() => setSelectedOption('public')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="eye" color="#D4AF37" size={32} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Public Profile</Text>
              <Text style={styles.optionDescription}>
                Share your journey openly and inspire others. Your real name and photo will be visible.
              </Text>
            </View>
            <View style={[
              styles.checkmark,
              selectedOption === 'public' && styles.selectedCheckmark
            ]}>
              <Ionicons name="chevron-forward" color={selectedOption === 'public' ? '#D4AF37' : '#666'} size={24} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'anonymous' && styles.selectedOption
            ]}
            onPress={() => setSelectedOption('anonymous')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="eye-off" color="#D4AF37" size={32} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Stay Anonymous</Text>
              <Text style={styles.optionDescription}>
                Maintain complete privacy while participating. You'll be given a random username.
              </Text>
            </View>
            <View style={[
              styles.checkmark,
              selectedOption === 'anonymous' && styles.selectedCheckmark
            ]}>
              <Ionicons name="chevron-forward" color={selectedOption === 'anonymous' ? '#D4AF37' : '#666'} size={24} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Your Privacy Matters</Text>
          <Text style={styles.infoText}>
            You can change your visibility settings at any time from your profile settings.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            {fromSettings === 'true' ? 'Save Changes' : 'Continue'}
          </Text>
          <Ionicons name="chevron-forward" color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    maxWidth: '80%',
  },
  optionsContainer: {
    padding: 20,
    gap: 16,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderColor: '#D4AF37',
    borderWidth: 1,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckmark: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(58, 58, 140, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'rgba(19, 24, 54, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    gap: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});