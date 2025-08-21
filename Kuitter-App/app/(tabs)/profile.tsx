import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const recoveryGoals = [
  {
    id: '1',
    goal: "Improve relationships",
    progress: 60, // percentage
    status: 'active'
  },
  {
    id: '2',
    goal: "Increase productivity",
    progress: 45,
    status: 'active'
  },
  {
    id: '3',
    goal: "Reduce anxiety/shame",
    progress: 30,
    status: 'active'
  },
  {
    id: '4',
    goal: "Regain control of time",
    progress: 75,
    status: 'active'
  },
  {
    id: '5',
    goal: "Enhance mental clarity",
    progress: 20,
    status: 'active'
  }
];

const achievements = [
  { 
    id: '1', 
    title: '7 Days Strong', 
    description: 'Completed your first week', 
    icon: 'time',
    earned: true,
  },
  { 
    id: '2', 
    title: 'Mindful Warrior', 
    description: 'Completed 10 journal entries', 
    icon: 'book',
    earned: true,
  },
  { 
    id: '3', 
    title: 'Urge Surfer', 
    description: 'Overcame 5 strong urges', 
    icon: 'bulb',
    earned: false,
  },
  { 
    id: '4', 
    title: 'Connection Builder', 
    description: 'Active in community for 30 days', 
    icon: 'heart',
    earned: false,
  },
];

const stats = [
  { id: '1', title: 'Current Streak', value: '7 days', icon: 'time' },
  { id: '2', title: 'Longest Streak', value: '15 days', icon: 'trophy' },
  { id: '3', title: 'Urges Overcome', value: '24', icon: 'shield-checkmark' },
  { id: '4', title: 'Journal Entries', value: '12', icon: 'book' },
];

export default function ProfileScreen() {
  const handleViewJournal = () => {
    router.push('/journal');
  };

  const handleViewTriggers = () => {
    router.push('/triggers');
  };

  const handleUpdateGoals = () => {
    router.push('/(onboarding)/goals');
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.name}>Alex</Text>
          <Text style={styles.subtitle}>Day 7 of Recovery Journey</Text>
        </View>

        <View style={styles.streakContainer}>
          <View style={styles.streakContent}>
            <Ionicons name="trending-up" color="#D4AF37" size={24} />
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>Recovery Timeline</Text>
              <Text style={styles.streakValue}>23 days remaining</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '23%' }]} />
          </View>
          <Text style={styles.streakGoal}>30-Day Challenge</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Ionicons name={stat.icon as any} color="#D4AF37" size={24} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.triggerCard}
          onPress={handleViewTriggers}
        >
          <View style={styles.triggerHeader}>
            <View style={styles.triggerIconContainer}>
              <Ionicons name="notifications" color="#D4AF37" size={24} />
            </View>
            <View style={styles.triggerInfo}>
              <Text style={styles.triggerTitle}>Trigger Log</Text>
              <Text style={styles.triggerSubtitle}>Track and analyze your triggers</Text>
            </View>
          </View>
          <View style={styles.triggerStats}>
            <View style={styles.triggerStat}>
              <Text style={styles.triggerStatValue}>24</Text>
              <Text style={styles.triggerStatLabel}>Total Triggers</Text>
            </View>
            <View style={styles.triggerStat}>
              <Text style={styles.triggerStatValue}>85%</Text>
              <Text style={styles.triggerStatLabel}>Overcome</Text>
            </View>
            <View style={styles.triggerStat}>
              <Text style={styles.triggerStatValue}>3</Text>
              <Text style={styles.triggerStatLabel}>This Week</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Recovery Goals</Text>
            <TouchableOpacity 
              style={styles.updateGoalsButton}
              onPress={handleUpdateGoals}
            >
              <Ionicons name="add" color="#D4AF37" size={20} />
              <Text style={styles.updateGoalsText}>Update Goals</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.goalsContainer}>
            {recoveryGoals.map((goal) => (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <Ionicons name="radio-button-on" color="#D4AF37" size={20} />
                  <Text style={styles.goalText}>{goal.goal}</Text>
                  <Ionicons name="chevron-forward" color="#E0E0E0" size={16} />
                </View>
                <View style={styles.goalProgress}>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBarFill,
                        { width: `${goal.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{goal.progress}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievements}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.unearned
                ]}
              >
                <Ionicons 
                  name={achievement.icon as any} 
                  color={achievement.earned ? "#D4AF37" : "#666"} 
                  size={24} 
                />
                <View style={styles.achievementInfo}>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.earned && styles.unearnedText
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.unearnedText
                  ]}>
                    {achievement.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.journalButton} onPress={handleViewJournal}>
          <Ionicons name="book" color="#FFFFFF" size={20} style={styles.journalIcon} />
          <Text style={styles.journalButtonText}>View Recovery Journal</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3A3A8C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  streakContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 20,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakInfo: {
    marginLeft: 12,
  },
  streakTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },
  streakValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 4,
  },
  streakGoal: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  updateGoalsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  updateGoalsText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 4,
  },
  triggerCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 20,
  },
  triggerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  triggerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  triggerInfo: {
    flex: 1,
  },
  triggerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  triggerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  triggerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  triggerStat: {
    alignItems: 'center',
  },
  triggerStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 4,
  },
  triggerStatLabel: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
  progressText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  achievements: {
    gap: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
  },
  unearned: {
    opacity: 0.5,
  },
  achievementInfo: {
    marginLeft: 16,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  achievementDescription: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 4,
  },
  unearnedText: {
    color: '#666',
  },
  journalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 0,
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    gap: 8,
  },
  journalIcon: {
    marginRight: 4,
  },
  journalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});