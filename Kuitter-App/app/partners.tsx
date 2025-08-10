import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, MessageCircle, UserMinus, CircleUser as UserCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';
import Dialog from '@/components/Dialog';

type Partner = {
  id: string;
  name: string;
  avatar?: string;
  isAnonymous?: boolean;
  unreadMessages: number;
  status: 'online' | 'offline';
  lastMessage?: string;
  lastMessageTime?: string;
};

const partners: Partner[] = [
  {
    id: '1',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    unreadMessages: 2,
    status: 'online',
    lastMessage: "Hey, how are you holding up today?",
    lastMessageTime: '2h ago',
  },
  {
    id: '2',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    unreadMessages: 1,
    status: 'online',
    lastMessage: "Great progress this week! Keep it up! 💪",
    lastMessageTime: '4h ago',
  },
  {
    id: '3',
    name: 'Anonymous',
    isAnonymous: true,
    unreadMessages: 0,
    status: 'offline',
    lastMessage: "Thanks for the support yesterday",
    lastMessageTime: '1d ago',
  },
  {
    id: '4',
    name: 'Michael R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    unreadMessages: 3,
    status: 'offline',
    lastMessage: "Let's check in tomorrow",
    lastMessageTime: '2d ago',
  },
];

export default function PartnersScreen() {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  const handleRemovePartner = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
    setShowRemoveDialog(true);
  };

  const confirmRemovePartner = () => {
    // Here you would typically make an API call to remove the partner
    setShowRemoveDialog(false);
    setSelectedPartnerId(null);
  };

  const handleChat = (partnerId: string) => {
    router.push(`/(chat)/partner-chat/${partnerId}`);
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
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Partners</Text>
      </View>

      <ScrollView style={styles.content}>
        {partners.map((partner) => (
          <View key={partner.id} style={styles.partnerCard}>
            <TouchableOpacity 
              style={styles.partnerInfo}
              onPress={() => handleChat(partner.id)}
            >
              {partner.isAnonymous ? (
                <View style={styles.anonymousAvatar}>
                  <UserCircle2 size={40} color="#D4AF37" />
                </View>
              ) : (
                <Image
                  source={{ uri: partner.avatar }}
                  style={styles.avatar}
                />
              )}
              <View style={styles.partnerDetails}>
                <View style={styles.partnerHeader}>
                  <Text style={styles.partnerName}>{partner.name}</Text>
                  <Text style={styles.timestamp}>{partner.lastMessageTime}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: partner.status === 'online' ? '#4CAF50' : '#666' }
                  ]} />
                  <Text style={styles.statusText}>
                    {partner.status === 'online' ? 'Online' : 'Offline'}
                  </Text>
                </View>
                <Text 
                  style={styles.lastMessage}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {partner.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.actions}>
              {partner.unreadMessages > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{partner.unreadMessages}</Text>
                </View>
              )}
              <TouchableOpacity 
                style={styles.chatButton}
                onPress={() => handleChat(partner.id)}
              >
                <MessageCircle color="#FFFFFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemovePartner(partner.id)}
              >
                <UserMinus color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Dialog
        visible={showRemoveDialog}
        title="Remove Partner"
        message="Are you sure you want to remove this accountability partner? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmRemovePartner}
        onCancel={() => setShowRemoveDialog(false)}
        destructive={true}
      />
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
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  partnerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  anonymousAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  partnerDetails: {
    flex: 1,
  },
  partnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  lastMessage: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#3A3A8C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#CF3030',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});