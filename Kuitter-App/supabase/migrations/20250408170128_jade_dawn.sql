/*
  # Complete Schema Setup for Kuitter App

  1. User Management & Authentication
    - Enhanced user profiles with auth providers and visibility settings
    - Profile preferences and settings
    - Anonymous user support

  2. Recovery Progress Tracking
    - Streaks and achievements
    - Daily check-ins and mood tracking
    - Journal entries
    - Recovery goals

  3. Community Features
    - Community feed with posts, comments, and likes
    - Group discussions and interactions
    - Partnership system
    - User connections

  4. AI Integration
    - Usage tracking and limits
    - Personalization data storage
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with enhanced profile settings
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  profile_type text NOT NULL CHECK (profile_type IN ('public', 'anonymous')),
  randomized_username text,
  auth_provider text DEFAULT 'email',
  auth_provider_id text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  last_active_at timestamptz DEFAULT now()
);

-- Streaks tracking
CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  last_check_in date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Daily check-ins for mood and urges
CREATE TABLE IF NOT EXISTS daily_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  mood text NOT NULL,
  experienced_urges boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Journal entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  mood text,
  experienced_urges boolean,
  created_at timestamptz DEFAULT now()
);

-- Recovery goals
CREATE TABLE IF NOT EXISTS recovery_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  goal text NOT NULL,
  target_date date,
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Community posts
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post comments
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Post likes
CREATE TABLE IF NOT EXISTS post_likes (
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

-- Community groups
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  member_count integer DEFAULT 0,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- Group posts
CREATE TABLE IF NOT EXISTS group_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Group post comments
CREATE TABLE IF NOT EXISTS group_post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES group_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Group post likes
CREATE TABLE IF NOT EXISTS group_post_likes (
  post_id uuid REFERENCES group_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

-- Active partnerships
CREATE TABLE IF NOT EXISTS partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1 uuid REFERENCES users(id) ON DELETE CASCADE,
  user_id_2 uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_partnership UNIQUE (user_id_1, user_id_2),
  CONSTRAINT different_users CHECK (user_id_1 != user_id_2)
);

-- Partnership requests
CREATE TABLE IF NOT EXISTS partner_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES users(id) ON DELETE CASCADE,
  recipient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI usage tracking
CREATE TABLE IF NOT EXISTS ai_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  daily_count integer DEFAULT 0,
  monthly_count integer DEFAULT 0,
  last_daily_reset date DEFAULT CURRENT_DATE,
  last_monthly_reset date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Streaks policies
CREATE POLICY "Users can read own streaks" ON streaks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON streaks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Daily check-ins policies
CREATE POLICY "Users can manage own check-ins" ON daily_checkins
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Journal entries policies
CREATE POLICY "Users can manage own journal entries" ON journal_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Recovery goals policies
CREATE POLICY "Users can manage own goals" ON recovery_goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Community posts policies
CREATE POLICY "Users can read all posts" ON community_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own posts" ON community_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Users can read all comments" ON post_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own comments" ON post_comments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Users can manage likes" ON post_likes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Groups policies
CREATE POLICY "Anyone can view groups" ON groups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage groups" ON groups
  FOR ALL
  TO authenticated
  USING (auth.uid() = created_by);

-- Group members policies
CREATE POLICY "Members can view group members" ON group_members
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM group_members gm
    WHERE gm.group_id = group_members.group_id
    AND gm.user_id = auth.uid()
  ));

-- Group posts policies
CREATE POLICY "Group members can read posts" ON group_posts
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM group_members gm
    WHERE gm.group_id = group_posts.group_id
    AND gm.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own posts" ON group_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Group comments policies
CREATE POLICY "Group members can read comments" ON group_post_comments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM group_posts gp
    JOIN group_members gm ON gm.group_id = gp.group_id
    WHERE gp.id = group_post_comments.post_id
    AND gm.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own comments" ON group_post_comments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Group likes policies
CREATE POLICY "Group members can manage likes" ON group_post_likes
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM group_posts gp
    JOIN group_members gm ON gm.group_id = gp.group_id
    WHERE gp.id = group_post_likes.post_id
    AND gm.user_id = auth.uid()
  ));

-- Partnerships policies
CREATE POLICY "Users can view own partnerships" ON partnerships
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (user_id_1, user_id_2));

-- Partnership requests policies
CREATE POLICY "Users can manage own partnership requests" ON partner_requests
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (requester_id, recipient_id));

-- AI usage policies
CREATE POLICY "Users can read own AI usage" ON ai_usage
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Functions

-- Function to update streak counts
CREATE OR REPLACE FUNCTION update_streak()
RETURNS trigger AS $$
BEGIN
  -- Update streak count based on consecutive check-ins
  WITH streak_data AS (
    SELECT
      user_id,
      CASE
        WHEN date = CURRENT_DATE - INTERVAL '1 day' THEN
          COALESCE((SELECT current_streak FROM streaks WHERE user_id = NEW.user_id), 0) + 1
        ELSE 1
      END as new_streak
    FROM daily_checkins
    WHERE user_id = NEW.user_id
    ORDER BY date DESC
    LIMIT 1
  )
  INSERT INTO streaks (user_id, current_streak, best_streak)
  VALUES (
    NEW.user_id,
    (SELECT new_streak FROM streak_data),
    GREATEST(
      (SELECT new_streak FROM streak_data),
      COALESCE((SELECT best_streak FROM streaks WHERE user_id = NEW.user_id), 0)
    )
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    current_streak = EXCLUDED.current_streak,
    best_streak = GREATEST(streaks.best_streak, EXCLUDED.current_streak),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE groups
    SET member_count = member_count + 1
    WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE groups
    SET member_count = member_count - 1
    WHERE id = OLD.group_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to reset daily AI usage
CREATE OR REPLACE FUNCTION reset_daily_ai_usage()
RETURNS trigger AS $$
BEGIN
  IF NEW.last_daily_reset < CURRENT_DATE THEN
    NEW.daily_count := 0;
    NEW.last_daily_reset := CURRENT_DATE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to reset monthly AI usage
CREATE OR REPLACE FUNCTION reset_monthly_ai_usage()
RETURNS trigger AS $$
BEGIN
  IF EXTRACT(MONTH FROM NEW.last_monthly_reset) < EXTRACT(MONTH FROM CURRENT_DATE) THEN
    NEW.monthly_count := 0;
    NEW.last_monthly_reset := CURRENT_DATE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to check if users are partners
CREATE OR REPLACE FUNCTION are_users_partners(user1_id uuid, user2_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM partnerships
    WHERE (user_id_1 = user1_id AND user_id_2 = user2_id)
    OR (user_id_1 = user2_id AND user_id_2 = user1_id)
  );
END;
$$ LANGUAGE plpgsql;

-- Triggers

-- Trigger to update streaks on check-in
CREATE TRIGGER update_streak_on_checkin
  AFTER INSERT ON daily_checkins
  FOR EACH ROW
  EXECUTE FUNCTION update_streak();

-- Trigger to update group member count
CREATE TRIGGER update_group_member_count
  AFTER INSERT OR DELETE ON group_members
  FOR EACH ROW
  EXECUTE FUNCTION update_group_member_count();

-- Trigger to reset daily AI usage
CREATE TRIGGER reset_daily_ai_usage
  BEFORE UPDATE ON ai_usage
  FOR EACH ROW
  EXECUTE FUNCTION reset_daily_ai_usage();

-- Trigger to reset monthly AI usage
CREATE TRIGGER reset_monthly_ai_usage
  BEFORE UPDATE ON ai_usage
  FOR EACH ROW
  EXECUTE FUNCTION reset_monthly_ai_usage();