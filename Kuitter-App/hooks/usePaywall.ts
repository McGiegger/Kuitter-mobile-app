import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const TRIAL_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
const TRIAL_START_KEY = 'trial_start_date';
const SUBSCRIPTION_KEY = 'subscription_status';

export type SubscriptionStatus = 'trial' | 'expired' | 'active';

export function usePaywall() {
  const [status, setStatus] = useState<SubscriptionStatus>('trial');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const subscriptionStatus = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
      
      if (subscriptionStatus === 'active') {
        setStatus('active');
        setLoading(false);
        return;
      }

      const trialStart = await AsyncStorage.getItem(TRIAL_START_KEY);
      
      if (!trialStart) {
        // First time user, start trial
        const now = Date.now();
        await AsyncStorage.setItem(TRIAL_START_KEY, now.toString());
        setStatus('trial');
        setTimeRemaining(TRIAL_DURATION);
      } else {
        const startDate = parseInt(trialStart);
        const elapsed = Date.now() - startDate;
        
        if (elapsed >= TRIAL_DURATION) {
          setStatus('expired');
          router.replace('/paywall');
        } else {
          setStatus('trial');
          setTimeRemaining(TRIAL_DURATION - elapsed);
        }
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  const activateSubscription = async () => {
    try {
      await AsyncStorage.setItem(SUBSCRIPTION_KEY, 'active');
      setStatus('active');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error activating subscription:', error);
    }
  };

  return {
    status,
    timeRemaining,
    loading,
    activateSubscription,
  };
}