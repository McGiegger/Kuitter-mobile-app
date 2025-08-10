# 📱 Kuitter: Product Requirements Document (PRD)

**Version:** MVP v1.0  
**Date:** April 1, 2025  
**Owner:** Philip 

---

## 📋 Table of Contents
1. [Overview](#1-overview)
2. [Goals and Objectives](#2-goals-and-objectives)
3. [Core Features (MVP)](#3-core-features-mvp)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [Privacy & Security Requirements](#5-privacy--security-requirements)
6. [Out of Scope (for MVP)](#6-out-of-scope-for-mvp)
7. [Platform Requirements](#7-platform-requirements)
8. [Success Metrics](#8-success-metrics)
9. [Timeline (High-Level)](#9-timeline-high-level)

---

## 1. Overview

### Purpose
*Kuitter* is a mobile app designed to support individuals struggling with pornography addiction by offering a personalized, supportive, and non-judgmental digital experience. The app uses behavior tracking, peer accountability, and intelligent support tools to help users build healthier habits over time.

### Target Users
- Adults and young adults experiencing compulsive porn use
- Users seeking private or community-based support
- People looking for an affordable, AI-assisted alternative to expensive therapy platforms

---

## 2. Goals and Objectives

- ✅ Provide users with clear progress tracking for streaks and relapses
- ✅ Enable personalized support through an AI companion ("Anchor")
- ✅ Foster a sense of community via opt-in peer groups
- ✅ Facilitate one-on-one accountability partnerships
- ✅ Respect user privacy through robust anonymity options
- ✅ Launch with minimal human moderation or overhead

---

## 3. Core Features (MVP)

### 3.1 Authentication & User Onboarding
- 🔐 Sign Up / Log In with email/password or Google authentication
- 📝 12-question onboarding quiz to assess habits, triggers, and goals
- 🎭 Prompt to choose profile type: Anonymous or Public
- 🚀 Auto-start clean streak timer at Day 0 upon quiz completion
- 👥 Display pre-defined group options for user to join voluntarily

### 3.2 Dashboard & Clean Streak Timer
- 📊 Central dashboard as the main hub for all features
- ⏱️ Prominently displayed Clean Streak Timer showing:
  - Current streak (e.g., "47 days clean")
  - Longest streak
  - Time since last relapse
- 🎨 Visually appealing design (circular widget or streak bar)
- 🔄 Manual reset with confirmation popup when relapse occurs

### 3.3 Daily Mood & Urge Logging
- 🔔 Push notification reminders for daily check-in
- 😊 Mood input (slider/emojis)
- 💪 "Did you experience an urge today?" (Yes/No/Strong)
- 📓 Optional journal note

### 3.4 AI Chatbot Companion – Anchor
- 🤖 Personalized, contextual conversations
- 🆘 Real-time support during moments of temptation
- 📊 Analyzes streak and journal data to offer suggestions and affirmations
- 📱 Sends proactive AI-generated push notifications based on patterns
- 🧘 Offers grounding tools (e.g., breathing, distraction ideas)

### 3.5 Group Support (Optional)
- 👥 Users choose groups during onboarding
- 🏷️ Group types include: New Users, Young Adults, Faith-Based, etc.
- 💬 Groups function like chat rooms:
  - Share wins, questions, encouragement
  - Daily prompt auto-posted
  - Emoji reactions and light moderation rules

### 3.6 Accountability Partnering
- 🤝 User opts in to be matched
- ⚙️ Matching preferences: timezone, anonymity, gender, style of communication
- 👤 Matches shown with pseudonym or name based on privacy
- 💬 Chat functionality for partners with streak dashboards
- 🚪 Option to unmatch at any time

### 3.7 Badges and Profile Identity
- 🏅 Users earn badges:
  - Newcomer
  - Anonymous Mode
  - Clean streaks (3/7/30 days, etc.)
  - Community Builder
  - Accountability Hero
- ✓ Badges act like social media verification markers
- 🔒 Users can control visibility of badges and streak info

### 3.8 Leaderboards (Opt-In)
- 🏆 Optional feature where users can view anonymous leaderboard
- 👁️ Leaderboard shows pseudonym, public badge level, current streak (if enabled)
- 📊 No public ranking, only "Top Achievers This Week" highlights

---

## 4. User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Anonymous User** | Full access to all features, but appears as avatar + pseudonym |
| **Public User** | Can choose visible name/photo and engage publicly in groups |
| **Partnered User** | Access to 1:1 streak dashboard and private chat |
| **Opted-Out User** | Can skip groups/partnering and still use solo recovery tools |

---

## 5. Privacy & Security Requirements

- 🔒 End-to-end encryption for personal logs and messages
- 🔒 No sensitive data shared in leaderboards unless user explicitly opts in
- 🔒 Avatars and usernames for anonymous users are AI-generated
- 🔒 All user data anonymized for internal analytics

---

## 7. Platform Requirements

- 📱 Mobile App (Android + iOS, React Native preferred)
- 🤖 AI backend (Gemini API or open-source model like OpenAssistant)
- ☁️ Cloud database (e.g., Supabase or Firebase)
- 🔔 Push notification system (e.g., Firebase Cloud Messaging)

---