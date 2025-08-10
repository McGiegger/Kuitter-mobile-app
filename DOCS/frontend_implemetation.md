comprehensive frontend implementation guide for the Kuitter app based on the provided project files and guidelines. This documentation will cover each screen, feature, data requirements, and user flows, providing a clear roadmap for backend integration.

1. Screen Breakdown
1.1 Auth Screens
1.1.1 app/(auth)/index.tsx (Welcome Screen)
Screen Name: Welcome Screen
Purpose: Introduces the app and provides options to sign in or sign up.
UI Components and Functionality:
LinearGradient: Background gradient.
SequentialTypeWriter: Animated text for the title and subtitle.
ChainBreakAnimation: Animated chain break graphic.
TouchableOpacity: Buttons for "Continue with Email" and "Continue with Google".
User Interactions and Expected Behaviors:
Tapping "Continue with Email" navigates to the app/(auth)/auth.tsx screen.
Tapping "Continue with Google" (currently non-functional) should initiate Google authentication.
Form Fields: None
State Management:
text state (using useState) to manage the title and subtitle text for the typewriter animation.
Navigation Flows and Conditions:
"Continue with Email" button navigates to app/(auth)/auth.tsx.
Data Requirements: None
1.1.2 app/(auth)/auth.tsx (Sign In/Sign Up Screen)
Screen Name: Authentication Screen
Purpose: Handles user sign-in and sign-up.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Fields for email and password (and confirm password for sign-up).
TouchableOpacity: Buttons for back navigation, password visibility toggle, submit, and toggle between sign-in/sign-up modes.
AlertCircle: Displays validation errors.
User Interactions and Expected Behaviors:
Entering email and password.
Toggling password visibility.
Submitting the form triggers validation and (simulated) authentication.
Toggling between sign-in and sign-up modes.
Form Fields:
email: Email address (validation: required, valid email format).
password: Password (validation: required, sign-up mode: minimum 8 characters, uppercase, lowercase, number, and special character).
confirmPassword: Confirm password (sign-up mode only, validation: must match password).
State Management:
mode: 'signin' | 'signup' (using useState) to manage the form mode.
email: Email input value (using useState).
password: Password input value (using useState).
confirmPassword: Confirm password input value (using useState).
showPassword: Boolean (using useState) to toggle password visibility.
errors: Object (using useState) to store validation errors.
isSubmitting: Boolean (using useState) to indicate submission state.
Navigation Flows and Conditions:
Back button navigates back.
Successful authentication navigates to /visibility.
Data Requirements:
API endpoint: (To be defined) for authentication.
Request payload: { email, password } (and confirmPassword for sign-up).
Response payload: (To be defined) Authentication token or user data.
1.1.3 app/(auth)/visibility.tsx (Visibility Settings Screen)
Screen Name: Visibility Settings Screen
Purpose: Allows the user to choose their profile visibility (public or anonymous).
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Options for "Public Profile" and "Stay Anonymous".
Eye, EyeOff: Icons to represent visibility options.
User Interactions and Expected Behaviors:
Selecting a visibility option.
Tapping "Continue" saves the visibility setting and navigates to the next screen.
Form Fields: None
State Management:
selectedOption: 'public' | 'anonymous' (using useState) to store the selected visibility option.
Navigation Flows and Conditions:
"Continue" button navigates to /onboarding if fromSettings is not true, otherwise navigates back.
Data Requirements:
API endpoint: (To be defined) for saving visibility settings.
Request payload: { visibility: 'public' | 'anonymous' }.
Response payload: Success/failure status.
1.1.4 app/(onboarding)/education.tsx (Education Screen)
Screen Name: Education Screen
Purpose: Educates the user about the effects of pornography.
UI Components and Functionality:
LinearGradient: Background gradient.
AnimatedIcon: Animated icon for each slide.
Text: Displays heading and content for each slide.
TouchableOpacity: "Next" button to advance through slides.
User Interactions and Expected Behaviors:
Tapping "Next" advances to the next slide.
On the last slide, tapping "Next" saves completion status and navigates to the goals screen.
Form Fields: None
State Management:
currentIndex: Number (using useState) to track the current slide index.
Navigation Flows and Conditions:
"Next" button navigates to the next slide or /goals on the last slide.
Data Requirements: None
1.1.5 app/(onboarding)/goals.tsx (Goal Setting Screen)
Screen Name: Goal Setting Screen
Purpose: Allows the user to set their recovery goals and timeline.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Options for selecting recovery goals.
Slider: To select the recovery timeline.
Text: Displays questions, options, and timeline values.
User Interactions and Expected Behaviors:
Selecting recovery goals.
Adjusting the timeline slider.
Tapping "Continue" advances through the steps.
On the last step, tapping "Begin My Journey" saves the goals and timeline and navigates to the main app.
Form Fields: None
State Management:
step: Number (using useState) to track the current step.
selectedGoals: Array of strings (using useState) to store selected goals.
timeline: Number (using useState) to store the selected timeline.
Navigation Flows and Conditions:
"Continue" button navigates to the next step or /(tabs) on the last step.
Data Requirements:
API endpoint: (To be defined) for saving recovery goals and timeline.
Request payload: { goals: string[], timeline: number }.
Response payload: Success/failure status.
1.2 Tab Screens
1.2.1 app/(tabs)/index.tsx (Dashboard Screen)
Screen Name: Dashboard Screen
Purpose: Provides an overview of the user's progress, quick actions, and partner information.
UI Components and Functionality:
LinearGradient: Background gradient.
AnimatedCircularProgress: Displays the current streak progress.
TouchableOpacity: Quick action buttons and partner card.
Switch: Toggle for "Felt or Feeling urges today?".
User Interactions and Expected Behaviors:
Selecting a mood.
Toggling the urge status.
Tapping quick action buttons navigates to the corresponding screens.
Tapping the partner card navigates to the partners screen.
Form Fields: None
State Management:
selectedMood: String | null (using useState) to store the selected mood.
experiencedUrges: Boolean (using useState) to store the urge status.
currentStreak: Number (using useState) to store the current streak.
bestStreak: Number (using useState) to store the best streak.
Navigation Flows and Conditions:
Quick action buttons navigate to the corresponding screens.
Partner card navigates to /partners.
Toggling "Felt or Feeling urges today?" navigates to /panic if true.
Data Requirements:
API endpoint: (To be defined) for saving daily check-in data.
Request payload: { mood: string, urges: boolean }.
Response payload: Success/failure status.
1.2.2 app/(tabs)/anchor.tsx (Anchor AI Chat Screen)
Screen Name: Anchor AI Chat Screen
Purpose: Provides a chat interface with an AI companion for support.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input field for typing messages.
TouchableOpacity: Send button and suggestion prompts.
ScrollView: Displays chat messages.
User Interactions and Expected Behaviors:
Typing and sending messages.
Tapping suggestion prompts to send pre-defined messages.
Form Fields: None
State Management:
message: String (using useState) to store the current message input.
messages: Array of Message objects (using useState) to store the chat history.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for sending messages to the AI and receiving responses.
Request payload: { message: string }.
Response payload: AI-generated response message.
1.2.3 app/(tabs)/community.tsx (Community Screen)
Screen Name: Community Screen
Purpose: Provides access to community features, including a feed, groups, and partner list.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Tab buttons, post actions, group cards, and partner cards.
TextInput: Search input for partners.
CreatePost: Modal for creating new posts.
Comments: Modal for viewing and adding comments.
User Interactions and Expected Behaviors:
Switching between tabs (Feed, Groups, Partners).
Searching for partners.
Creating new posts.
Liking posts and adding comments.
Joining groups.
Adding/removing partners.
Navigating to partner chat screens.
Form Fields: None
State Management:
searchQuery: String (using useState) to store the partner search query.
activeTab: 'feed' | 'groups' | 'partners' (using useState) to track the active tab.
showCreatePost: Boolean (using useState) to control the visibility of the create post modal.
showComments: Boolean (using useState) to control the visibility of the comments modal.
posts: Array of Post objects (using useState) to store the community feed.
localPartners: Array of Partner objects (using useState) to store the partner list.
Navigation Flows and Conditions:
Tapping a group card navigates to /group-chat/[id].
Tapping a partner card navigates to /(chat)/partner-chat/[id].
Data Requirements:
API endpoint: (To be defined) for fetching community feed.
Response payload: Array of Post objects.
API endpoint: (To be defined) for fetching group list.
Response payload: Array of Group objects.
API endpoint: (To be defined) for fetching partner list.
Response payload: Array of Partner objects.
API endpoint: (To be defined) for creating new posts.
Request payload: { content: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for liking posts.
Request payload: { postId: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for adding comments.
Request payload: { postId: string, content: string }.
Response payload: Success/failure status.
1.2.4 app/(tabs)/profile.tsx (Profile Screen)
Screen Name: Profile Screen
Purpose: Displays the user's profile information, recovery stats, goals, and achievements.
UI Components and Functionality:
LinearGradient: Background gradient.
Text: Displays user information, stats, goals, and achievements.
TouchableOpacity: Buttons for viewing the journal, triggers, and updating goals.
User Interactions and Expected Behaviors:
Tapping "View Recovery Journal" navigates to /journal.
Tapping "View Triggers" navigates to /triggers.
Tapping "Update Goals" navigates to /(onboarding)/goals.
Form Fields: None
State Management: None
Navigation Flows and Conditions:
"View Recovery Journal" button navigates to /journal.
"View Triggers" button navigates to /triggers.
"Update Goals" button navigates to /(onboarding)/goals.
Data Requirements:
API endpoint: (To be defined) for fetching user profile data.
Response payload: User profile object.
API endpoint: (To be defined) for fetching recovery stats.
Response payload: Recovery stats object.
API endpoint: (To be defined) for fetching recovery goals.
Response payload: Array of recovery goal objects.
API endpoint: (To be defined) for fetching achievements.
Response payload: Array of achievement objects.
1.2.5 app/(tabs)/settings.tsx (Settings Screen)
Screen Name: Settings Screen
Purpose: Allows the user to manage their account, preferences, and privacy settings.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Options for profile information, security, privacy settings, and deleting the account.
Switch: Toggles for notifications and dark mode.
Dialog: Confirmation dialogs for deleting the account and logging out.
User Interactions and Expected Behaviors:
Tapping options navigates to the corresponding settings screens.
Toggling notifications and dark mode.
Confirming or canceling account deletion and logout.
Form Fields: None
State Management:
notifications: Boolean (using useState) to store the notification preference.
Navigation Flows and Conditions:
"Profile Information" navigates to /(settings)/profile.
"Security" navigates to /(settings)/security.
"Privacy Settings" navigates to /(auth)/visibility with fromSettings=true.
Data Requirements:
API endpoint: (To be defined) for saving notification preferences.
Request payload: { notifications: boolean }.
Response payload: Success/failure status.
API endpoint: (To be defined) for deleting the account.
Response payload: Success/failure status.
API endpoint: (To be defined) for logging out.
Response payload: Success/failure status.
1.3 Other Screens
1.3.1 app/breathing.tsx (Breathing Exercise Screen)
Screen Name: Breathing Exercise Screen
Purpose: Guides the user through a breathing exercise.
UI Components and Functionality:
LinearGradient: Background gradient.
Animated.View: Animated circles for visual guidance.
Text: Displays instructions and round information.
TouchableOpacity: Start button.
User Interactions and Expected Behaviors:
Tapping "Begin Exercise" starts the breathing exercise.
Following the on-screen instructions for inhaling, holding, exhaling, and resting.
Form Fields: None
State Management:
phase: 'inhale' | 'hold' | 'exhale' | 'rest' (using useState) to track the current phase of the exercise.
round: Number (using useState) to track the current round.
isActive: Boolean (using useState) to indicate whether the exercise is active.
Navigation Flows and Conditions: None
Data Requirements: None
1.3.2 app/exercise.tsx (Exercise Selection Screen)
Screen Name: Exercise Selection Screen
Purpose: Allows the user to select a quick exercise.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Exercise cards.
Text: Displays exercise information.
User Interactions and Expected Behaviors:
Tapping an exercise card navigates to the corresponding exercise detail screen.
Form Fields: None
State Management: None
Navigation Flows and Conditions:
Tapping an exercise card navigates to /exercise/[id].
Data Requirements: None
1.3.3 app/exercise/[id].tsx (Exercise Detail Screen)
Screen Name: Exercise Detail Screen
Purpose: Provides detailed instructions and benefits for a selected exercise.
UI Components and Functionality:
LinearGradient: Background gradient.
Animated.View: Animated icon.
Text: Displays exercise steps and benefits.
User Interactions and Expected Behaviors:
Viewing exercise steps and benefits.
Form Fields: None
State Management:
currentStep: Number (using useState) to track the current step.
Navigation Flows and Conditions: None
Data Requirements: None
1.3.4 app/group-chat/[id].tsx (Group Chat Screen)
Screen Name: Group Chat Screen
Purpose: Provides a chat interface for a specific group.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input field for typing messages.
TouchableOpacity: Send button and message actions (like, comment, share).
ScrollView: Displays chat messages.
Comments: Modal for viewing and adding comments.
User Interactions and Expected Behaviors:
Typing and sending messages.
Liking messages, adding comments, and sharing messages.
Form Fields: None
State Management:
newMessage: String (using useState) to store the current message input.
localMessages: Array of Message objects (using useState) to store the chat history.
showComments: Boolean (using useState) to control the visibility of the comments modal.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for sending messages to the group and receiving responses.
Request payload: { groupId: string, message: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for liking messages.
Request payload: { messageId: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for adding comments.
Request payload: { messageId: string, content: string }.
Response payload: Success/failure status.
1.3.5 app/journal-entry.tsx (Journal Entry Screen)
Screen Name: Journal Entry Screen
Purpose: Allows the user to create a journal entry.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input field for writing the journal entry.
TouchableOpacity: Save button.
Text: Displays mood, urge status, and character count.
User Interactions and Expected Behaviors:
Writing the journal entry.
Tapping "Save Entry" saves the entry and navigates back.
Form Fields: None
State Management:
entry: String (using useState) to store the journal entry text.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for saving the journal entry.
Request payload: { mood: string, urges: boolean, entry: string }.
Response payload: Success/failure status.
1.3.6 app/journal.tsx (Journal Screen)
Screen Name: Journal Screen
Purpose: Displays a list of previous journal entries.
UI Components and Functionality:
LinearGradient: Background gradient.
ScrollView: Displays the list of journal entries.
Text: Displays entry information (date, mood, urge status, entry text).
User Interactions and Expected Behaviors:
Viewing previous journal entries.
Form Fields: None
State Management: None
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for fetching journal entries.
Response payload: Array of journal entry objects.
1.3.7 app/panic.tsx (Panic Screen)
Screen Name: Panic Screen
Purpose: Provides immediate support and resources during a moment of crisis.
UI Components and Functionality:
LinearGradient: Background gradient.
Animated.View: Animated elements for visual emphasis.
Text: Displays warning messages and recovery goals.
TouchableOpacity: Buttons for staying strong, messaging a partner, breathing exercises, and journaling.
User Interactions and Expected Behaviors:
Tapping "I WILL STAY STRONG" navigates back.
Tapping other buttons navigates to the corresponding support resources.
Form Fields: None
State Management: None
Navigation Flows and Conditions:
"I WILL STAY STRONG" button navigates back.
"Msg Partner" button navigates to /partner-chat/1.
"Breathe" button navigates to /breathing.
"Journal" button navigates to /journal.
Data Requirements: None
1.3.8 app/partner-chat/[id].tsx (Partner Chat Screen)
Screen Name: Partner Chat Screen
Purpose: Provides a chat interface with a specific accountability partner.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input field for typing messages.
TouchableOpacity: Send button.
ScrollView: Displays chat messages.
User Interactions and Expected Behaviors:
Typing and sending messages.
Form Fields: None
State Management:
newMessage: String (using useState) to store the current message input.
messages: Array of Message objects (using useState) to store the chat history.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for sending messages to the partner and receiving responses.
Request payload: { partnerId: string, message: string }.
Response payload: Success/failure status.
1.3.9 app/partners.tsx (Partners Screen)
Screen Name: Partners Screen
Purpose: Displays a list of accountability partners and allows the user to manage them.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Partner cards and action buttons (chat, remove).
ScrollView: Displays the list of partners.
Dialog: Confirmation dialog for removing a partner.
User Interactions and Expected Behaviors:
Tapping a partner card navigates to the partner chat screen.
Tapping "Chat" navigates to the partner chat screen.
Tapping "Remove" initiates the partner removal process.
Form Fields: None
State Management:
showRemoveDialog: Boolean (using useState) to control the visibility of the remove partner dialog.
Navigation Flows and Conditions:
Tapping a partner card navigates to /partner-chat/[id].
Data Requirements:
API endpoint: (To be defined) for fetching the partner list.
Response payload: Array of partner objects.
API endpoint: (To be defined) for removing a partner.
Request payload: { partnerId: string }.
Response payload: Success/failure status.
1.3.10 app/paywall.tsx (Paywall Screen)
Screen Name: Paywall Screen
Purpose: Promotes premium features and handles subscription activation.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Plan cards and subscribe button.
Text: Displays feature descriptions and plan details.
User Interactions and Expected Behaviors:
Selecting a subscription plan.
Tapping "Start Premium Now" initiates the subscription process.
Form Fields: None
State Management:
selectedPlan: 'monthly' | 'yearly' (using useState) to store the selected plan.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for activating the subscription.
Request payload: { planId: string }.
Response payload: Success/failure status.
1.3.11 app/trigger-log.tsx (Trigger Log Screen)
Screen Name: Trigger Log Screen
Purpose: Allows the user to log triggers and track their responses.
UI Components and Functionality:
LinearGradient: Background gradient.
TouchableOpacity: Trigger buttons and location buttons.
TextInput: Input field for additional notes.
Switch: Toggle for "Did you overcome this trigger?".
User Interactions and Expected Behaviors:
Selecting triggers and a location.
Entering additional notes.
Toggling the "overcame" status.
Tapping "Save Trigger Log" saves the log and navigates back.
Form Fields: None
State Management:
selectedTriggers: Array of strings (using useState) to store selected triggers.
selectedLocation: String | null (using useState) to store the selected location.
notes: String (using useState) to store the additional notes.
overcame: Boolean (using useState) to store the "overcame" status.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for saving the trigger log.
Request payload: { triggers: string[], location: string, notes: string, overcame: boolean }.
Response payload: Success/failure status.
1.3.12 app/triggers.tsx (Triggers Screen)
Screen Name: Triggers Screen
Purpose: Displays a summary of trigger statistics and a log of previous triggers.
UI Components and Functionality:
LinearGradient: Background gradient.
Text: Displays trigger statistics and log information.
TouchableOpacity: Filter buttons and log entries.
User Interactions and Expected Behaviors:
Filtering the trigger log by "all", "overcome", or "failed".
Tapping "Log New Trigger" navigates to /trigger-log.
Form Fields: None
State Management:
filter: 'all' | 'overcome' | 'failed' (using useState) to store the filter setting.
Navigation Flows and Conditions:
"Log New Trigger" button navigates to /trigger-log.
Data Requirements:
API endpoint: (To be defined) for fetching trigger statistics.
Response payload: Trigger statistics object.
API endpoint: (To be defined) for fetching trigger logs.
Response payload: Array of trigger log objects.
1.3.13 app/(settings)/profile.tsx (Profile Information Screen)
Screen Name: Profile Information Screen
Purpose: Allows the user to view and edit their profile information.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input fields for name, email, username, and age.
TouchableOpacity: Image picker and save button.
Image: Displays the profile image.
User Interactions and Expected Behaviors:
Editing profile information.
Selecting a new profile image.
Tapping "Save Changes" saves the profile information and navigates back.
Form Fields:
name: Full name (validation: required).
email: Email address (validation: required, valid email format).
username: Username (validation: required).
age: Age (validation: required, numeric).
State Management:
name: String (using useState) to store the name.
email: String (using useState) to store the email.
username: String (using useState) to store the username.
age: String (using useState) to store the age.
profileImage: String | null (using useState) to store the profile image URI.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for fetching user profile data.
Response payload: User profile object.
API endpoint: (To be defined) for saving user profile data.
Request payload: { name: string, email: string, username: string, age: number, profileImage: string }.
Response payload: Success/failure status.
1.3.14 app/(settings)/security.tsx (Security Settings Screen)
Screen Name: Security Settings Screen
Purpose: Allows the user to change their password.
UI Components and Functionality:
LinearGradient: Background gradient.
TextInput: Input fields for current password, new password, and confirm new password.
TouchableOpacity: Change password button.
Text: Displays password requirements and error messages.
User Interactions and Expected Behaviors:
Entering current password, new password, and confirm new password.
Tapping "Change Password" validates the input and (simulated) changes the password.
Form Fields:
currentPassword: Current password (validation: required).
newPassword: New password (validation: required, minimum 8 characters, uppercase, lowercase, number, and special character).
confirmPassword: Confirm new password (validation: required, must match new password).
State Management:
currentPassword: String (using useState) to store the current password.
newPassword: String (using useState) to store the new password.
confirmPassword: String (using useState) to store the confirm new password.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for changing the password.
Request payload: { currentPassword: string, newPassword: string }.
Response payload: Success/failure status.
1.4 Components
1.4.1 components/Comments.tsx (Comments Component)
Component Name: Comments
Purpose: Displays a list of comments and allows the user to add new comments.
UI Components and Functionality:
Modal: Displays the comments in a modal.
TextInput: Input field for typing new comments.
TouchableOpacity: Send button.
ScrollView: Displays the list of comments.
User Interactions and Expected Behaviors:
Typing and sending new comments.
Form Fields: None
State Management:
newComment: String (using useState) to store the current comment input.
localComments: Array of Comment objects (using useState) to store the comments.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for adding a comment.
Request payload: { content: string }.
Response payload: Success/failure status.
1.4.2 components/CreatePost.tsx (Create Post Component)
Component Name: CreatePost
Purpose: Allows the user to create a new post in the community feed.
UI Components and Functionality:
Modal: Displays the create post form in a modal.
TextInput: Input field for typing the post content.
TouchableOpacity: Post and cancel buttons.
User Interactions and Expected Behaviors:
Typing the post content.
Tapping "Post" submits the post and closes the modal.
Tapping "Cancel" closes the modal without saving.
Form Fields: None
State Management:
content: String (using useState) to store the post content.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for creating a new post.
Request payload: { content: string }.
Response payload: Success/failure status.
1.4.3 components/Dialog.tsx (Dialog Component)
Component Name: Dialog
Purpose: Displays a confirmation dialog with customizable title, message, and buttons.
UI Components and Functionality:
Modal: Displays the dialog in a modal.
Text: Displays the title and message.
TouchableOpacity: Confirm and cancel buttons.
User Interactions and Expected Behaviors:
Tapping "Confirm" triggers the onConfirm callback.
Tapping "Cancel" triggers the onCancel callback.
Form Fields: None
State Management: None
Navigation Flows and Conditions: None
Data Requirements: None
1.4.4 components/Journal.tsx (Journal Component)
Component Name: Journal
Purpose: Allows the user to create a journal entry.
UI Components and Functionality:
Modal: Displays the journal entry form in a modal.
TextInput: Input field for writing the journal entry.
TouchableOpacity: Save and cancel buttons.
Text: Displays mood, urge status, and character count.
User Interactions and Expected Behaviors:
Writing the journal entry.
Tapping "Save Entry" saves the entry and closes the modal.
Tapping "Cancel" closes the modal without saving.
Form Fields: None
State Management:
entry: String (using useState) to store the journal entry text.
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for saving the journal entry.
Request payload: { mood: string, urges: boolean, entry: string }.
Response payload: Success/failure status.
1.4.5 components/PartnershipRequest.tsx (Partnership Request Component)
Component Name: PartnershipRequest
Purpose: Displays a partnership request and allows the user to accept or decline it.
UI Components and Functionality:
Modal: Displays the request in a modal.
Text: Displays partner information and the request message.
TouchableOpacity: Accept and decline buttons.
User Interactions and Expected Behaviors:
Tapping "Accept" accepts the request and closes the modal.
Tapping "Decline" declines the request and closes the modal.
Form Fields: None
State Management: None
Navigation Flows and Conditions: None
Data Requirements:
API endpoint: (To be defined) for accepting the partnership request.
Request payload: { partnerId: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for declining the partnership request.
Request payload: { partnerId: string }.
Response payload: Success/failure status.
1.4.6 components/PartnershipRequestNotification.tsx (Partnership Request Notification Component)
Component Name: PartnershipRequestNotification
Purpose: Displays a notification for a new partnership request.
UI Components and Functionality:
View: Container for the notification.
Text: Displays partner information and the request message.
TouchableOpacity: Accept and decline buttons.
User Interactions and Expected Behaviors:
Tapping "Accept" accepts the request and navigates to the partner chat screen.
Tapping "Decline" declines the request and closes the notification.
Form Fields: None
State Management: None
Navigation Flows and Conditions:
Tapping "Accept" navigates to /partner-chat/[id].
Data Requirements:
API endpoint: (To be defined) for accepting the partnership request.
Request payload: { partnerId: string }.
Response payload: Success/failure status.
API endpoint: (To be defined) for declining the partnership request.
Request payload: { partnerId: string }.
Response payload: Success/failure status.
2. Feature Details
2.1 Authentication
Functionality Description: Allows users to create an account and log in to the app.
Required Data Structures:
User object: { id: string, email: string, username: string, profileImage: string }.
Business Logic and Validation Rules:
Email validation: Must be a valid email format.
Password validation: Minimum 8 characters, uppercase, lowercase, number, and special character.
Confirm password validation: Must match the password.
Error Handling Scenarios:
Invalid email or password.
Account already exists.
Network errors.
Success/Failure States:
Success: User is logged in and redirected to the main app.
Failure: Error message is displayed.
2.2 Daily Check-In
Functionality Description: Allows users to record their mood and urge status for the day.
Required Data Structures:
Check-in object: { date: string, mood: string, urges: boolean }.
Business Logic and Validation Rules:
Mood selection: Must select one mood.
Urge status: Must indicate whether urges were experienced.
Error Handling Scenarios:
Network errors.
Success/Failure States:
Success: Check-in data is saved.
Failure: Error message is displayed.
2.3 Trigger Logging
Functionality Description: Allows users to log triggers and track their responses.
Required Data Structures:
Trigger log object: { date: string, triggers: string[], location: string, notes: string, overcame: boolean }.
Business Logic and Validation Rules:
Triggers selection: Must select at least one trigger.
Location selection: Must select a location.
Error Handling Scenarios:
Network errors.
Success/Failure States:
Success: Trigger log is saved.
Failure: Error message is displayed.
2.4 Partner Management
Functionality Description: Allows users to add, remove, and chat with accountability partners.
Required Data Structures:
Partner object: { id: string, name: string, avatar: string, isAnonymous: boolean, streak: number, status: 'online' | 'offline' }.
Business Logic and Validation Rules:
Maximum number of partners: 5.
Error Handling Scenarios:
Network errors.
Partner limit reached.
Success/Failure States:
Success: Partner is added/removed.
Failure: Error message is displayed.
2.5 Subscription Management
Functionality Description: Allows users to subscribe to premium features.
Required Data Structures:
Subscription object: { planId: string, status: 'active' | 'inactive' }.
Business Logic and Validation Rules:
Payment processing.
Error Handling Scenarios:
Payment failure.
Network errors.
Success/Failure States:
Success: Subscription is activated.
Failure: Error message is displayed.
3. Data Requirements
3.1 API Endpoints
| Endpoint                               | Method | Description