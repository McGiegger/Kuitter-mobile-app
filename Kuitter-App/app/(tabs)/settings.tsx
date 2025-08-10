import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Lock, 
  CircleUser as UserCircle, 
  Shield, 
  Moon, 
  Trash2, 
  ChevronRight, 
  LogOut,
  Sun,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Dialog from '@/components/Dialog';
import { useTheme, themes } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const colors = themes[theme].colors;

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    setShowDeleteDialog(false);
    router.replace('/');
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = async () => {
    try {
      // Clear all app data
      await AsyncStorage.clear();
      // Navigate to auth screen
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setShowLogoutDialog(false);
    }
  };

  const handlePrivacySettings = () => {
    // Pass a parameter to indicate this is from settings
    router.push({
      pathname: '/(auth)/visibility',
      params: { fromSettings: 'true' }
    });
  };

  return (
    <LinearGradient
      colors={colors.background}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Manage your preferences</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <TouchableOpacity 
              style={styles.option}
              onPress={() => router.push('/(settings)/profile')}
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceActive }]}>
                <UserCircle color={colors.primary} size={24} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>Profile Information</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>Manage your personal details</Text>
              </View>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option}
              onPress={() => router.push('/(settings)/security')}
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceActive }]}>
                <Lock color={colors.primary} size={24} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>Security</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>Password and authentication</Text>
              </View>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.option}>
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceActive }]}>
                <Bell color={colors.primary} size={24} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>Notifications</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                  Manage alerts and reminders
                </Text>
              </View>
              <Switch 
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: colors.surfaceActive }}
                thumbColor={notifications ? colors.primary : '#f4f3f4'}
              />
            </View>

            <View style={styles.option}>
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceActive }]}>
                {isDark ? (
                  <Sun color={colors.primary} size={24} />
                ) : (
                  <Moon color={colors.primary} size={24} />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                  Toggle app theme
                </Text>
              </View>
              <Switch 
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: colors.surfaceActive }}
                thumbColor={isDark ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <TouchableOpacity 
              style={styles.option}
              onPress={handlePrivacySettings}
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceActive }]}>
                <Shield color={colors.primary} size={24} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>Privacy Settings</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>Control your data and visibility</Text>
              </View>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.option, styles.dangerOption]}
              onPress={handleDeleteAccount}
            >
              <View style={[styles.optionIcon, { backgroundColor: 'rgba(207, 48, 48, 0.1)' }]}>
                <Trash2 color="#CF3030" size={24} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, styles.dangerText]}>Delete Account</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>Permanently remove your data</Text>
              </View>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut color="#FFFFFF" size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Dialog
        visible={showDeleteDialog}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
        confirmText="Delete Account"
        cancelText="Cancel"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
        destructive={true}
      />

      <Dialog
        visible={showLogoutDialog}
        title="Log Out"
        message="Are you sure you want to log out of your account?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutDialog(false)}
        destructive={false}
      />
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
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  dangerOption: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#CF3030',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 40,
    padding: 16,
    backgroundColor: '#CF3030',
    borderRadius: 25,
    gap: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});