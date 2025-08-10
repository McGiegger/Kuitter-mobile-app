# Kuitter User Flow Diagram

```
┌─────────────────┐
│   App Launch    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sign Up / Log In│  ◄── Email/password or Google authentication (user to choose one)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Onboarding Quiz │  ◄── 12 questions to assess habits, triggers, and goals
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│     Profile Type Selection  │  ◄── Anonymous or Public
└────────────────┬────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                           Dashboard                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Clean Streak Timer                     │  │  ◄── Visual progress tracker
│  │  (Current streak, longest streak, time since last relapse)│  │      showing recovery journey
│  └───────────────────────────────────────────────────────────┘  │
└─────────────┬───────────┬───────────┬───────────┬───────────────┘
              │           │           │           │
              ▼           ▼           ▼           ▼
        ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐
        │  Daily  │ │   AI    │ │ Support │ │ Accountability  │
        │  Mood   │ │ Chatbot │ │ Groups  │ │    Partner      │
        │ Check-In│ │(Anchor) │ │(Opt-in) │ │   (Opt-in)      │
        └────┬────┘ └────┬────┘ └────┬────┘ └────────┬────────┘
             │           │           │               │
             ▼           ▼           ▼               ▼
        ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐
        │ Log     │ │Real-time│ │ Group   │ │ Partner Chat    │
        │ Mood &  │ │ Support │ │ Chat    │ │ & Streak        │
        │ Urges   │ │         │ │         │ │ Dashboard       │
        └─────────┘ └─────────┘ └─────────┘ └─────────────────┘

              ▲                                     ▲
              │                                     │
              ▼                                     ▼
        ┌─────────┐                         ┌─────────────────┐
        │ Badges  │                         │  Leaderboards   │
        │   &     │ ◄───────────────────►   │   (Opt-in)      │
        │ Profile │                         │                 │
        └─────────┘                         └─────────────────┘
              │
              ▼
        ┌─────────┐
        │Settings │
        └─────────┘

## Explanation of Flow Components

### Initial Flow
- **App Launch**: User opens the app
- **Sign Up / Log In**: User creates an account or logs in with email/password or Google
- **Onboarding Quiz**: 12-question assessment to understand usage patterns, triggers, and goals
- **Profile Type Selection**: User chooses between Anonymous or Public identity

### Dashboard
The Dashboard serves as the central hub, with the Clean Streak Timer prominently displayed:

- **Clean Streak Timer**: Visual progress tracker showing:
  - Current streak (e.g., "47 days clean")
  - Longest streak
  - Time since last relapse
  - Option to manually reset streak if relapse occurs

### Primary Features
- **Daily Mood & Urge Check-In**: 
  - Push notification reminders
  - Mood input (slider/emojis)
  - Urge tracking (Yes/No/Strong)
  - Optional journaling

- **AI Chatbot ("Anchor")**:
  - Personalized, contextual conversations
  - Real-time support during moments of temptation
  - Analyzes user data to offer suggestions
  - Proactive notifications based on patterns
  - Grounding tools (breathing exercises, distraction techniques)

- **Support Groups (Optional)**:
  - User-selected groups (New Users, Young Adults, Faith-Based, etc.)
  - Chat room functionality
  - Daily prompts
  - Emoji reactions
  - Light moderation

- **Accountability Partnering (Optional)**:
  - Opt-in matching system
  - Matching preferences (timezone, anonymity, gender, communication style)
  - Partner chat with streak dashboards
  - Option to unmatch at any time

### Secondary Features
- **Badges & Profile**:
  - Achievement badges (Newcomer, streak milestones, etc.)
  - Customizable profile visibility
  - Control over streak information display

- **Leaderboards (Opt-In)**:
  - Anonymous leaderboard
  - "Top Achievers This Week" highlights
  - No public ranking

- **Settings**:
  - Privacy controls
  - Notification preferences
  - Account management
