import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { UserPlus, X } from 'lucide-react-native';
import { router } from 'expo-router';

type PartnershipRequestNotificationProps = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  partner: {
    id: string;
    name: string;
    avatar?: string;
    isAnonymous: boolean;
    streak: number;
  };
};

export default function PartnershipRequestNotification({
  visible,
  onClose,
  onAccept,
  onDecline,
  partner,
}: PartnershipRequestNotificationProps) {
  if (!visible) return null;

  const handleAccept = () => {
    onAccept();
    router.push(`/partner-chat/${partner.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <UserPlus color="#D4AF37" size={20} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>New Partnership Request</Text>
            <Text style={styles.subtitle}>{partner.name} wants to connect</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.partnerInfo}>
          {partner.isAnonymous ? (
            <View style={styles.anonymousAvatar}>
              <Text style={styles.anonymousText}>
                {partner.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: partner.avatar }}
              style={styles.avatar}
            />
          )}
          <Text style={styles.streakText}>{partner.streak} day streak</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.declineButton]} 
            onPress={onDecline}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 16,
  },
  content: {
    backgroundColor: '#1E2340',
    borderRadius: 16,
    padding: 16,
    maxWidth: Math.min(width - 32, 400),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  partnerInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  anonymousAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  anonymousText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  streakText: {
    color: '#D4AF37',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  acceptButton: {
    backgroundColor: '#D4AF37',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});