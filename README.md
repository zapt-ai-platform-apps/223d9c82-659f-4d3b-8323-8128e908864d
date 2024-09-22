# Joke App

This application allows users to view, create, and fetch jokes using a user-friendly interface.

## User Journeys

### 1. User Authentication

   1. Open the app.
   2. You are presented with a sign-in page titled **"Sign in with ZAPT"**.
   3. Click on one of the available social login providers: **Google**, **Facebook**, or **Apple**.
   4. Complete the authentication process.
   5. Upon successful sign-in, you are redirected to the home page.

### 2. Viewing Jokes from the Database

   1. On the home page, scroll down to the **"Jokes from Database"** section.
   2. View a list of jokes fetched from the database.
   3. Each joke displays its **setup** and **punchline**.

### 3. Adding a New Joke to the Database

   1. In the **"Jokes from Database"** section, locate the form at the top.
   2. Enter a **setup** for your joke in the first input field.
   3. Enter a **punchline** for your joke in the second input field.
   4. Click on the **"Add Joke"** button.
   5. Your joke is added to the database and appears at the top of the jokes list.

### 4. Fetching a Text Joke from ChatGPT

   1. On the home page, click the **"Get a Joke (Text)"** button.
   2. The button shows a loading state while fetching.
   3. A **"Text Joke"** section appears, displaying the joke in markdown format.

### 5. Fetching a JSON Joke from ChatGPT

   1. Click the **"Get a Joke (JSON)"** button.
   2. The button shows a loading state while fetching.
   3. A **"JSON Joke"** section appears, displaying the **setup**, **punchline**, and **category** of the joke.

### 6. Fetching an Animal Fact from an External API

   1. Click the **"Get Animal Fact"** button.
   2. The button shows a loading state while fetching.
   3. An **"Animal Fact"** section appears, displaying a random animal fact.

### 7. Incrementing the Counter

   1. Click the **"Increment"** button.
   2. The **"Count"** displayed at the top increases by one each time.

### 8. Signing Out

   1. Click the **"Sign Out"** button at the top right corner.
   2. You are signed out and redirected back to the sign-in page.

## Features

- User authentication with multiple providers.
- Viewing and adding jokes to a centralized database.
- Fetching jokes and facts using ChatGPT and external APIs.
- Responsive and user-friendly interface optimized for all screen sizes.
- Loading states to provide feedback during data fetching.
- Prevention of multiple clicks on buttons to avoid duplicate actions.

Enjoy using the Joke App and have fun laughing at the jokes!