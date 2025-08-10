import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';

type JournalEntry = {
  date: string;
  mood: string;
  urges: boolean;
  entry: string;
};

export default function JournalScreen() {
  // In a real app, this would be fetched from storage or API
  const journalEntries: JournalEntry[] = [
    {
      date: '2024-02-20T10:00:00.000Z',
      mood: '😊',
      urges: false,
      entry: "Today was a great day! I managed to stay focused on my work and spent quality time with family. The urges were minimal, and I'm feeling strong in my recovery journey.",
    },
    {
      date: '2024-02-19T15:30:00.000Z',
      mood: '😐',
      urges: true,
      entry: "Had some challenges today but managed to overcome them. Used the breathing exercises when I felt triggered, and they really helped. Grateful for this community's support.",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recovery Journal</Text>
      </View>

      <ScrollView style={styles.content}>
        {journalEntries.map((entry, index) => (
          <View key={index} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.dateContainer}>
                <Calendar color="#D4AF37" size={20} />
                <Text style={styles.date}>{formatDate(entry.date)}</Text>
              </View>
              <View style={styles.moodContainer}>
                <Text style={styles.mood}>{entry.mood}</Text>
                <Text style={styles.urgeStatus}>
                  {entry.urges ? 'Experienced urges' : 'No urges'}
                </Text>
              </View>
            </View>
            <Text style={styles.entryText}>{entry.entry}</Text>
          </View>
        ))}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  entryCard: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  entryHeader: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  date: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  entryText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
});