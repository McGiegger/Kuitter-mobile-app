# Kuitter Educational Journey

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the post-onboarding educational journey that introduces users to the effects of pornography and helps them set recovery goals.

## Educational Screens (First Dashboard Visit)
- Series of 5 full-screen educational pages that appear automatically after 3 seconds of first dashboard visit
- Each screen focuses on one negative effect of pornography
- Progress dots at bottom of screen
- Users must complete all educational screens to proceed (no skip option)
- Navigation between screens via swipe gesture or "Next" button

### Technical Implementation Note
- Use React Native's AsyncStorage (not localStorage) to track first-time visit
- Implement a 3-second timer using setTimeout in the Dashboard component's useEffect hook
- Navigate to educational screens using React Navigation's navigation.navigate
- Set a firstVisitComplete flag in AsyncStorage after completion

### Educational Screen Content:
1. **Neurological Effects**
   - Icon: Brain with highlighted reward pathway
   - Animation: Subtle pulse showing dopamine release
   - Heading: "Rewires Your Brain"
   - Brief explanation of dopamine and reward circuitry effects

2. **Relationship Impact**
   - Icon: Two silhouettes with a barrier between
   - Animation: Barrier slowly growing
   - Heading: "Affects Real Connections"
   - Brief explanation of intimacy and relationship effects

3. **Productivity & Focus**
   - Icon: Task list with items fading
   - Animation: Items becoming transparent
   - Heading: "Drains Your Energy"
   - Brief explanation of motivation and focus impacts

4. **Self-Image Effects**
   - Icon: Mirror reflection with distortion
   - Animation: Subtle wave distortion effect
   - Heading: "Distorts Perceptions"
   - Brief explanation of self-image and confidence impacts

5. **Recovery Possibility**
   - Icon: Sprouting plant/growth symbol
   - Animation: Plant growing from seed to bloom
   - Heading: "Recovery Is Possible"
   - Brief explanation of neuroplasticity and healing

## Goal Setting Framework
- Appears immediately after educational screens
- Full-screen interface with clear, focused layout
- Users must set at least one goal to proceed to dashboard
- Cannot be skipped or bypassed

### Goal Setting Screen Elements
- **Header**: "Set Your Recovery Goals"
- **Instruction Text**: "Select the goals that matter most to you"
- **Goal Selection**: Checkbox list with the following options:
  1. Improve relationships
  2. Increase productivity
  3. Enhance mental clarity
  4. Boost self-confidence
  5. Reclaim time
  6. Improve sleep quality
  7. Reduce anxiety
  8. Develop healthier habits

### Timeline Commitment Screen
- Follows goal selection
- **Header**: "Your Recovery Timeline"
- **Slider**: Select commitment period (30/60/90 days)
- **Visualization**: Calendar view showing commitment period
- **Affirmation Text**: "You will quit porn in [X] days"

### Completion & Dashboard Return
- Final screen with confirmation of goals and timeline
- **Header**: "You're All Set!"
- **Summary**: Selected goals and timeline displayed
- **Button**: "Begin Your Journey" (returns to dashboard)
- Dashboard will be updated with selected goals and clean streak timer
