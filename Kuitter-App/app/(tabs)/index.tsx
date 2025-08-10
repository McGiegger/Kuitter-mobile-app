import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wind, Timer, Bell, Dumbbell, Users, MessageCircle } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { router } from 'expo-router';

const quickActions = [
  { 
    id: '1', 
    icon: Bell, 
    label: 'Log Trigger',
    route: '/trigger-log',
  },
  { 
    id: '2', 
    icon: Wind, 
    label: 'Breathing',
    route: '/breathing',
  },
  { 
    id: '3', 
    icon: Dumbbell, 
    label: 'Exercise',
    route: '/exercise',
  },
];

const moods = ['😊', '😐', '😔', '😣', '😤'];

const partners = [
  {
    id: '1',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    unreadMessages: 2,
    status: 'online'
  },
  {
    id: '2',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    unreadMessages: 1,
    status: 'online'
  },
  {
    id: '3',
    name: 'Michael R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    unreadMessages: 3,
    status: 'offline'
  },
  {
    id: '4',
    name: 'Emily W.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    unreadMessages: 0,
    status: 'offline'
  }
];

export default function DashboardScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [experiencedUrges, setExperiencedUrges] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [bestStreak, setBestStreak] = useState(15);
  const [showMilestone, setShowMilestone] = useState(false);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);

  useEffect(() => {
    const total = partners.reduce((sum, partner) => sum + partner.unreadMessages, 0);
    setTotalUnreadMessages(total);
  }, []);

  const streakProgress = (currentStreak / bestStreak) * 100;

  const milestoneStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSequence(
          withSpring(1.2),
          withSpring(1)
        ),
      },
    ],
  }));

  useEffect(() => {
    if (currentStreak === 7) {
      setShowMilestone(true);
      setTimeout(() => setShowMilestone(false), 3000);
    }
  }, [currentStreak]);

  const handleViewPartners = () => {
    router.push('/partners');
  };

  const handleJournalEntry = () => {
    router.push({
      pathname: '/journal-entry',
      params: { 
        mood: selectedMood,
        experiencedUrges: experiencedUrges.toString()
      }
    });
  };

  const handleUrgeToggle = (value: boolean) => {
    setExperiencedUrges(value);
    if (value) {
      router.push('/panic');
    }
  };

  const handleQuickAction = (route: string) => {
    router.push(route);
  };

  const MAX_VISIBLE_PARTNERS = 3;
  const remainingPartners = partners.length - MAX_VISIBLE_PARTNERS;

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <Animated.View style={[styles.streakContainer, showMilestone && milestoneStyle]}>
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={streakProgress}
            tintColor="#D4AF37"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            rotation={0}
          >
            {() => (
              <View style={styles.streakContent}>
                <Timer color="#D4AF37" size={32} />
                <Text style={styles.streakCount}>{currentStreak} Days</Text>
                <Text style={styles.streakBest}>Best: {bestStreak} days</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </Animated.View>

        <TouchableOpacity style={styles.partnerCard} onPress={handleViewPartners}>
          <View style={styles.partnerHeader}>
            <Users color="#D4AF37" size={24} />
            <Text style={styles.partnerTitle}>Accountability Partners</Text>
          </View>
          <View style={styles.partnerContent}>
            <View style={styles.avatarStack}>
              {partners.slice(0, MAX_VISIBLE_PARTNERS).map((partner, index) => (
                <Image
                  key={partner.id}
                  source={{ uri: partner.avatar }}
                  style={[
                    styles.stackedAvatar,
                    index === 0 && styles.firstAvatar
                  ]}
                />
              ))}
              {remainingPartners > 0 && (
                <View style={styles.remainingCount}>
                  <Text style={styles.remainingCountText}>+{remainingPartners}</Text>
                </View>
              )}
            </View>
            <View style={styles.partnerInfo}>
              <View style={styles.onlineStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>
                  {partners.filter(p => p.status === 'online').length} online
                </Text>
              </View>
              <View style={styles.messageIcon}>
                <MessageCircle color="#FFFFFF" size={24} />
                {totalUnreadMessages > 0 && (
                  <View style={styles.messageBadge}>
                    <Text style={styles.messageBadgeText}>{totalUnreadMessages}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.checkInCard}>
          <Text style={styles.cardTitle}>Daily Check-In</Text>
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.selectedMood
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={styles.moodEmoji}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.urgeToggle}>
            <Text style={styles.urgeText}>Felt or Feeling urges today?</Text>
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleText, !experiencedUrges && styles.activeToggleText]}>
                No
              </Text>
              <Switch
                value={experiencedUrges}
                onValueChange={handleUrgeToggle}
                trackColor={{ false: '#767577', true: '#FF3B30' }}
                thumbColor={experiencedUrges ? '#FF3B30' : '#f4f3f4'}
              />
              <Text style={[styles.toggleText, experiencedUrges && styles.activeToggleText]}>
                Yes
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.journalButton,
              !selectedMood && styles.journalButtonDisabled
            ]}
            onPress={handleJournalEntry}
            disabled={!selectedMood}
          >
            <Text style={styles.journalButtonText}>
              Open Journal
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.actionButton}
                onPress={() => handleQuickAction(action.route)}
              >
                <action.icon color="#FFFFFF" size={20} />
                <Text style={styles.actionText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    padding: 20,
    paddingTop: 60,
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  streakContent: {
    alignItems: 'center',
  },
  streakCount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  streakBest: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  partnerCard: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  partnerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  partnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stackedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#131836',
    zIndex: 1,
  },
  firstAvatar: {
    marginLeft: 0,
  },
  remainingCount: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3A3A8C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#131836',
    marginLeft: -10,
  },
  remainingCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  messageBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  messageBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageIcon: {
    position: 'relative',
  },
  checkInCard: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderColor: '#D4AF37',
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 24,
  },
  urgeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  urgeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  activeToggleText: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  journalButton: {
    backgroundColor: '#D4AF37',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  journalButtonDisabled: {
    opacity: 0.5,
  },
  journalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingBottom: 100,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});