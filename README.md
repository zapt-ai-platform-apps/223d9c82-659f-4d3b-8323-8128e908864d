# Joke Central Application

Welcome to **Joke Central**, an interactive platform where users can create, save, and explore jokes. This application offers a variety of features designed to enhance user experience and engagement.

## User Journeys

### 1. Account Sign-Up and Sign-In

- **Step 1:** Open the application.
- **Step 2:** Click on "Sign in with ZAPT" to initiate the authentication process.
- **Step 3:** Use one of the provided social login options (Google, Facebook, Apple) or the magic link feature to sign in.
- **Step 4:** Upon successful authentication, you are redirected to the home page.

### 2. Adding a New Joke Manually

- **Step 1:** On the home page, navigate to the "Add New Joke" section.
- **Step 2:** Enter the joke setup in the "Setup" input field.
- **Step 3:** Enter the punchline in the "Punchline" input field.
- **Step 4:** Click the "Save Joke" button.
- **Step 5:** The joke is saved and appears in your "Joke List".

### 3. Generating a Joke Using AI

- **Step 1:** In the "Add New Joke" section, click the "Generate Joke" button.
- **Step 2:** Wait for the AI to generate a new joke (loading state displayed).
- **Step 3:** The generated joke populates the "Setup" and "Punchline" fields.
- **Step 4:** (Optional) Review or edit the joke as desired.
- **Step 5:** Click the "Save Joke" button to save it to your list.

### 4. Viewing Your Jokes

- **Step 1:** Navigate to the "Joke List" section.
- **Step 2:** Scroll through your saved jokes.
- **Step 3:** Jokes are displayed with their setup and punchline.

### 5. Using Additional Features

#### a. Generating an Image

- **Step 1:** Click on the "Generate Image" button in the "Additional Features" section.
- **Step 2:** Wait for the image to be generated (loading state displayed).
- **Step 3:** The generated image appears below, showcasing a funny cartoon character telling a joke.

#### b. Text to Speech

- **Prerequisite:** Ensure a joke is present in the "Setup" and "Punchline" fields.
- **Step 1:** Click the "Text to Speech" button.
- **Step 2:** Wait for the audio to be generated (loading state displayed).
- **Step 3:** An audio player appears, allowing you to listen to the joke being read aloud.

#### c. Generating a Markdown Story

- **Step 1:** Click on "Generate Markdown" in the "Additional Features" section.
- **Step 2:** Wait for the markdown content to be generated (loading state displayed).
- **Step 3:** A witty, markdown-formatted story about a comedian appears for you to read.

#### d. Calling an External API

- **Step 1:** Click on the "Call API" button.
- **Step 2:** Wait for the API response (loading state displayed).
- **Step 3:** The current weather information for New York City is displayed in JSON format.

### 6. Sign Out

- **Step 1:** Click the "Sign Out" button located at the top-right corner of the home page.
- **Step 2:** You are signed out and redirected back to the login page.

## Design and Responsiveness

- The application features a clean, user-friendly interface with a pleasing color gradient background.
- Buttons are prominently styled, indicating interactivity with hover effects and cursor changes.
- The layout is responsive, adjusting seamlessly across different screen sizes, ensuring accessibility on both desktops and mobile devices.

## Notes

- **Loading States:** All API calls provide visual feedback during processing to enhance the user experience.
- **Input Validation:** Required fields are enforced, ensuring that jokes have both a setup and punchline before saving.
- **Prevent Duplicate Actions:** Buttons are disabled during loading to prevent multiple submissions or actions.
- **Accessibility:** Text colors and sizes are chosen for readability, and interactive elements are easily identifiable.

Enjoy crafting and sharing your humor on Joke Central!