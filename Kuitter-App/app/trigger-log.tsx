import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const triggers = [
  'Stress',
  'Loneliness',
  'Boredom',
  'Anxiety',
  'Fatigue',
  'Social Media',
  'Late Night',
  'Work Pressure',
];

const locations = [
  'Home',
  'Work',
  'Public Place',
  'Transportation',
  'Other',
];

export default function TriggerLogScreen() {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [overcame, setOvercame] = useState(true); // Default to true as requested

  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSave = () => {
    // Here you would typically save the trigger log with the overcame status
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
        <Text style={styles.headerTitle}>Log Trigger</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications" color="#D4AF37" size={24} />
            <Text style={styles.sectionTitle}>What triggered you?</Text>
          </View>
          <View style={styles.triggerGrid}>
            {triggers.map((trigger) => (
              <TouchableOpacity
                key={trigger}
                style={[
                  styles.triggerButton,
                  selectedTriggers.includes(trigger) && styles.selectedTrigger,
                ]}
                onPress={() => toggleTrigger(trigger)}
              >
                <Text style={[
                  styles.triggerText,
                  selectedTriggers.includes(trigger) && styles.selectedTriggerText,
                ]}>{trigger}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time" color="#E0E0E0" size={16} />
            <Text style={styles.sectionTitle}>Where were you?</Text>
          </View>
          <View style={styles.locationContainer}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location}
                style={[
                  styles.locationButton,
                  selectedLocation === location && styles.selectedLocation,
                ]}
                onPress={() => setSelectedLocation(location)}
              >
                <Text style={[
                  styles.locationText,
                  selectedLocation === location && styles.selectedLocationText,
                ]}>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield" color="#D4AF37" size={24} />
            <Text style={styles.sectionTitle}>Did you overcome this trigger?</Text>
          </View>
          <View style={styles.outcomeContainer}>
            <View style={styles.outcomeToggle}>
              <Text style={[styles.outcomeText, !overcame && styles.activeOutcomeText]}>Failed</Text>
              <Switch
                value={overcame}
                onValueChange={setOvercame}
                trackColor={{ false: '#FF3B30', true: '#4CAF50' }}
                thumbColor={overcame ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#FF3B30"
              />
              <Text style={[styles.outcomeText, overcame && styles.activeOutcomeText]}>Overcame</Text>
            </View>
            <Text style={styles.outcomeDescription}>
              {overcame 
                ? "Great job staying strong! What strategies helped you overcome this trigger? "
                : "It's okay. Every setback is a learning opportunity. What could you do differently next time? "
              }
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning" color="#FF3B30" size={16} />
            <Text style={styles.sectionTitle}>Additional Notes</Text>
          </View>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add any additional context..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!selectedTriggers.length || !selectedLocation) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!selectedTriggers.length || !selectedLocation}
        >
          <Text style={styles.saveButtonText}>Save Trigger Log</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  triggerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  triggerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: '45%',
  },
  selectedTrigger: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  triggerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedTriggerText: {
    fontWeight: '600',
  },
  locationContainer: {
    gap: 12,
  },
  locationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  selectedLocation: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedLocationText: {
    fontWeight: '600',
  },
  outcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
  },
  outcomeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  outcomeText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  activeOutcomeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  outcomeDescription: {
    color: '#E0E0E0',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});