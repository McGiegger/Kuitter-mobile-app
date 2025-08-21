import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Comments, { Comment } from '@/components/Comments';

type Message = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  reactions: {
    likes: number;
    hasLiked: boolean;
  };
  comments: Comment[];
  isCurrentUser?: boolean;
};

const messages: Message[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'John D.',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    },
    content: "Just wanted to share that I've been feeling much stronger lately. The support from this group has been incredible.",
    timestamp: '2h ago',
    reactions: {
      likes: 5,
      hasLiked: false,
    },
    comments: [
      {
        id: '1',
        author: {
          name: 'Sarah M.',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        },
        content: "That's wonderful to hear! Keep going strong! 💪",
        timestamp: '1h ago',
      }
    ],
    isCurrentUser: false,
  },
  {
    id: '2',
    author: {
      id: '2',
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    },
    content: "That's amazing! Keep going strong. We're all in this together. 💪",
    timestamp: '1h ago',
    reactions: {
      likes: 3,
      hasLiked: true,
    },
    comments: [],
    isCurrentUser: false,
  },
  {
    id: '3',
    author: {
      id: 'current-user',
      name: 'Me',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
    },
    content: "Thank you all for the support! It means a lot to have such an amazing community. 🙏",
    timestamp: 'Just now',
    reactions: {
      likes: 1,
      hasLiked: false,
    },
    comments: [],
    isCurrentUser: true,
  },
];

export default function GroupChatScreen() {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const [showComments, setShowComments] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      content: newMessage,
      timestamp: 'Just now',
      reactions: {
        likes: 0,
        hasLiked: false,
      },
      comments: [],
      isCurrentUser: true,
    };

    setLocalMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const toggleLike = (messageId: string) => {
    setLocalMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const hasLiked = !msg.reactions.hasLiked;
        return {
          ...msg,
          reactions: {
            likes: hasLiked ? msg.reactions.likes + 1 : msg.reactions.likes - 1,
            hasLiked,
          },
        };
      }
      return msg;
    }));
  };

  const handleShowComments = (message: Message) => {
    setSelectedMessage(message);
    setShowComments(true);
  };

  const handleAddComment = (content: string) => {
    if (!selectedMessage) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      content,
      timestamp: 'Just now',
      isCurrentUser: true,
    };

    setLocalMessages(prev => prev.map(msg => {
      if (msg.id === selectedMessage.id) {
        return {
          ...msg,
          comments: [...msg.comments, newComment],
        };
      }
      return msg;
    }));
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Newcomers Circle</Text>
        <Text style={styles.headerSubtitle}>128 members</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {localMessages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.isCurrentUser && styles.userMessageContainer
            ]}
          >
            <Image
              source={{ uri: message.author.avatar }}
              style={styles.avatar}
            />
            <View style={[
              styles.messageContent,
              message.isCurrentUser && styles.userMessageContent
            ]}>
              <View style={styles.messageHeader}>
                <Text style={styles.authorName}>
                  {message.author.name}
                  {message.isCurrentUser && (
                    <Text style={styles.youBadge}> (You)</Text>
                  )}
                </Text>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
              </View>
              <Text style={styles.messageText}>{message.content}</Text>
              <View style={styles.messageActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleLike(message.id)}
                >
                  <Ionicons 
                    name={message.reactions.hasLiked ? 'heart' : 'heart-outline'} 
                    size={16} 
                    color={message.reactions.hasLiked ? '#D4AF37' : '#E0E0E0'}
                  />
                  <Text style={styles.actionText}>{message.reactions.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleShowComments(message)}
                >
                  <Ionicons name="chatbubble-outline" size={16} color="#E0E0E0" />
                  <Text style={styles.actionText}>{message.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={16} color="#E0E0E0" />
                </TouchableOpacity>
              </View>
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
          <Ionicons name="send" color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <Comments
        isVisible={showComments}
        onClose={() => {
          setShowComments(false);
          setSelectedMessage(null);
        }}
        comments={selectedMessage?.comments || []}
        onAddComment={handleAddComment}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  userMessageContainer: {
    backgroundColor: 'rgba(58, 58, 140, 0.2)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  userMessageContent: {
    borderLeftWidth: 2,
    borderLeftColor: '#D4AF37',
    paddingLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  youBadge: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'normal',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#E0E0E0',
    fontSize: 12,
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
});