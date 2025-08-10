# Backend Requirements for Kuitter App

## 1. Authentication

### 1.1 API Endpoints

#### Sign Up:
- **Route:** `/auth/signup`
- **Method:** POST
- **Parameters:** None
- **Authentication:** None
- **Rate Limiting:** Standard (e.g., 5 requests per minute per IP)

#### Sign In:
- **Route:** `/auth/signin`
- **Method:** POST
- **Parameters:** None
- **Authentication:** None
- **Rate Limiting:** Standard (e.g., 5 requests per minute per IP)

#### Verify Token:
- **Route:** `/auth/verify`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

### 1.2 Data Requirements

#### Request Payload (Sign Up):
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

#### Request Payload (Sign In):
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Response Payload (Success):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user123",
    "profileImage": "https://example.com/image.jpg"
  }
}
```

#### Response Payload (Failure):
```json
{
  "error": "Invalid credentials"
}
```

#### Database Schema (Users):
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  profile_image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Data Validation Rules:
- email: Must be a valid email format and unique.
- password: Must meet complexity requirements (e.g., minimum length, special characters).

### 1.3 Business Logic Requirements
- Hashing passwords using bcrypt or similar.
- Generating and verifying JWT tokens.
- Implementing password reset functionality.

### 1.4 Integration Requirements
- None

## 2. User Profile

### 2.1 API Endpoints

#### Get Profile:
- **Route:** `/users/profile`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Update Profile:
- **Route:** `/users/profile`
- **Method:** PUT
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 10 requests per minute per user)

#### Update Visibility Settings:
- **Route:** `/users/visibility`
- **Method:** PUT
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 10 requests per minute per user)

#### Get User Streak:
- **Route:** `/users/streak`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Reset Streak:
- **Route:** `/users/streak/reset`
- **Method:** POST
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Low (e.g., 5 requests per minute per user)

### 2.2 Data Requirements

#### Request Payload (Update Profile):
```json
{
  "name": "John Doe",
  "email": "newemail@example.com",
  "username": "johndoe",
  "age": 30,
  "profileImage": "https://example.com/newimage.jpg"
}
```

#### Request Payload (Update Visibility Settings):
```json
{
  "isAnonymous": true,
  "anonymousUsername": "RecoveryHero123"
}
```

#### Response Payload (Success - Get User Streak):
```json
{
  "currentStreak": 15,
  "bestStreak": 30,
  "totalDaysClean": 45,
  "lastCheckIn": "2024-04-07T09:00:00Z"
}
```

#### Response Payload (Success):
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "newemail@example.com",
    "username": "johndoe",
    "age": 30,
    "profileImage": "https://example.com/newimage.jpg",
    "isAnonymous": true,
    "anonymousUsername": "RecoveryHero123",
    "streak": {
      "current": 15,
      "best": 30
    }
  }
}
```

#### Database Schema (Users - continued):
```sql
ALTER TABLE users ADD COLUMN name VARCHAR(255);
ALTER TABLE users ADD COLUMN age INTEGER;
ALTER TABLE users ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN anonymous_username VARCHAR(255);
```

#### Database Schema (Streaks):
```sql
CREATE TABLE streaks (
  user_id UUID REFERENCES users(id) NOT NULL,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_days_clean INTEGER DEFAULT 0,
  last_check_in TIMESTAMP WITH TIME ZONE,
  streak_start_date TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (user_id)
);
```

#### Database Schema (Daily Check-ins):
```sql
CREATE TABLE daily_check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  date DATE NOT NULL,
  mood VARCHAR(50) NOT NULL,
  had_urges BOOLEAN DEFAULT FALSE,
  journal_entry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);
```

#### Data Validation Rules:
- name: Required.
- email: Must be a valid email format and unique.
- age: Must be a valid integer.
- isAnonymous: Boolean value.
- anonymousUsername: Required if isAnonymous is true.

### 2.3 Business Logic Requirements
- Validating user input.
- Handling profile image uploads (Use Cloudinary).
- Managing anonymous vs. public profiles.
- Generating random anonymous usernames when requested.
- Calculating and updating streak information daily.
- Processing daily check-ins and updating streak accordingly.
- Maintaining historical best streak data.

### 2.4 Integration Requirements
- Third-party service for image storage (Cloudinary).
- Background job scheduler for daily streak updates and maintenance.

## 3. Community Feed

### 3.1 API Endpoints

#### Get Posts:
- **Route:** `/posts`
- **Method:** GET
- **Parameters:**
  - limit: Number of posts to return (optional, default: 20)
  - offset: Starting offset for pagination (optional, default: 0)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Create Post:
