# Kuitter App Database Schema Documentation

## Overview
This document provides a comprehensive overview of the Kuitter app's database schema as implemented in Supabase. The database is designed to support users in their journey to overcome pornography addiction through features like streak tracking, daily check-ins, journaling, goal setting, and community support.

## Tables

### 1. `ai_usage`
- **Description**: Tracks AI feature usage by users
- **Size**: 8192 bytes
- **Columns**: 7
- **RLS Enabled**: Yes

### 2. `daily_checkins`
- **Description**: Records users' daily mood and urge check-ins
- **Size**: 16 KB
- **Columns**: 6
- **RLS Enabled**: Yes
- **Purpose**: Allows users to log their daily emotional state and urge intensity, supporting the mood and urge logging feature

### 3. `group_members`
- **Description**: Tracks membership of users in support groups
- **Size**: 8192 bytes
- **Columns**: 3
- **RLS Enabled**: Yes
- **Purpose**: Manages the relationship between users and groups, enabling the group support feature

### 4. `group_post_comments`
- **Description**: Stores comments on posts within groups
- **Size**: 16 KB
- **Columns**: 5
- **RLS Enabled**: Yes
- **Purpose**: Enables community interaction through commenting on group posts

### 5. `group_post_likes`
- **Description**: Tracks likes on group posts
- **Size**: 8192 bytes
- **Columns**: 3
- **RLS Enabled**: Yes
- **Purpose**: Allows users to show appreciation for posts, enhancing community engagement

### 6. `group_posts`
- **Description**: Contains posts made within support groups
- **Size**: 16 KB
- **Columns**: 5
- **RLS Enabled**: Yes
- **Purpose**: Facilitates content sharing within support groups

### 7. `groups`
- **Description**: Stores information about support groups
- **Size**: 16 KB
- **Columns**: 7
- **RLS Enabled**: Yes
- **Purpose**: Manages support groups where users can find community and encouragement

### 8. `journal_entries`
- **Description**: Stores users' journal entries
- **Size**: 16 KB
- **Columns**: 6
- **RLS Enabled**: Yes
- **Purpose**: Allows users to record thoughts, triggers, and progress, including the "Record What Triggered This" feature from the Panic Screen

### 9. `partner_requests`
- **Description**: Manages accountability partner requests
- **Size**: 16 KB
- **Columns**: 6
- **RLS Enabled**: Yes
- **Purpose**: Handles the process of users requesting and accepting accountability partnerships

### 10. `recovery_goals`
- **Description**: Stores users' recovery goals
- **Size**: 16 KB
- **Columns**: 7
- **RLS Enabled**: Yes
- **Purpose**: Supports goal-setting functionality, allowing users to set and track their recovery objectives

### 11. `streaks`
- **Description**: Tracks users' clean streaks
- **Size**: 8192 bytes
- **Columns**: 7
- **RLS Enabled**: Yes
- **Purpose**: Core feature for tracking continuous periods of abstinence, supporting the Clean Streak Timer feature

### 12. `users`
- **Description**: Stores user profile information
- **Size**: 32 KB
- **Columns**: 7
- **RLS Enabled**: Yes
- **Purpose**: Contains user profile data, preferences, and authentication information

## Relationships

### User-Centered Relationships
- `users` is the central table with relationships to:
  - `streaks` (one-to-many): Each user has streak records
  - `daily_checkins` (one-to-many): Each user has daily check-in records
  - `journal_entries` (one-to-many): Each user has journal entries
  - `recovery_goals` (one-to-many): Each user has recovery goals
  - `group_members` (one-to-many): Each user can be a member of multiple groups
  - `partner_requests` (one-to-many): Each user can send/receive partner requests
  - `ai_usage` (one-to-many): Each user has AI usage records

### Group-Centered Relationships
- `groups` has relationships to:
  - `group_members` (one-to-many): Each group has multiple members
  - `group_posts` (one-to-many): Each group contains multiple posts
  
- `group_posts` has relationships to:
  - `group_post_comments` (one-to-many): Each post can have multiple comments
  - `group_post_likes` (one-to-many): Each post can have multiple likes

## Security Features
- Row-Level Security (RLS) is enabled on all tables, ensuring users can only access their own data or data that has been explicitly shared with them
- Authentication is handled through Supabase Auth, with custom user profiles stored in the `users` table

## Feature Support

### Panic Screen
The database supports the Panic Screen feature through:
- `streaks` table for displaying current streak information
- `recovery_goals` table for reminding users of their goals
- `journal_entries` table for the "Record What Triggered This" functionality

### Accountability
- `partner_requests` table for managing accountability partnerships and the "Call Partner" emergency action
- `group_members`, `group_posts`, and related tables for community support

### Progress Tracking
- `streaks` for tracking clean days
- `daily_checkins` for mood and urge tracking
- `recovery_goals` for goal setting and monitoring

## Conclusion
The Kuitter app database schema is designed to provide comprehensive support for individuals recovering from pornography addiction. The schema balances user privacy with community features, enabling both personal tracking and community support while maintaining appropriate data separation and security.
