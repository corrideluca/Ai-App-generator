# Chat-Based AI Editing App

Welcome to the Chat-Based AI Editing App! This app allows users to interact with an AI model to modify the application's behavior via chat. Below you'll find instructions on how to set up the project and utilize its features.

## Setup

1. **Clone the Repository**: Start by cloning this repository to your local machine:

   \`\`\`
   git clone <repository_url>
   \`\`\`

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

   \`\`\`
   cd chat-based-ai-editing-app
   npm install
   \`\`\`

3. **Environment Variables**: Set up your environment variables. You'll need to create a \`.env\` file in the root directory of your project and add the following variables:

   \`\`\`
   EXPO_PUBLIC_OPENAI_API_KEY=<your_openai_api_key>
   EXPO_PUBLIC_OPENAI_ORG_KEY=<your_openai_org_key>
   EXPO_PUBLIC_FIREBASE_IOS_KEY=<your_firebase_ios_key>
   EXPO_PUBLIC_FIREBASE_ANDROID_KEY=<your_firebase_android_key>
   EXPO_PUBLIC_FIREBASE_IOS_APP_ID=<your_firebase_ios_app_id>
   EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID=<your_firebase_android_app_id>
   \`\`\`

   Replace <your_openai_api_key>, <your_openai_org_key>, <your_firebase_ios_key>, <your_firebase_android_key>, <your_firebase_ios_app_id>, and <your_firebase_android_app_id> with your actual API keys and IDs.

## Running the App

- **iOS**: Run the following command to start the app on an iOS simulator:

  \`\`\`
  npm run ios
  \`\`\`

- **Android**: Run the following command to start the app on an Android emulator:

  \`\`\`
  npm run android
  \`\`\`

- **Web**: You can also run the app in a web browser using Expo's web interface:

  \`\`\`
  npm run web
  \`\`\`

## Usage

Once the app is running, users can interact with the AI model through the chat interface. Every submission in the chat modifies the AI, which in turn updates the behavior of the application.

## Scripts

- \`start\`: Starts the Expo development server.
- \`android\`: Runs the app on an Android emulator.
- \`ios\`: Runs the app on an iOS simulator.
- \`web\`: Starts the app in a web browser.

## Additional Notes

- This app is built using Expo, which allows for cross-platform development for iOS, Android, and web.
- Make sure to handle sensitive information securely, especially when dealing with API keys and authentication tokens.

## Support

For any issues or inquiries, please contact [your_email@example.com](mailto:corrideluca@gmail.com).
