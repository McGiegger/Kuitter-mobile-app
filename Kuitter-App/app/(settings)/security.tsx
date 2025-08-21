import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SecuritySettingsScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Here you would typically make an API call to change the password
    router.back();
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
        <Text style={styles.headerTitle}>Security Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Change Password</Text>

        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#666"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showPasswords}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? (
                <Ionicons name="eye-off" color="#666" size={20} />
              ) : (
                <Ionicons name="eye" color="#666" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#666"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPasswords}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" color="#D4AF37" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPasswords}
            />
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" color="#FF3B30" size={16} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Password Requirements:</Text>
          <Text style={styles.infoText}>• Minimum 8 characters</Text>
          <Text style={styles.infoText}>• At least one uppercase letter</Text>
          <Text style={styles.infoText}>• At least one lowercase letter</Text>
          <Text style={styles.infoText}>• At least one number</Text>
          <Text style={styles.infoText}>• At least one special character</Text>
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  section: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
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
    gap: 8,
    marginTop: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 40,
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
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 8,
  },
});