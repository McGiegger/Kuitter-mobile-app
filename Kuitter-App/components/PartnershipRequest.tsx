import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserPlus, X } from 'lucide-react-native';

type PartnershipRequestProps = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  partner: {
    name: string;
    avatar?: string;
    streak: number;
    isAnonymous: boolean;
  };
};

export default function PartnershipRequest({
  visible,
  onClose,
  onAccept,
  onDecline,
  partner,
}: PartnershipRequestProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#131836', '#0A0A1A']}
          style={styles.container}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <UserPlus color="#D4AF37" size={32} />
            </View>

            <Text style={styles.title}>Partnership Request</Text>
            
            <View style={styles.partnerInfo}>
              {partner.isAnonymous ? (
                <View style={styles.anonymousAvatar}>
                  <Text style={styles.anonymousText}>A</Text>
                </View>
              ) : (
                <Image
                  source={{ uri: partner.avatar }}
                  style={styles.avatar}
                />
              )}
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.streakText}>{partner.streak} day streak</Text>
            </View>

            <Text style={styles.message}>
              {partner.name} would like to be your accountability partner. Together, you can support each other on your recovery journey.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.declineButton]}
                onPress={onDecline}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.acceptButton]}
                onPress={onAccept}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: Math.min(width - 40, 400),
    backgroundColor: '#131836',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 8,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  partnerInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  anonymousAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  anonymousText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  partnerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streakText: {
    fontSize: 16,
    color: '#D4AF37',
  },
  message: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    fontSize: 16,
    fontWeight: '600',
  },
});