import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, G } from 'react-native-svg';

const SequentialTypeWriter = () => {
  const [text, setText] = useState({
    title: '',
    subtitle: '',
  });
  const title = "Kuitter";
  const subtitle = "Your Quitting Journey Starts Now!";

  useEffect(() => {
    let currentTitleIndex = 0;
    let currentSubtitleIndex = 0;
    let titleInterval: NodeJS.Timeout;
    let subtitleInterval: NodeJS.Timeout;
    let subtitleStarted = false;

    const typeTitleChar = () => {
      if (currentTitleIndex < title.length) {
        setText(prev => ({
          ...prev,
          title: title.slice(0, currentTitleIndex + 1),
        }));
        currentTitleIndex++;
      } else if (!subtitleStarted) {
        subtitleStarted = true;
        // Start subtitle after a brief pause
        setTimeout(() => {
          subtitleInterval = setInterval(typeSubtitleChar, 50);
        }, 500);
        clearInterval(titleInterval);
      }
    };

    const typeSubtitleChar = () => {
      if (currentSubtitleIndex < subtitle.length) {
        setText(prev => ({
          ...prev,
          subtitle: subtitle.slice(0, currentSubtitleIndex + 1),
        }));
        currentSubtitleIndex++;
      } else {
        clearInterval(subtitleInterval);
      }
    };

    // Start with the title
    titleInterval = setInterval(typeTitleChar, 200);

    return () => {
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{text.title}</Text>
      <Text style={styles.subtitle}>{text.subtitle}</Text>
    </View>
  );
};

const ChainBreakAnimation = () => {
  const rotateAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0);

  const startAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      rotateAnim.setValue(0);
      scaleAnim.setValue(1);
      setTimeout(startAnimation, 10000);
    });
  }, [rotateAnim, scaleAnim, opacityAnim]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.chainContainer,
        {
          transform: [
            { rotate: spin },
            { scale: scaleAnim },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      <Svg width="100" height="100" viewBox="0 0 24 24" fill="none">
        <G>
          <Path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12 22V12M12 12L2 7M12 12L22 7"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M8 5L16 9"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </Animated.View>
  );
};

export default function AuthScreen() {
  return (
    <LinearGradient
      colors={['#131836', '#0A0A1A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <SequentialTypeWriter />

        <ChainBreakAnimation />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/auth')}
          >
            <Ionicons name="mail" color="#FFFFFF" size={24} />
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <View style={styles.googleLogoContainer}>
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <Path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <Path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <Path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </Svg>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.privacyText}>
          Your privacy is our top priority. All data is encrypted and anonymous.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#E0E0E0',
    textAlign: 'center',
    letterSpacing: 1,
  },
  chainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3A8C',
    padding: 16,
    borderRadius: 25,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  googleLogoContainer: {
    width: 24,
    height: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  googleButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  privacyText: {
    color: '#E0E0E0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 280,
    alignSelf: 'center',
  },
});