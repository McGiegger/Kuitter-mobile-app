import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CreatePost from '@/components/CreatePost';
import Comments, { Comment } from '@/components/Comments';
import Dialog from '@/components/Dialog';

type Post = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isCurrentUser?: boolean;
  hasLiked?: boolean;
};

type Group = {
  id: string;
  name: string;
  members: number;
  image: string;
  unreadUpdates: number;
};

type Partner = {
  id: string;
  name: string;
  avatar?: string;
  isAnonymous: boolean;
  streak: number;
  status: 'online' | 'offline';
  lastActive?: string;
  partnerCount: number;
  isPartner: boolean;
};

const partners: Partner[] = [
  {
    id: '1',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
    isAnonymous: false,
    streak: 15,
    status: 'online' as const,
    partnerCount: 3,
    isPartner: true
  },
  {
    id: '2',
    name: 'Anonymous Warrior',
    isAnonymous: true,
    streak: 30,
    status: 'offline' as const,
    lastActive: '2h ago',
    partnerCount: 1,
    isPartner: false
  },
];

const groups = [
  {
    id: '1',
    name: 'Newcomers Circle',
    members: 128,
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=80&h=80&fit=crop',
    unreadUpdates: 3,
  },
  {
    id: '2',
    name: 'Daily Motivation',
    members: 64,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=80&h=80&fit=crop',
    unreadUpdates: 0,
  },
];