- **Route:** `/posts`
- **Method:** POST
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 5 requests per minute per user)

#### Like Post:
- **Route:** `/posts/{postId}/like`
- **Method:** POST
- **Parameters:** postId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Add Comment:
- **Route:** `/posts/{postId}/comments`
- **Method:** POST
- **Parameters:** postId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

### 3.2 Data Requirements

#### Request Payload (Create Post):
```json
{
  "content": "This is my new post!"
}
```

#### Response Payload (Success - Get Posts):
```json
[
  {
    "id": "uuid",
    "author": {
      "id": "uuid",
      "username": "user123",
      "profileImage": "https://example.com/image.jpg"
    },
    "content": "This is my new post!",
    "likes": 10,
    "hasLiked": true,
    "comments": [
      {
        "id": "uuid",
        "author": {
          "id": "uuid",
          "username": "commenter",
          "profileImage": "https://example.com/commenter.jpg"
        },
        "content": "Great post!",
        "timestamp": "2024-04-07T10:00:00Z"
      }
    ],
    "timestamp": "2024-04-07T09:00:00Z"
  }
]
```

#### Database Schema (Posts):
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Comments):
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Data Validation Rules:
- content: Must not be empty and should have a maximum length.

### 3.3 Business Logic Requirements
- Implementing pagination for retrieving posts.
- Handling post creation, liking, and commenting.
- Preventing duplicate likes from the same user.

### 3.4 Integration Requirements
- None

## 4. Accountability Partners

### 4.1 API Endpoints

#### Get Partners:
- **Route:** `/partners`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Search Potential Partners:
- **Route:** `/partners/search`
- **Method:** GET
- **Parameters:** 
  - query: Search term for username (required)
  - limit: Number of results to return (optional, default: 20)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 30 requests per minute per user)

#### Send Partner Request:
- **Route:** `/partners/request/{partnerId}`
- **Method:** POST
- **Parameters:** partnerId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Accept Partner Request:
- **Route:** `/partners/request/{requestId}/accept`
- **Method:** POST
- **Parameters:** requestId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Reject Partner Request:
- **Route:** `/partners/request/{requestId}/reject`
- **Method:** POST
- **Parameters:** requestId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Get Partner Requests:
- **Route:** `/partners/requests`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Remove Partner:
- **Route:** `/partners/{partnerId}`
- **Method:** DELETE
- **Parameters:** partnerId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)


### 4.2 Data Requirements

#### Response Payload (Search Potential Partners):
```json
[
  {
    "id": "uuid",
    "username": "johndoe",
    "profileImage": "https://example.com/image.jpg",
    "isAnonymous": false,
    "streak": 15
  }
]
```

#### Response Payload (Get Partner Requests):
```json
[
  {
    "id": "uuid",
    "sender": {
      "id": "uuid",
      "username": "johndoe",
      "profileImage": "https://example.com/image.jpg",
      "isAnonymous": false
    },
    "status": "pending",
    "createdAt": "2024-04-07T08:00:00Z"
  }
]
```

#### Database Schema (Partnerships):
```sql
CREATE TABLE partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  partner_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, partner_id)
);
```

#### Database Schema (Partnership Requests):
```sql
CREATE TABLE partnership_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) NOT NULL,
  receiver_id UUID REFERENCES users(id) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sender_id, receiver_id)
);
```

#### Database Schema (Acknowledgments):
```sql
CREATE TABLE acknowledgments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  partner_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, partner_id)
);
```

### 4.3 Business Logic Requirements
- Implementing the logic for adding and removing partners.
- Retrieving chat messages between partners.
- Sending and receiving real-time chat messages (consider using WebSockets).
- Handling partner acknowledgments.

### 4.4 Integration Requirements
- Real-time communication service (e.g., WebSockets via Socket.IO or similar).

## 5. Trigger Analysis

### 5.1 API Endpoints

#### Get Trigger Stats:
- **Route:** `/triggers/stats`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Get Trigger Logs:
- **Route:** `/triggers/logs`
- **Method:** GET
- **Parameters:**
  - limit: Number of logs to return (optional, default: 20)
  - offset: Starting offset for pagination (optional, default: 0)
  - filter: Filter by 'overcome' or 'failed' (optional)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

### 5.2 Data Requirements

#### Response Payload (Get Trigger Stats):
```json
{
  "total": 24,
  "overcome": 20,
  "thisWeek": 3,
  "commonTriggers": [
    { "name": "Stress", "count": 8 },
    { "name": "Late Night", "count": 6 },
    { "name": "Boredom", "count": 5 }
  ],
  "commonLocations": [
    { "name": "Home", "count": 12 },
    { "name": "Work", "count": 8 },
    { "name": "Public", "count": 4 }
  ]
}
```

