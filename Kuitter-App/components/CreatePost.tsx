import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAX_POST_LENGTH = 2000; // Set maximum character limit for posts

type CreatePostProps = {
  isVisible: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
};

export default function CreatePost({ isVisible, onClose, onPost }: CreatePostProps) {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    
    // Remove any URLs from the content
    const sanitizedContent = content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    onPost(sanitizedContent);
    setContent('');
    onClose();
  };

  const remainingCharacters = MAX_POST_LENGTH - content.length;
  const isNearLimit = remainingCharacters <= 100;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Post</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Share your thoughts with the community..."
              placeholderTextColor="#666"
              value={content}
              onChangeText={setContent}
              maxLength={MAX_POST_LENGTH}
              textAlignVertical="top"
            />
            <Text style={[
              styles.characterCount,
              isNearLimit && styles.characterCountWarning
            ]}>
              {remainingCharacters} characters remaining
            </Text>
            <Text style={styles.note}>
              Note: Links are not allowed in posts to maintain community safety
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.postButton,
                !content.trim() && styles.postButtonDisabled,
              ]}
              onPress={handlePost}
              disabled={!content.trim()}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  postContainer: {
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
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    minHeight: 150,
  },
  characterCount: {
    color: '#E0E0E0',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
  },
  characterCountWarning: {
    color: '#FF3B30',
  },
  note: {
    color: '#E0E0E0',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  postButton: {
    backgroundColor: '#D4AF37',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});