export default function CommunityScreen() {
  const [localPartners, setLocalPartners] = useState(partners);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'partners'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Anonymous',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      content: "Just completed my first week! It's been challenging but worth it. The urges are there but I'm staying strong. 💪",
      likes: 24,
      comments: [
        {
          id: '1',
          author: {
            name: 'RecoveryWarrior',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
          },
          content: 'Amazing progress! Keep going strong! 💪',
          timestamp: '1h ago',
        }
      ],
      timestamp: '2h ago',
      isCurrentUser: true,
      hasLiked: false,
    },
    {
      id: '2',
      author: 'RecoveryWarrior',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
      content: "Remember: Your past mistakes don't define your future. Each day is a new opportunity to make better choices.",
      likes: 45,
      comments: [],
      timestamp: '4h ago',
      isCurrentUser: false,
      hasLiked: true,
    },
  ]);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Anonymous',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      content,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      isCurrentUser: true,
      hasLiked: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = !post.hasLiked;
        return {
          ...post,
          likes: hasLiked ? post.likes + 1 : post.likes - 1,
          hasLiked,
        };
      }
      return post;
    }));
  };

  const handleShowComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleAddComment = (content: string) => {
    if (!selectedPost) return;

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

    setPosts(prev => prev.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
  };

  const handleGroupChat = (groupId: string) => {
    router.push(`/group-chat/${groupId}`);
  };

  const handleAddPartner = (partnerId: string) => {
    const currentPartnerCount = localPartners.filter(p => p.isPartner).length;
    const MAX_PARTNERS = 5;

    if (currentPartnerCount >= MAX_PARTNERS) {
      setShowLimitDialog(true);
      return;
    }

    setLocalPartners(prev => prev.map(partner => 
      partner.id === partnerId 
        ? { ...partner, isPartner: true }
        : partner
    ));
  };

  const handleRemovePartner = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
    setShowRemoveDialog(true);
  };

  const confirmRemovePartner = () => {
    if (selectedPartnerId) {
      setLocalPartners(prev => prev.map(partner => 
        partner.id === selectedPartnerId 
          ? { ...partner, isPartner: false }
          : partner
      ));
    }
    setShowRemoveDialog(false);
    setSelectedPartnerId(null);
  };

  const handlePartnerCardPress = (partner: Partner) => {
    if (partner.isPartner) {
      // Use absolute path for navigation
      router.push(`/(chat)/partner-chat/${partner.id}`);
    } else {
      // Show partnership request dialog
      setSelectedPartnerId(partner.id);
      setShowRequestDialog(true);
    }
  };

  const filteredPartners = localPartners.filter(partner => 
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSubtitle}>Connect and Share Your Journey</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
            onPress={() => setActiveTab('feed')}
          >
            <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
              Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
            onPress={() => setActiveTab('groups')}
          >
            <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
              Groups
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'partners' && styles.activeTab]}
            onPress={() => setActiveTab('partners')}
          >
            <Text style={[styles.tabText, activeTab === 'partners' && styles.activeTabText]}>
              Partners
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'partners' && (
          <View style={styles.partners}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" color="#E0E0E0" size={20} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search partners by username..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            {filteredPartners.map((partner) => (
              <TouchableOpacity 
                key={partner.id} 
                style={styles.partnerCard}
                onPress={() => handlePartnerCardPress(partner)}
              >
                {partner.isAnonymous ? (
                  <View style={styles.anonymousAvatar}>
                    <Ionicons name="person-circle" size={40} color="#D4AF37" />
                  </View>
                ) : (
                  <Image
                    source={{ uri: partner.avatar }}
                    style={styles.partnerAvatar}
                  />
                )}
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>{partner.name}</Text>
                  <Text style={styles.partnerStreak}>{partner.streak} day streak</Text>
                  <View style={styles.partnerStatus}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: partner.status === 'online' ? '#4CAF50' : '#666' }
                    ]} />
                    <Text style={styles.statusText}>
                      {partner.status === 'online' ? 'Online' : `Last seen ${partner.lastActive}`}
                    </Text>
                  </View>
                  <Text style={styles.partnerCount}>
                    {partner.partnerCount} {partner.partnerCount === 1 ? 'partner' : 'partners'}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[
                    styles.actionButton,
                    partner.isPartner ? styles.removeButton : styles.addButton
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    partner.isPartner 
                      ? handleRemovePartner(partner.id)
                      : handleAddPartner(partner.id);
                  }}
                >
                  {partner.isPartner ? (
                    <Ionicons name="person-remove" color="#FFFFFF" size={20} />
                  ) : (
                    <Ionicons name="person-add" color="#FFFFFF" size={20} />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'feed' && (
          <View style={styles.feed}>
            {posts.map((post) => (
              <View 
                key={post.id} 
                style={[
                  styles.post,
                  post.isCurrentUser && styles.userPost
                ]}
              >
                <View style={styles.postHeader}>
                  <Image
                    source={{ uri: post.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>
                      {post.author}
                      {post.isCurrentUser && (
                        <Text style={styles.youBadge}> (You)</Text>
                      )}
                    </Text>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                <View style={styles.postActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleLike(post.id)}
                  >
                    <Ionicons 
                      name={post.hasLiked ? 'heart' : 'heart-outline'} 
                      size={20} 
                      color={post.hasLiked ? '#D4AF37' : '#E0E0E0'}
                    />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleShowComments(post)}
                  >
                    <Ionicons name="chatbubble-outline" size={20} color="#E0E0E0" />
                    <Text style={styles.actionText}>{post.comments.length}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'groups' && (
          <View style={styles.groups}>
            {groups.map((group) => (
              <TouchableOpacity 
                key={group.id} 
                style={styles.groupCard}
                onPress={() => handleGroupChat(group.id)}
              >
                <Image
                  source={{ uri: group.image }}
                  style={styles.groupImage}
                />
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <View style={styles.groupMeta}>
                    <Ionicons name="people" size={16} color="#E0E0E0" />
                    <Text style={styles.groupMembers}>{group.members} members</Text>
                  </View>
                </View>
                {group.unreadUpdates > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{group.unreadUpdates}</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {activeTab === 'feed' && (
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreatePost(true)}
        >
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      )}

      <CreatePost
        isVisible={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onPost={handleCreatePost}
      />

      <Comments
        isVisible={showComments}
        onClose={() => {
          setShowComments(false);
          setSelectedPost(null);
        }}
        comments={selectedPost?.comments || []}
        onAddComment={handleAddComment}
      />

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

      <Dialog
        visible={showLimitDialog}
        title="Partner Limit Reached"
        message="You can have a maximum of 5 accountability partners. Please remove an existing partner before adding a new one."
        confirmText="OK"
        onConfirm={() => setShowLimitDialog(false)}
        onCancel={() => setShowLimitDialog(false)}
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  tabText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  activeTabText: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  feed: {
    padding: 20,
  },
  post: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  userPost: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  youBadge: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'normal',
  },
  timestamp: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  groups: {
    padding: 20,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupMembers: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#3A3A8C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  partners: {
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
  partnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  anonymousAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  partnerStreak: {
    color: '#D4AF37',
    fontSize: 14,
    marginBottom: 4,
  },
  partnerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
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
  chatButton: {
    backgroundColor: '#3A3A8C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    margin: 20,
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
  },
  partnerCount: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#D4AF37',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  removeButton: {
    backgroundColor: '#CF3030',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});