#### Response Payload (Get Trigger Logs):
```json
[
  {
    "id": "uuid",
    "date": "2024-04-06",
    "time": "22:30",
    "triggers": ["Stress", "Late Night"],
    "location": "Home",
    "notes": "Feeling overwhelmed with work deadlines",
    "overcome": true
  }
]
```

#### Database Schema (Triggers):
```sql
CREATE TABLE triggers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  triggers TEXT[],
  location VARCHAR(255),
  notes TEXT,
  overcome BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 5.3 Business Logic Requirements
- Calculating trigger statistics (total triggers, success rate, common triggers, common locations).
- Implementing pagination and filtering for trigger logs.

### 5.4 Integration Requirements
- None

## 6. Subscription Management

### 6.1 API Endpoints

#### Activate Subscription:
- **Route:** `/subscriptions/activate`
- **Method:** POST
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Low (e.g., 1 request per minute per user)

#### Get Subscription Status:
- **Route:** `/subscriptions/status`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

### 6.2 Data Requirements

#### Request Payload (Activate Subscription):
```json
{
  "planId": "yearly"
}
```

#### Response Payload (Get Subscription Status):
```json
{
  "status": "active" | "trial" | "expired",
  "expirationDate": "2025-04-07T00:00:00Z"
}
```

#### Database Schema (Subscriptions):
```sql
CREATE TABLE subscriptions (
  user_id UUID REFERENCES users(id) NOT NULL,
  plan_id VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expiration_date TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY (user_id)
);
```

### 6.3 Business Logic Requirements
- Integrating with a payment gateway (e.g., Stripe, RevenueCat).
- Handling subscription activation, cancellation, and renewal.
- Calculating subscription expiration dates.

### 6.4 Integration Requirements
- Payment gateway integration (e.g., Stripe, RevenueCat).

## 7. Community Groups

### 7.1 API Endpoints

#### Get Groups:
- **Route:** `/groups`
- **Method:** GET
- **Parameters:** 
  - limit: Number of groups to return (optional, default: 20)
  - offset: Starting offset for pagination (optional, default: 0)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Get Group Details:
- **Route:** `/groups/{groupId}`
- **Method:** GET
- **Parameters:** groupId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Join Group:
- **Route:** `/groups/{groupId}/join`
- **Method:** POST
- **Parameters:** groupId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Leave Group:
- **Route:** `/groups/{groupId}/leave`
- **Method:** POST
- **Parameters:** groupId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Get Group Posts:
- **Route:** `/groups/{groupId}/posts`
- **Method:** GET
- **Parameters:**
  - limit: Number of posts to return (optional, default: 20)
  - offset: Starting offset for pagination (optional, default: 0)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Create Group Post:
- **Route:** `/groups/{groupId}/posts`
- **Method:** POST
- **Parameters:** groupId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 5 requests per minute per user)

#### Like Group Post:
- **Route:** `/groups/{groupId}/posts/{postId}/like`
- **Method:** POST
- **Parameters:** groupId and postId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

#### Comment on Group Post:
- **Route:** `/groups/{groupId}/posts/{postId}/comments`
- **Method:** POST
- **Parameters:** groupId and postId in the route
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per minute per user)

### 7.2 Data Requirements

#### Response Payload (Get Groups):
```json
[
  {
    "id": "uuid",
    "name": "Newcomers Support",
    "description": "A group for those just starting their recovery journey",
    "memberCount": 156,
    "isJoined": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Response Payload (Get Group Details):
```json
{
  "id": "uuid",
  "name": "Newcomers Support",
  "description": "A group for those just starting their recovery journey",
  "memberCount": 156,
  "isJoined": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "isAdmin": false
}
```

#### Request Payload (Create Group Post):
```json
{
  "content": "This is my first post in this group!"
}
```

#### Response Payload (Get Group Posts):
```json
[
  {
    "id": "uuid",
    "author": {
      "id": "uuid",
      "username": "user123",
      "profileImage": "https://example.com/image.jpg",
      "isAnonymous": false
    },
    "content": "This is my first post in this group!",
    "likes": 10,
    "hasLiked": true,
    "comments": [
      {
        "id": "uuid",
        "author": {
          "id": "uuid",
          "username": "commenter",
          "profileImage": "https://example.com/commenter.jpg",
          "isAnonymous": true
        },
        "content": "Welcome to the group!",
        "timestamp": "2024-04-07T10:00:00Z"
      }
    ],
    "timestamp": "2024-04-07T09:00:00Z"
  }
]
```

#### Database Schema (Groups):
```sql
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_admin_created BOOLEAN DEFAULT TRUE,
  fake_member_count INTEGER DEFAULT 0
);
```

#### Database Schema (Group Members):
```sql
CREATE TABLE group_members (
  group_id UUID REFERENCES groups(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, user_id)
);
```

#### Database Schema (Group Posts):
```sql
CREATE TABLE group_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Group Post Comments):
```sql
CREATE TABLE group_post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES group_posts(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Group Post Likes):
```sql
CREATE TABLE group_post_likes (
  post_id UUID REFERENCES group_posts(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, user_id)
);
```

#### Data Validation Rules:
- Group name: Required, maximum length 255 characters.
- Group description: Optional, maximum length 1000 characters.
- Post content: Required, maximum length 1000 characters.
- Comment content: Required, maximum length 500 characters.

### 7.3 Business Logic Requirements
- Creating and managing groups (admin functionality).
- Handling group membership (joining/leaving).
- Managing group posts, comments, and likes.
- Calculating and displaying accurate member counts (real + fake).
- Preventing duplicate likes from the same user.

### 7.4 Integration Requirements
- None

## 8. Anchor AI Companion

### 8.1 API Endpoints

#### Get Daily Message:
- **Route:** `/anchor/daily-message`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Low (e.g., 10 requests per day per user)

#### Send Message to Anchor:
- **Route:** `/anchor/chat`
- **Method:** POST
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 50 messages per day per user)

#### Get Chat History:
- **Route:** `/anchor/chat-history`
- **Method:** GET
- **Parameters:**
  - limit: Number of messages to return (optional, default: 20)
  - offset: Starting offset for pagination (optional, default: 0)
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Get Usage Stats:
- **Route:** `/anchor/usage`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

### 8.2 Data Requirements

#### Request Payload (Send Message to Anchor):
```json
{
  "content": "I'm feeling really tempted today. What should I do?"
}
```

#### Response Payload (Daily Message):
```json
{
  "id": "uuid",
  "content": "You've been clean for 15 days now, which is impressive! Remember your goal to reach 30 days? You're halfway there. Today, focus on the progress you've made and the strength you've shown.",
  "timestamp": "2024-04-08T08:00:00Z"
}
```

#### Response Payload (Chat):
```json
{
  "id": "uuid",
  "content": "I understand you're feeling tempted. This is a critical moment. Remember that you've already made it 15 days - that's real progress! Let's work through this together. First, identify what triggered this urge. Was it stress, boredom, or something specific?",
  "timestamp": "2024-04-08T14:30:00Z"
}
```

#### Response Payload (Chat History):
```json
[
  {
    "id": "uuid",
    "role": "user",
    "content": "I'm feeling really tempted today. What should I do?",
    "timestamp": "2024-04-08T14:29:00Z"
  },
  {
    "id": "uuid",
    "role": "assistant",
    "content": "I understand you're feeling tempted. This is a critical moment. Remember that you've already made it 15 days - that's real progress! Let's work through this together. First, identify what triggered this urge. Was it stress, boredom, or something specific?",
    "timestamp": "2024-04-08T14:30:00Z"
  }
]
```

#### Response Payload (Usage Stats):
```json
{
  "messagesUsedToday": 5,
  "dailyLimit": 50,
  "messagesUsedThisMonth": 120,
  "monthlyLimit": 500,
  "resetDate": "2024-05-01T00:00:00Z"
}
```

#### Database Schema (Anchor Messages):
```sql
CREATE TABLE anchor_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  is_daily_message BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Anchor System Prompts):
```sql
CREATE TABLE anchor_system_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_type VARCHAR(50) NOT NULL, -- 'daily_message', 'chat', 'urge_response', etc.
  content TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Anchor Usage):
