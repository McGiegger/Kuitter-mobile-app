import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Send } from 'lucide-react-native';

const MAX_COMMENT_LENGTH = 500; // Set maximum character limit for comments

export type Comment = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
};

type CommentsProps = {
  isVisible: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (content: string) => void;
};

export default function Comments({ isVisible, onClose, comments, onAddComment }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    
    const tempComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      },
      content: newComment,
      timestamp: 'Just now',
      isCurrentUser: true,
    };

    setLocalComments(prev => [...prev, tempComment]);
    onAddComment(newComment);
    setNewComment('');
  };

  const remainingCharacters = MAX_COMMENT_LENGTH - newComment.length;
  const isNearLimit = remainingCharacters <= 50;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Comments</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.commentsList}>
            {localComments.map((comment) => (
              <View 
                key={comment.id} 
                style={[
                  styles.commentItem,
                  comment.isCurrentUser && styles.userComment
                ]}
              >
                <Image
                  source={{ uri: comment.author.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.authorName}>
                      {comment.author.name}
                      {comment.isCurrentUser && (
                        <Text style={styles.youBadge}> (You)</Text>
                      )}
                    </Text>
                    <Text style={styles.timestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Add a comment..."
                placeholderTextColor="#666"
                multiline
                maxLength={MAX_COMMENT_LENGTH}
              />
              <Text style={[
                styles.characterCount,
                isNearLimit && styles.characterCountWarning
              ]}>
                {remainingCharacters}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
              onPress={handleSubmit}
              disabled={!newComment.trim()}
            >
              <Send color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    backgroundColor: '#131836',
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    padding: 20,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userComment: {
    backgroundColor: 'rgba(58, 58, 140, 0.2)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  youBadge: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'normal',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  commentText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
  },
  characterCount: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  characterCountWarning: {
    color: '#FF3B30',
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