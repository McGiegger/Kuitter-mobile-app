import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

const MAX_CHARACTERS = 1000; // Set maximum character limit

type JournalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedMood: string;
  experiencedUrges: boolean;
  onSave: (entry: string) => void;
};

export default function Journal({
  isVisible,
  onClose,
  selectedMood,
  experiencedUrges,
  onSave,
}: JournalProps) {
  const [entry, setEntry] = useState('');
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSave = () => {
    onSave(entry);
    setEntry('');
    onClose();
  };

  const remainingCharacters = MAX_CHARACTERS - entry.length;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.journalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#FFFFFF" size={24} />
              </TouchableOpacity>
              <Text style={styles.date}>{today}</Text>
              <View style={styles.moodContainer}>
                <Text style={styles.mood}>{selectedMood}</Text>
                <Text style={styles.urgeStatus}>
                  {experiencedUrges ? 'Experienced urges' : 'No urges today'}
                </Text>
              </View>
            </View>

            <ScrollView 
              style={styles.content}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                multiline
                placeholder="How are you feeling today? What's on your mind?"
                placeholderTextColor="#666"
                value={entry}
                onChangeText={(text) => {
                  if (text.length <= MAX_CHARACTERS) {
                    setEntry(text);
                  }
                }}
                textAlignVertical="top"
                maxLength={MAX_CHARACTERS}
              />
              <Text style={[
                styles.characterCount,
                remainingCharacters < 100 && styles.characterCountWarning
              ]}>
                {remainingCharacters} characters remaining
              </Text>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.saveButton,
                  !entry.trim() && styles.buttonDisabled
                ]}
                onPress={handleSave}
                disabled={!entry.trim()}
              >
                <Text style={styles.buttonText}>Save Entry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardView: {
    flex: 1,
  },
  journalContainer: {
    flex: 1,
    backgroundColor: '#131836',
    marginTop: Platform.OS === 'ios' ? 0 : 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9, // Limit height on mobile
    width: Platform.OS === 'web' ? Math.min(width * 0.8, 600) : width, // Responsive width
    alignSelf: 'center',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  date: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mood: {
    fontSize: 24,
  },
  urgeStatus: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  characterCountWarning: {
    color: '#FF3B30',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    backgroundColor: '#D4AF37',
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