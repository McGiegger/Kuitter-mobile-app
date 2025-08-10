# Kuitter Authentication & Onboarding

## Project Specifications
- **Platform**: Mobile application (iOS and Android)
- **Tech Stack**: React Native (with TypeScript)
- **Target Devices**: Smartphones and tablets
- **Design Approach**: Mobile-first, native feel with premium aesthetics
- **Backend Integration**: RESTful API with Firebase/Supabase

This document outlines the authentication and onboarding flow for the Kuitter app.

## Sign Up / Login (Screen 1)
- Clean, minimalist design with app logo prominently displayed
- Options for email/password and Google authentication
- Privacy assurance message
- Subtle background animation that responds to touch

## Onboarding Quiz (Screens 2-13)
- 12 questions presented one at a time
- Progress indicator showing question number (e.g., "3 of 12")
- Simple, focused UI with large touch targets
- Questions fade in/out during transitions

### Specific Questions:
1. "How long have you been struggling with porn?" (Multiple choice)
2. "How frequently do you currently use porn?" (Multiple choice)
3. "What time of day do you typically experience the strongest urges?" (Multiple choice)
4. "What emotions typically trigger you?" (Multiple select)
5. "What activities help you resist urges?" (Multiple select)
6. "Have you tried other methods to break the addiction?" (Multiple select)
7. "Do you have someone you can talk to about this struggle?" (Yes/No)
8. "What's your primary motivation for breaking the addiction?" (Multiple choice)
9. "How does porn use affect your life?" (Multiple select)
10. "How comfortable are you with group support?" (Slider)
11. "Would you prefer an accountability partner?" (Yes/No/Maybe)
12. "What's your age bracket?" (Multiple choice)
13. "What's your gender?" (Multiple choice)

## Profile Type Selection (Screen 14)
- Two clear options with visual representations:
  - **Anonymous**: Avatar silhouette with privacy indicators
  - **Public**: Profile representation with community indicators
- Explanation of each option and privacy implications
- Option to change this setting later (noted on screen)
