import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Book } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const MAX_CHARACTERS = 1000;

export default function JournalEntryScreen() {
  const { mood, experiencedUrges } = useLocalSearchParams();
  const [entry, setEntry] = useState('');
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSave = () => {
    // Here you would typically save the journal entry
    router.back();
  };

  const remainingCharacters = MAX_CHARACTERS - entry.length;

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Book color="#D4AF37" size={24} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Journal Entry</Text>
            <Text style={styles.headerDate}>{today}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.moodContainer}>
          <Text style={styles.mood}>{mood as string}</Text>
          <Text style={styles.urgeStatus}>
            {experiencedUrges === 'true' ? 'Experienced urges' : 'No urges today'}
          </Text>
        </View>

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
          style={[
            styles.saveButton,
            !entry.trim() && styles.buttonDisabled
          ]}
          onPress={handleSave}
          disabled={!entry.trim()}
        >
          <Text style={styles.saveButtonText}>Save Entry</Text>
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
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerDate: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  mood: {
    fontSize: 24,
  },
  urgeStatus: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
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
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});