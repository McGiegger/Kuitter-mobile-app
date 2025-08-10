import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Send, CircleUser as UserCircle2, UserPlus } from 'lucide-react-native';
import Dialog from '@/components/Dialog';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'partner';
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hey, how are you holding up today?",
    sender: 'partner',
    timestamp: '2h ago',
  },
  {
    id: '2',
    content: "I'm doing okay, thanks for asking. Had some challenges but staying strong.",
    sender: 'user',
    timestamp: '2h ago',
  },
];

export default function PartnerChatScreen() {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [partner] = useState({
    name: 'John D.',
    isAnonymous: false,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    streak: 15,
    status: 'online',
    isPartner: false
  });

  useEffect(() => {
    if (!partner.isPartner) {
      router.replace('/(tabs)/community');
    }
  }, [partner.isPartner]);

  const handleBack = () => {
    router.back();
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        content: "That's great to hear! Keep going strong. I'm here if you need support.",
        sender: 'partner',
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleAddPartner = () => {
    setShowRequestDialog(true);
  };

  const handleConfirmRequest = () => {
    setShowRequestDialog(false);
    router.back();
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
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
          <View>
            <Text style={styles.headerTitle}>{partner.name}</Text>
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusDot,
                { backgroundColor: partner.status === 'online' ? '#4CAF50' : '#666' }
              ]} />
              <Text style={styles.statusText}>
                {partner.status === 'online' ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.partnerMessage,
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.partnerBubble,
            ]}>
              <Text style={styles.messageText}>{message.content}</Text>
              <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!newMessage.trim()}
        >
          <Send color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <Dialog
        visible={showRequestDialog}
        title="Send Partnership Request"
        message={`Would you like to send a partnership request to ${partner.name}?`}
        confirmText="Send Request"
        cancelText="Cancel"
        onConfirm={handleConfirmRequest}
        onCancel={() => setShowRequestDialog(false)}
        destructive={false}
      />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  anonymousAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  partnerMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#3A3A8C',
    borderBottomRightRadius: 4,
  },
  partnerBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
  },
  messageTimestamp: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  nonPartnerMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nonPartnerText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addPartnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    gap: 8,
  },
  addPartnerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});