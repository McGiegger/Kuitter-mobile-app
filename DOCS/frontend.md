# Kuitter Frontend Specification Document

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Theme & Visual Identity](#theme--visual-identity)
3. [Screen Flow & Navigation](#screen-flow--navigation)
4. [Onboarding Experience](#onboarding-experience)
5. [Post-Onboarding Educational Journey](#post-onboarding-educational-journey)
6. [Goal Setting Framework](#goal-setting-framework)
7. [Dashboard Design](#dashboard-design)
8. [Feature-Specific UI Elements](#feature-specific-ui-elements)
9. [Animations & Micro-interactions](#animations--micro-interactions)
10. [Accessibility Considerations](#accessibility-considerations)
11. [Responsive Design Guidelines](#responsive-design-guidelines)

---

## Design Philosophy

Kuitter aims to create a premium, supportive digital environment that feels both private and encouraging. The app should convey:

- **Trust & Security**: Users are sharing sensitive information and need to feel secure
- **Progress & Hope**: Visual elements should emphasize growth and positive change
- **Calm & Focus**: The interface should reduce anxiety and promote mindfulness
- **Premium Experience**: High-quality design elements that feel polished and valuable

The UI should balance professionalism with warmth, avoiding clinical sterility while maintaining appropriate seriousness for the subject matter.

---

## Theme & Visual Identity

### Color Palette

#### Premium Theme (Default)
- **Primary**: Deep indigo (#3A3A8C) - Conveys trust, stability, and depth
- **Secondary**: Teal accent (#1D7D81) - Represents growth and renewal
- **Background**: Rich dark gradient from deep blue to near-black (#131836 to #0A0A1A)
- **Surface Elements**: Slightly lighter than background with subtle gradient (#1E2340)
- **Success**: Muted emerald green (#2A9D8F)
- **Warning/Urge**: Amber (#FF8800)
- **Error/Relapse**: Muted crimson (#CF3030)
- **Text**: White (#FFFFFF) and light gray (#E0E0E0)
- **Accent Highlights**: Subtle gold (#D4AF37) for achievements and milestones

#### Light Theme (upon toggle)
- **Primary**: Softer indigo (#4B4BA8)
- **Secondary**: Lighter teal (#26A0A5)
- **Background**: Off-white (#F8F9FC)
- **Surface Elements**: White (#FFFFFF) with subtle shadows
- **Text**: Dark gray (#333333) and medium gray (#666666)
- **Other elements**: Lighter versions of the premium theme colors

### Typography
- **Primary Font**: SF Pro Display / Roboto (depending on platform)
- **Secondary Font**: SF Pro Text / Roboto
- **Headings**: Medium and Semi-Bold weights
- **Body Text**: Regular weight with generous line height for readability
- **Accent Text**: Medium Italic for quotes and affirmations

### Iconography
- **Style**: Outlined with rounded corners, consistent stroke width
- **Animation**: Subtle entrance animations and state changes
- **Badge Icons**: Slightly more detailed, with metallic/dimensional treatment for achievements

### Visual Elements
- **Cards**: Subtle gradient backgrounds with soft shadows
- **Buttons**: Pill-shaped with subtle hover/press states
- **Progress Indicators**: Circular for streak timer, linear for other progress metrics
- **Dividers**: Thin, subtle gradients rather than solid lines
- **Illustrations**: Custom, consistent style showing diverse individuals in recovery journey scenarios

---

## Screen Flow & Navigation

### Primary Navigation
- **Bottom Tab Bar** with 5 main sections:
  1. Dashboard (Home)
  2. Anchor (AI Companion)
  3. Community (Groups)
  4. Profile/Progress
  5. Settings

### Secondary Navigation
- **Nested screens** accessed via cards on primary screens
- **Back button** consistently placed at top left
- **Modal sheets** for quick actions and confirmations
- **Contextual FABs** (Floating Action Buttons) where appropriate

### Screen Transitions
- Smooth, purposeful transitions between screens
- Hierarchy-based animations (parent to child, modal overlays)
- Consistent navigation patterns throughout the app

### Screen Flow Diagram
```
App Launch → Sign Up/Login → Onboarding Quiz → Profile Type Selection
    ↓
Dashboard ←→ AI Companion ←→ Community ←→ Profile/Progress ←→ Settings
    ↓
[After first login] Dashboard → Educational Screens → Goal Setting → Dashboard (updated)
```

---

## Onboarding Experience

### Sign Up / Login (Screen 1)
- Clean, minimalist design with app logo prominently displayed
- Options for email/password and Google authentication
- Privacy assurance message
- Subtle background animation that responds to touch

### Onboarding Quiz (Screens 2-13)
- 12 questions presented one at a time
- Progress indicator showing question number (e.g., "3 of 12")
- Simple, focused UI with large touch targets
- Questions fade in/out during transitions

#### Specific Questions:
1. "How long have you been struggling with pornography use?" (Multiple choice)
2. "How frequently do you currently use pornography?" (Multiple choice)
3. "What time of day do you typically experience the strongest urges?" (Multiple choice)
4. "What emotions typically trigger your pornography use?" (Multiple select)
5. "What activities help you resist urges?" (Multiple select)
6. "Have you tried other methods to reduce pornography use?" (Multiple select)
7. "Do you have someone you can talk to about this struggle?" (Yes/No)
8. "What's your primary motivation for reducing pornography use?" (Multiple choice)
9. "How does pornography use affect your life?" (Multiple select)
10. "How comfortable are you with group support?" (Slider)
11. "Would you prefer an accountability partner?" (Yes/No/Maybe)
12. "What's your goal for using this app?" (Multiple choice)

### Profile Type Selection (Screen 14)
- Two clear options with visual representations:
  - **Anonymous**: Avatar silhouette with privacy indicators
  - **Public**: Profile representation with community indicators
- Explanation of each option and privacy implications
- Option to change this setting later (noted on screen)

---

## Post-Onboarding Educational Journey

### Educational Screens (First Dashboard Visit)
- Series of 5 swipeable cards that appear after first login to dashboard
- Each card focuses on one negative effect of pornography
- Progress dots at bottom of screen
- "Skip All" option in corner for users who prefer to bypass

#### Educational Screen Content:
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

5. **Recovery Potential**
   - Icon: Plant growing from seed
   - Animation: Growth from seed to sprout
   - Heading: "Your Brain Can Heal"
   - Brief explanation of neuroplasticity and recovery

---

## Goal Setting Framework

### Goal Setting Screens (After Educational Journey)
- Follows immediately after educational screens
- Clean, focused interface with clear instructions
- Progress indicator at top

#### Goal Selection Screen
- Heading: "Set Your Recovery Goals"
- Subheading: "Select what you hope to achieve (select all that apply)"
- Checkbox list of potential goals:
  - "Improve my relationships"
  - "Increase my productivity"
  - "Reduce anxiety/shame"
  - "Regain control of my time"
  - "Improve my self-image"
  - "Align with my personal values"
  - "Enhance my focus and concentration"
  - "Other" (with optional text input)

#### Timeline Commitment Screen
- Heading: "Your Recovery Timeline"
- Interactive slider to select commitment period (7, 30, 90, 180, 365 days)
- Dynamic text: "I commit to my recovery journey for [X] days"
- Visual calendar representation that adjusts with slider

#### Assurance Screen
- Heading: "You Will Overcome This"
- Dynamic text: "You will be porn-free in [X] days"
- Motivational message about the journey
- Prominent "Begin My Journey" button
- Subtle animation of progress/growth visual

---

## Dashboard Design

### Main Dashboard Layout
- **Clean Streak Timer**: Prominent circular widget at top
  - Current streak in days/hours
  - Longest streak record
  - Visual ring showing progress toward next milestone
  - Subtle animation celebrating milestones

- **Daily Check-In Card**: Prominent card below streak timer
  - Quick mood selection (emoji-based)
  - "Did you experience urges today?" toggle
  - Expandable for journal entry

- **Goals Section**: Visual representation of selected goals
  - Progress indicators for each goal
  - Estimated completion dates
  - Quick access to modify goals

- **Quick Actions**: Row of circular icons for common actions
  - Chat with Anchor
  - Log urge/trigger
  - Breathing exercise
  - Distraction tool

- **Community Highlights**: Condensed view of group activity
  - Recent posts count
  - New members
  - Daily prompt preview

- **Partner Status**: If partnered, shows partner's streak and status

- **Achievements**: Recent or upcoming badges/milestones

### Dashboard States
- **First-Time State**: Simplified with guidance overlays
- **Regular State**: Full featured as described above
- **Urge State**: Detected based on usage patterns, emphasizes support tools
- **Milestone State**: Celebration animations when reaching streak milestones

---

## Feature-Specific UI Elements

### AI Companion (Anchor) Interface
- **Chat Interface**: Modern, clean messaging UI
- **Conversation Starters**: Suggested topics/questions
- **Mood Context**: Visual indicator of user's last logged mood
- **Support Tools**: Quick access to grounding exercises
- **Visual Identity**: Subtle avatar/identity for Anchor (abstract, not human)

### Group Support Screens
- **Group Selection**: Card-based browsing with group descriptions
- **Group Chat**: Thread-based discussions with reactions
- **Daily Prompts**: Highlighted differently from regular posts
- **Member Profiles**: Anonymous or public based on user settings
- **Activity Feed**: Chronological or algorithmic sorting options

### Accountability Partner Features
- **Partner Matching**: Card-based profile browsing
- **Partner Dashboard**: Dual streak display
- **Chat Interface**: Private messaging with streak context
- **Notification Settings**: Customizable alert preferences
- **Encouragement Tools**: Quick positive reinforcement options

### Badges & Achievements
- **Badge Display**: Gallery view with locked/unlocked states
- **Achievement Popups**: Celebratory animations when earned
- **Progress Trackers**: Visual indicators for upcoming achievements
- **Sharing Options**: Configurable based on privacy settings

### Leaderboard (Opt-In)
- **Weekly Leaders**: Card-based display with streak info
- **Your Position**: Highlighted entry for the user
- **Privacy Controls**: Clear indicators of what information is visible
- **Filter Options**: By group, time period, or connection

---

## Animations & Micro-interactions

### Key Animation Moments
- **Streak Milestones**: Celebration animations at 1, 7, 30, 90, 180, 365 days
- **Badge Unlocks**: Reveal animations with sound (if enabled)
- **Daily Check-In**: Subtle feedback animations
- **Mood Selection**: Emoji reactions to selection
- **Button Presses**: Tactile feedback animations
- **Screen Transitions**: Purposeful, direction-based transitions

### Micro-interactions
- **Pull-to-refresh**: Custom animation aligned with app theme
- **Toggle Switches**: Smooth state transitions
- **Text Fields**: Dynamic label animations
- **List Items**: Subtle entrance animations
- **Notifications**: Non-intrusive entrance and exit
- **Loading States**: Branded, meaningful loading animations

### Critical Moments
- **Relapse Reporting**: Supportive, non-judgmental animations
- **Achievement Unlocking**: Rewarding, celebratory animations
- **Partner Matching**: Positive connection animation
- **Urge Reporting**: Calming visual feedback

---

## Accessibility Considerations

### Visual Accessibility
- **Color Contrast**: WCAG AA compliance minimum
- **Text Sizing**: Supports dynamic text sizing
- **Screen Reader Support**: Comprehensive VoiceOver/TalkBack compatibility
- **Reduced Motion Option**: Alternative to animations

### Interaction Accessibility
- **Touch Targets**: Minimum 44×44pt for all interactive elements
- **Keyboard Navigation**: Full support for external keyboards
- **Voice Control**: Compatible with OS voice control features
- **Haptic Feedback**: Consistent haptic patterns

---

## Responsive Design Guidelines

### Device Support
- **Phone Sizes**: Optimized for devices 4.7" to 6.7"
- **Tablet Adaptation**: Redesigned layouts for iPad/tablet experiences
- **Orientation Support**: Both portrait and landscape orientations
- **Split View**: Supports iPad multitasking

### Adaptive Layouts
- **Component Scaling**: Fluid sizing based on screen dimensions
- **Content Prioritization**: Adjusts visible elements based on available space
- **Typography Scaling**: Maintains readability across device sizes
- **Touch Target Adaptation**: Ensures minimum touch target sizes maintained