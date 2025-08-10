# Kuitter Achievements & Leaderboard

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the achievements, badges, and leaderboard features for the Kuitter app.

## Simplified Badge System

### Core Badge Categories (3 Maximum)
1. **Recovery Progress Badges**
   - Based on clean streak milestones
   - Bronze: 7 days (1 week)
   - Silver: 30 days (1 month)
   - Gold: 90 days (3 months)
   - Platinum: 365 days (1 year)
   - Only the highest achieved badge is displayed on profile

2. **Engagement Badges**
   - Based on app interaction and journal entries
   - Level 1: "Mindful Warrior" (10 journal entries)
   - Level 2: "Reflection Master" (30 journal entries)
   - Level 3: "Insight Champion" (100 journal entries)
   - Only the highest achieved badge is displayed on profile

3. **Community Badges**
   - Based on community participation and support
   - Level 1: "Connection Builder" (Active for 30 days)
   - Level 2: "Support Pillar" (Helped 5 community members)
   - Level 3: "Community Leader" (Actively participated for 90+ days)
   - Only the highest achieved badge is displayed on profile

### Badge Display
- Each user profile shows a maximum of 3 badges (one from each category)
- Badges appear as simple icons with color-coding by level
- Hovering/tapping a badge reveals its name and achievement criteria
- Public profiles show the same badges visible to the community

### Technical Implementation
- Simple database structure with three badge fields per user:
  ```
  user {
    recoveryBadgeLevel: 1-4,
    engagementBadgeLevel: 1-3,
    communityBadgeLevel: 1-3
  }
  ```
- Badge progress tracked through existing app actions (no additional tracking needed)
- Badges awarded automatically when milestones are reached
- Simple notification when new badge is earned

### Achievement Screen
- Clean, minimal design showing all three badge categories
- Current badge highlighted for each category
- Progress indicator toward next badge level
- Achievement history accessible but not prominently displayed

## Leaderboard (Opt-In)
- **Weekly Leaders**: Simple list of top 10 users by current streak
- **Your Position**: Highlighted entry for the user
- **Privacy Controls**: Option to participate anonymously or not at all
- **Filter Options**: By group or global
