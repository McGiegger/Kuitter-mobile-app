# 🛠️ Kuitter – Tech Stack Documentation

**Domain:** [kuitter.com](https://kuitter.com)  
**Version:** MVP v1.0  
**Maintainer:** Philip  
**Date:** April 2025

---

## ✨ Project Overview

**Kuitter** is a mobile-first app helping users overcome pornography addiction through daily mood tracking, a clean streak timer, AI-guided support, anonymous or public accountability, and real-time community features.

The tech stack is optimized for:
- **Cross-platform development** (iOS + Android)
- **AI integration**
- **Scalability**
- **Clean, modern UI/UX**

---

## 📱 Frontend (Mobile App)

| Component     | Technology        | Description |
|---------------|-------------------|-------------|
| Framework     | React Native       | Build once, run on both Android and iOS |
| Language      | TypeScript         | Static typing for better maintainability |
| Styling       | Tailwind CSS (via NativeWind) or Styled Components | Modern UI and utility-first design |
| Navigation    | react-navigation   | Handles app routing/navigation |
| UI Toolkit    | react-native-paper / custom components | Beautiful, material-inspired elements |

---

## 🔐 Authentication & Authorization

| Component     | Technology  | Description |
|---------------|-------------|-------------|
| Auth System   | Supabase Auth | Supports email/password and Google login |

---

## 🧠 AI Assistant (Anchor)

| Component     | Technology     | Description |
|---------------|----------------|-------------|
| Chatbot Engine | Gemini API (Google Cloud) | Provides conversational AI support with personalized behavior |
| Notifications | AI-generated messages | Based on user progress, logs, and context |

---

## 🔗 Backend & Infrastructure

| Component     | Technology        | Description |
|---------------|-------------------|-------------|
| Database      | Supabase PostgreSQL | Scalable relational database |
| Edge Functions | Supabase Edge Functions | Serverless backend logic (e.g., partner matching, streak resets) |
| File Storage  | Supabase Storage   | Avatar images, badge icons, and chat media |
| Hosting       | Supabase Cloud     | All-in-one backend, fully hosted & scalable |

---

## 🔔 Notifications & Analytics

| Component     | Technology        | Description |
|---------------|-------------------|-------------|
| Push Notifications | Firebase Cloud Messaging (FCM) | Trigger mood check-in, AI nudges, crisis-mode |
| App Analytics | Firebase Analytics | Tracks onboarding, streaks, engagement metrics |

---

## 💳 Payments & Subscriptions

| Component     | Technology               | Description |
|---------------|--------------------------|-------------|
| Subscription Billing | In-App Purchases (via react-native-iap) | Native subscription handling (Google Play & App Store) |
| Plans         | $3.99/month or $29.99/year | After 7-day free trial |
| App Store Cuts | 15%–30% revenue share | Managed by Google/Apple automatically |

---

## 🚀 CI/CD & Deployment

| Component     | Technology     | Description |
|---------------|----------------|-------------|
| Build System  | Expo + EAS (Managed Workflow) | Easy publishing to iOS and Android |
| CI/CD         | GitHub Actions | Automate testing and builds |
| Testing       | Expo Go / Device Testing | Preview on real devices during development |