```sql
CREATE TABLE anchor_usage (
  user_id UUID REFERENCES users(id) NOT NULL,
  daily_count INTEGER DEFAULT 0,
  monthly_count INTEGER DEFAULT 0,
  last_daily_reset TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_monthly_reset TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);
```

### 8.3 Business Logic Requirements
- Generating personalized daily messages based on user data (streak, goals, triggers, etc.).
- Rotating system prompts to ensure variety in AI responses.
- Tracking and enforcing usage limits (daily and monthly).
- Providing contextual responses based on user history and profile.
- Integrating with user data from other features (streak, goals, journal entries, etc.).
- Implementing automatic reset of usage counters (daily at midnight, monthly on the 1st).

### 8.4 Integration Requirements
- AI model API integration (e.g., DeepSeek or similar cost-effective model).
- Background job for sending daily messages and push notifications.
- Push notification service for delivering daily messages.

## 9. Goal Setting

### 9.1 API Endpoints

#### Get Goals:
- **Route:** `/goals`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

#### Set Initial Goals:
- **Route:** `/goals/initial`
- **Method:** POST
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Low (e.g., 5 requests per day per user)

#### Update Goals:
- **Route:** `/goals`
- **Method:** PUT
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Moderate (e.g., 10 requests per day per user)

#### Get Goal Progress:
- **Route:** `/goals/progress`
- **Method:** GET
- **Parameters:** None
- **Authentication:** JWT required in Authorization header
- **Rate Limiting:** Standard (e.g., 60 requests per minute per user)

