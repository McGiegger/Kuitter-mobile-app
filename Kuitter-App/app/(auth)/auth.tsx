import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Mode = 'signin' | 'signup';
type ValidationError = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slideAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: mode === 'signin' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const validateForm = () => {
    const newErrors: ValidationError = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && !PASSWORD_REGEX.test(password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/visibility');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
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
        <Text style={styles.headerTitle}>
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {mode === 'signin' 
            ? 'Sign in to continue your journey'
            : 'Join our community of warriors'
          }
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" color="#D4AF37" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        {errors.email && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" color="#FF3B30" size={16} />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" color="#D4AF37" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Ionicons name="eye-off" color="#666" size={20} />
            ) : (
              <Ionicons name="eye" color="#666" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" color="#FF3B30" size={16} />
            <Text style={styles.errorText}>{errors.password}</Text>
          </View>
        )}

        {mode === 'signup' && (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" color="#D4AF37" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
            </View>
            {errors.confirmPassword && (
              <View style={styles.errorContainer}>
                <Ionicons name="warning" color="#FF3B30" size={16} />
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              </View>
            )}
          </>
        )}

        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting 
              ? 'Please wait...'
              : mode === 'signin' ? 'Sign In' : 'Create Account'
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={toggleMode}
        >
          <Text style={styles.toggleButtonText}>
            {mode === 'signin' 
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'
            }
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
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  form: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#D4AF37',
    fontSize: 16,
  },
});