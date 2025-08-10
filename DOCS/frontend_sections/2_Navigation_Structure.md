# Kuitter Navigation Structure

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native (with TypeScript)
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the navigation structure and screen flow for the Kuitter app.

## Primary Navigation
- **Bottom Tab Bar** with 5 main sections:
  1. Dashboard (Home)
  2. Anchor (AI Companion)
  3. Community (Groups)
  4. Profile/Progress
  5. Settings

## Secondary Navigation
- **Nested screens** accessed via cards on primary screens
- **Back button** consistently placed at top left
- **Modal sheets** for quick actions and confirmations
- **Contextual FABs** (Floating Action Buttons) where appropriate

## Screen Transitions
- Smooth, purposeful transitions between screens
- Hierarchy-based animations (parent to child, modal overlays)
- Consistent navigation patterns throughout the app

## Screen Flow Diagram
```
App Launch → Sign Up/Login → Onboarding Quiz → Profile Type Selection
    ↓
Dashboard (First Visit) → [Auto-launch after 3s] → Educational Screens (5) → Goal Setting → Timeline Commitment → Dashboard (Updated)
    ↓
Dashboard ←→ AI Companion ←→ Community ←→ Profile/Progress ←→ Settings
```

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
