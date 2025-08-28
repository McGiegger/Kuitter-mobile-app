// VisibilityScreen.tsx
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext'; // central session
import { useUsernameAvailability } from '../../hooks/useUsernameAvailability';
import supabaseClient from '../../supabaseClient';

type VisibilityOption = 'public' | 'anonymous';

export default function VisibilityScreen() {
  const { fromSettings } = useLocalSearchParams();
  const { session, loading } = useAuth(); // pull from context
  const [selectedOption, setSelectedOption] = useState<VisibilityOption>('anonymous');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const { 
    available: usernameAvailable, 
    loading: isCheckingUsername, 
    error: usernameCheckError, 
    checkUsername, 
    reset: resetUsernameCheck 
  } = useUsernameAvailability();

  // Handle username input changes
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setUsernameError('');
    resetUsernameCheck();
  };


  useEffect(() => {
    if (!loading && !session) {
      router.replace("/(auth)/auth");
    }
  }, [loading, session]);

  // Save username
  const handleSaveUsername = async () => {
    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }

    await checkUsername(username, session?.user?.id);
  };

  // Close modal if username available
  useEffect(() => {
    if (usernameAvailable === true && !usernameCheckError) {
      setShowUsernameModal(false);
    }
  }, [usernameAvailable, usernameCheckError]);

  useEffect(() => {
    if (usernameCheckError) {
      setUsernameError(usernameCheckError);
    }
  }, [usernameCheckError]);

  const handleContinue = async () => {
   
    if (loading) return; // still checking session

    if (!username || !username.trim()) {
      Alert.alert("Username Required", "Please enter a username to continue.");
      setShowUsernameModal(true);
      return;
    }

    if (usernameAvailable !== true) {
      Alert.alert("Username Issue", "Please choose an available username before continuing.");
      setShowUsernameModal(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/functions/v1/set-profile-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`, // from AuthContext
          },
          body: JSON.stringify({ profile_type: selectedOption, username: username.toLowerCase() }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Error", data.error || `Server error: ${response.status}`);
        return;
      }
    } catch (error) {
      Alert.alert("Network Error", "Failed to save profile settings. Please try again.");
      return;
    }

    
    //check if user has completed onboarding questions
    const { data: onboarding, error: onboardingError } = await supabaseClient
      .from("onboarding_answers")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (onboardingError) {
      console.error("Error fetching onboarding answers:", onboardingError);
      return;
    }

    console.log(onboarding);

    if (fromSettings === "true") {
      router.push("/(tabs)/settings");
    } else if (!onboarding ) {
      router.push("/(auth)/onboarding");
    } else {
      router.push("/(onboarding)/education");
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
            onPress={() => {
              setSelectedOption('public');
              setShowUsernameModal(true);
            }}
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
            onPress={() => {
              setSelectedOption('anonymous');
              setShowUsernameModal(true);
            }}
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
          style={[
            styles.continueButton,
            (!username || usernameAvailable !== true) && styles.disabledContinueButton
          ]}
          onPress={handleContinue}
        >
          <Text style={[
            styles.continueButtonText,
            (!username || usernameAvailable !== true) && styles.disabledContinueButtonText
          ]}>
            {!username ? 'Enter Username First' : 
             usernameAvailable !== true ? 'Choose Available Username' :
             fromSettings === 'true' ? 'Save Changes' : 'Continue'}
          </Text>
          <Ionicons 
            name="chevron-forward" 
            color={(!username || usernameAvailable !== true) ? "#999" : "#FFFFFF"} 
            size={20} 
          />
        </TouchableOpacity>
      </View>

      {/* Username Modal */}
      <Modal
        visible={showUsernameModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUsernameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Username</Text>
              <TouchableOpacity
                onPress={() => setShowUsernameModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" color="#666" size={24} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              {selectedOption === 'public' 
                ? 'Enter a username for your public profile'
                : 'Enter a username for anonymous participation'
              }
            </Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.usernameInput,
                    (usernameError || usernameAvailable === false) ? styles.inputError : null,
                    usernameAvailable === true ? styles.inputSuccess : null
                  ]}
                  placeholder="Enter username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={handleUsernameChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                />
                <View style={styles.inputFeedback}>
                  {isCheckingUsername && (
                    <ActivityIndicator size="small" color="#D4AF37" />
                  )}
                  {!isCheckingUsername && usernameAvailable === true && (
                    <Ionicons name="checkmark-circle" color="#4CAF50" size={20} />
                  )}
                  {!isCheckingUsername && usernameAvailable === false && (
                    <Ionicons name="close-circle" color="#FF6B6B" size={20} />
                  )}
                </View>
              </View>
              {usernameError ? (
                <Text style={[
                  styles.feedbackText,
                  usernameAvailable === false ? styles.errorText : styles.errorText
                ]}>{usernameError}</Text>
              ) : usernameAvailable === true ? (
                <Text style={[styles.feedbackText, styles.successText]}>Nice. Username is available</Text>
              ) : null}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowUsernameModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  isCheckingUsername && styles.disabledButton
                ]}
                onPress={handleSaveUsername}
                disabled={isCheckingUsername}
              >
                {isCheckingUsername ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={[styles.saveButtonText, { marginLeft: 8 }]}>Checking...</Text>
                  </View>
                ) : (
                  <Text style={styles.saveButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  disabledContinueButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
  },
  disabledContinueButtonText: {
    color: '#999',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1F36',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  inputSuccess: {
    borderColor: '#4CAF50',
  },
  inputFeedback: {
    position: 'absolute',
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    color: '#FF6B6B',
  },
  successText: {
    color: '#4CAF50',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.5)',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});