# Kuitter Dashboard Design

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the dashboard design for the Kuitter app, which serves as the main hub for user interaction.

## Main Dashboard Layout
- **Clean Streak Timer**: Prominent circular widget at top
  - Current streak in days/hours
  - Longest streak record
  - Visual ring showing progress toward next milestone
  - Subtle animation celebrating milestones

- **Daily Check-In Card**: Prominent card below streak timer
  - Quick mood selection (emoji-based)
  - "Did you experience urges today?" with Yes/No toggle (default: No)
  - "Open Journal" button

### Daily Check-In Interactions
- **Mood Selection**: 
  - User must select one of five mood emojis to enable the "Open Journal" button
  - Selected mood gets highlighted with a gold ring
  - If no mood is selected, the "Open Journal" button remains disabled

- **Urge Toggle**:
  - Simple Yes/No toggle (default position: No)
  - When toggled to "Yes", immediately triggers the Panic Screen
  - Not required to open journal
  - Selection is saved and carried over to journal screen if opened

## Panic Screen
- **Trigger**: Automatically appears when user toggles "Yes" for experiencing urges
- **Purpose**: Critical intervention at moment of vulnerability

### Visual Design
- **Full-Screen Takeover**: Immediate transition with attention-grabbing animation
- **Pulsing Red Border**: Continuous pulsing animation around screen edges
- **Warning Symbol**: Large attention icon at top
- **High-Contrast Design**: Dark background with bright text for maximum impact
- **Urgent Typography**: Bold, slightly larger text than normal screens

### Content Elements
- **Personalized Warning Header**: "[User Name], STOP! Think about what you're about to lose."
- **Streak Reminder**: "You're about to throw away [X] days of progress."
- **Goal Reminders**: AI-generated reminders based on user's specific goals
  - Example: "Remember why you started: [specific goal from user profile]"
- **Achievement Section**: "You've earned [badges/achievements]. Don't lose your progress now."
- **Consequence Visualization**: Brief, impactful statements about negative effects
  - Example: "This moment of weakness will cost you [days/weeks] of recovery."

### AI-Generated Content
- **Personalization**: Content dynamically generated based on:
  - User's current streak
  - Selected goals during onboarding
  - Past journal entries
  - Achievement history
  - Previous relapses (if any)
- **Tone**: Direct, uncompromising, and challenging
  - Not gentle or understanding
  - Designed to create immediate pattern interrupt
  - Uses personal details for maximum impact

### Interactive Elements
- **Emergency Actions**:
  - "Call Accountability Partner" button (if partnered)
  - "Immediate Distraction" button (launches distraction tool)
  - "Breathing Exercise" button (launches guided breathing)
- **Commitment Button**: Large "I WILL STAY STRONG" button at bottom
- **Journal Option**: Secondary "Record What Triggered This" button
- **No Easy Dismiss**: Requires deliberate action to close screen

### Technical Implementation
- **Animation Priority**: High-performance animations that work even on lower-end devices
- **Offline Functionality**: Must work without internet connection
- **Response Time**: Must appear within 500ms of toggle action
- **AI Processing**: Pre-generate multiple response templates during idle time
- **Analytics**: Track effectiveness of different message types for optimization

- **Journal Functionality**:
  - When "Open Journal" is clicked (only after mood selection):
    - Opens a simple full-screen journal entry interface
    - Shows date and selected mood at top
    - Displays urge status (Yes/No) based on toggle selection
    - Large text area for free-form journaling
    - "Save" and "Cancel" buttons at bottom
    - Journal entries are private by default
  
  - Journal History:
    - Accessible from profile section
    - Simple list of past entries with dates
    - Entries organized chronologically

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

## Dashboard States
- **First-Time State**: Simplified with guidance overlays
- **Regular State**: Full featured as described above
- **Urge State**: Detected based on usage patterns, emphasizes support tools
- **Milestone State**: Celebration animations when reaching streak milestones

## Critical Moments
- **Relapse Reporting**: Supportive, non-judgmental animations
- **Achievement Unlocking**: Rewarding, celebratory animations
- **Partner Matching**: Positive connection animation
- **Urge Reporting**: Calming visual feedback