### 9.2 Data Requirements

#### Request Payload (Set Initial Goals):
```json
{
  "targetDays": 30,
  "selectedGoals": [
    "improve_sleep",
    "reduce_anxiety",
    "increase_productivity",
    "improve_relationships"
  ],
  "customGoals": [
    "Spend more time outdoors"
  ]
}
```

#### Response Payload (Get Goals):
```json
{
  "targetDays": 30,
  "targetDate": "2024-05-08T00:00:00Z",
  "selectedGoals": [
    "improve_sleep",
    "reduce_anxiety",
    "increase_productivity",
    "improve_relationships"
  ],
  "customGoals": [
    "Spend more time outdoors"
  ],
  "createdAt": "2024-04-08T00:00:00Z",
  "updatedAt": "2024-04-08T00:00:00Z"
}
```

#### Response Payload (Get Goal Progress):
```json
{
  "overallProgress": 35,
  "daysRemaining": 22,
  "daysCompleted": 8,
  "goalProgress": [
    {
      "goal": "improve_sleep",
      "progress": 40,
      "metrics": {
        "journalMentions": 3,
        "reportedImprovement": true
      }
    },
    {
      "goal": "reduce_anxiety",
      "progress": 30,
      "metrics": {
        "journalMentions": 2,
        "reportedImprovement": false
      }
    },
    {
      "goal": "increase_productivity",
      "progress": 45,
      "metrics": {
        "journalMentions": 4,
        "reportedImprovement": true
      }
    },
    {
      "goal": "improve_relationships",
      "progress": 25,
      "metrics": {
        "journalMentions": 1,
        "reportedImprovement": false
      }
    },
    {
      "goal": "Spend more time outdoors",
      "progress": 35,
      "metrics": {
        "journalMentions": 2,
        "reportedImprovement": true
      }
    }
  ]
}
```

#### Database Schema (User Goals):
```sql
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  target_days INTEGER NOT NULL,
  target_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Goal Items):
```sql
CREATE TABLE goal_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_goal_id UUID REFERENCES user_goals(id) NOT NULL,
  goal_type VARCHAR(50) NOT NULL, -- 'predefined' or 'custom'
  goal_key VARCHAR(255) NOT NULL, -- predefined key or custom text
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Database Schema (Goal Progress):
```sql
CREATE TABLE goal_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_item_id UUID REFERENCES goal_items(id) NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  journal_mentions INTEGER DEFAULT 0,
  reported_improvement BOOLEAN DEFAULT FALSE,
  last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 9.3 Business Logic Requirements
- Setting up initial recovery goals during onboarding.
- Allowing users to update goals from profile settings.
- Calculating goal progress based on:
  - Clean streak progress toward target days
  - Journal entries mentioning specific goals
  - Mood improvements over time
  - Self-reported progress from check-ins
- Providing overall progress percentage toward recovery goals.
- Analyzing journal entries for mentions of goals (basic NLP).

### 9.4 Integration Requirements
- Background job for daily progress calculations.
- Basic NLP service for analyzing journal entries (optional).

## General Notes

- **Authentication:** All API endpoints requiring user authentication should use JWT (JSON Web Tokens) in the Authorization header.
- **Error Handling:** Implement consistent error responses with appropriate HTTP status codes and error messages.
- **Data Validation:** Enforce data validation rules on the server-side to ensure data integrity.
- **Rate Limiting:** Implement rate limiting to prevent abuse and ensure API availability.
- **Scalability:** Design the backend with scalability in mind, considering potential future growth in users and data volume.
- **Performance:** Optimize database queries and API responses for performance.
- **Security:** Implement security best practices to protect user data and prevent unauthorized access.