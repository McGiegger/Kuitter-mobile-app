import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock trigger log data
const triggerLogs = [
  {
    id: '1',
    date: '2024-02-20',
    time: '22:30',
    triggers: ['Stress', 'Late Night'],
    location: 'Home',
    notes: 'Feeling overwhelmed with work deadlines',
    overcome: true,
  },
  {
    id: '2',
    date: '2024-02-19',
    time: '15:45',
    triggers: ['Boredom', 'Social Media'],
    location: 'Work',
    notes: 'Slow afternoon at work led to mindless scrolling',
    overcome: true,
  },
  {
    id: '3',
    date: '2024-02-18',
    time: '20:15',
    triggers: ['Loneliness', 'Anxiety'],
    location: 'Home',
    notes: 'Weekend evening alone triggered old habits',
    overcome: false,
  },
];

const triggerStats = {
  total: 24,
  overcome: 20,
  thisWeek: 3,
  commonTriggers: [
    { name: 'Stress', count: 8 },
    { name: 'Late Night', count: 6 },
    { name: 'Boredom', count: 5 },
  ],
  commonLocations: [
    { name: 'Home', count: 12 },
    { name: 'Work', count: 8 },
    { name: 'Public', count: 4 },
  ],
};

export default function TriggersScreen() {
  const [filter, setFilter] = useState<'all' | 'overcome' | 'failed'>('all');

  const filteredLogs = triggerLogs.filter(log => {
    if (filter === 'overcome') return log.overcome;
    if (filter === 'failed') return !log.overcome;
    return true;
  });

  const handleLogTrigger = () => {
    router.push('/trigger-log');
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
        <Text style={styles.headerTitle}>Trigger Analysis</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{triggerStats.total}</Text>
            <Text style={styles.statLabel}>Total Triggers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round(triggerStats.overcome / triggerStats.total * 100)}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{triggerStats.thisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Triggers</Text>
          <View style={styles.commonItems}>
            {triggerStats.commonTriggers.map((trigger, index) => (
              <View key={index} style={styles.commonItem}>
                <Ionicons name="warning" color="#FF3B30" size={16} />
                <View style={styles.commonItemInfo}>
                  <Text style={styles.commonItemName}>{trigger.name}</Text>
                  <Text style={styles.commonItemCount}>{trigger.count} times</Text>
                </View>
                <Ionicons name="chevron-forward" color="#E0E0E0" size={20} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Locations</Text>
          <View style={styles.commonItems}>
            {triggerStats.commonLocations.map((location, index) => (
              <View key={index} style={styles.commonItem}>
                <Ionicons name="location" color="#E0E0E0" size={16} />
                <View style={styles.commonItemInfo}>
                  <Text style={styles.commonItemName}>{location.name}</Text>
                  <Text style={styles.commonItemCount}>{location.count} times</Text>
                </View>
                <Ionicons name="chevron-forward" color="#E0E0E0" size={20} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.logHeader}>
            <Text style={styles.sectionTitle}>Trigger Log</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                onPress={() => setFilter('all')}
              >
                <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'overcome' && styles.activeFilter]}
                onPress={() => setFilter('overcome')}
              >
                <Text style={[styles.filterText, filter === 'overcome' && styles.activeFilterText]}>Overcome</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'failed' && styles.activeFilter]}
                onPress={() => setFilter('failed')}
              >
                <Text style={[styles.filterText, filter === 'failed' && styles.activeFilterText]}>Failed</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.logs}>
            {filteredLogs.map((log) => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.logHeader}>
                  <View style={styles.logDate}>
                    <Ionicons name="calendar" color="#D4AF37" size={16} />
                    <Text style={styles.dateText}>{log.date}</Text>
                    <Text style={styles.timeText}>{log.time}</Text>
                  </View>
                  <View style={[styles.statusTag, log.overcome ? styles.overcomeTag : styles.failedTag]}>
                    <Text style={styles.statusText}>
                      {log.overcome ? 'Overcome' : 'Failed'}
                    </Text>
                  </View>
                </View>
                <View style={styles.logLocation}>
                  <Ionicons name="location" color="#E0E0E0" size={16} />
                  <Text style={styles.locationText}>{log.location}</Text>
                </View>
                <View style={styles.triggerTags}>
                  {log.triggers.map((trigger, index) => (
                    <View key={index} style={styles.triggerTag}>
                      <Ionicons name="warning" color="#D4AF37" size={12} />
                      <Text style={styles.triggerText}>{trigger}</Text>
                    </View>
                  ))}
                </View>
                {log.notes && (
                  <Text style={styles.notes}>{log.notes}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.logButton}
        onPress={handleLogTrigger}
      >
        <Ionicons name="notifications" color="#D4AF37" size={24} />
        <Text style={styles.logButtonText}>Log New Trigger</Text>
      </TouchableOpacity>
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
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  commonItems: {
    gap: 12,
  },
  commonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
  },
  commonItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  commonItemName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  commonItemCount: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeFilter: {
    backgroundColor: '#D4AF37',
  },
  filterText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logs: {
    gap: 16,
  },
  logCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
  },
  logDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  timeText: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overcomeTag: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  failedTag: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  logLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  locationText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  triggerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  triggerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  triggerText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  notes: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 12,
    fontStyle: 'italic',
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    margin: 20,
    padding: 16,
    borderRadius: 25,
    gap: 8,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});