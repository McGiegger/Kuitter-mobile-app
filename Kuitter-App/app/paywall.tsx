import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { usePaywall } from '@/hooks/usePaywall';

const features = [
  {
    icon: 'bulb' as const,
    title: "Advanced Recovery Tools",
    description: "Access our complete suite of recovery techniques and exercises",
  },
  {
    icon: 'shield' as const,
    title: "Unlimited Partner Support",
    description: "Connect with multiple accountability partners for maximum support",
  },
  {
    icon: 'heart' as const,
    title: "Premium Community Access",
    description: "Join exclusive groups and get priority community support",
  },
  {
    icon: 'sparkles' as const,
    title: "Personalized Journey",
    description: "Get tailored recommendations based on your progress",
  },
];

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: 'month',
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$79.99',
    period: 'year',
    popular: true,
    savings: 'Save 33%',
  },
];

export default function PaywallScreen() {
  const { activateSubscription } = usePaywall();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const shineAnim = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(
          withSequence(
            withDelay(
              1000,
              withSpring(-150)
            ),
            withSpring(150)
          ),
          -1,
          true
        ),
      },
    ],
    opacity: 0.5,
  }));

  const scaleAnim = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withSpring(1.05),
            withSpring(1)
          ),
          -1,
          true
        ),
      },
    ],
  }));

  // Simulate payment processing
  const handleSubscribe = async () => {
    // In a real app, this would process payment
    await new Promise(resolve => setTimeout(resolve, 1500));
    activateSubscription();
  };

  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="lock-closed" color="#D4AF37" size={20} />
          <Text style={styles.title}>Unlock Your Full Potential</Text>
          <Text style={styles.subtitle}>
            Your trial has ended. Continue your journey with premium access.
          </Text>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name={feature.icon} color="#D4AF37" size={24} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Ionicons name="checkmark" color="#4CAF50" size={16} />
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlan,
                plan.popular && styles.popularPlan,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <>
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Most Popular</Text>
                  </View>
                  <Animated.View style={[styles.shine, shineAnim]} />
                </>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>/{plan.period}</Text>
              </View>
              {plan.savings && (
                <Text style={styles.savings}>{plan.savings}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.guaranteeContainer}>
          <Ionicons name="shield" color="#D4AF37" size={40} />
          <Text style={styles.guaranteeText}>
            30-day money-back guarantee. No questions asked.
          </Text>
        </View>
      </ScrollView>

      <Animated.View style={[styles.footer, scaleAnim]}>
        <TouchableOpacity 
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>
            Start Premium Now
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Cancel anytime. Billed {selectedPlan === 'yearly' ? 'annually' : 'monthly'}.
        </Text>
      </Animated.View>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    maxWidth: '80%',
  },
  features: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  plans: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectedPlan: {
    backgroundColor: 'rgba(58, 58, 140, 0.3)',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  popularPlan: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: -32,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 40,
    paddingVertical: 4,
    transform: [{ rotate: '45deg' }],
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-20deg' }],
  },
  planName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  period: {
    color: '#E0E0E0',
    fontSize: 16,
    marginLeft: 4,
  },
  savings: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  guaranteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 20,
    marginBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  guaranteeText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'rgba(19, 24, 54, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  subscribeButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});