# Aetheria Configuration Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

### Firebase Configuration
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Google Cloud Configuration
```env
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_REGION=us-central1
VERTEX_AI_LOCATION=us-central1
```

## Firebase Setup Instructions

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password provider
   - Enable Google provider (optional)

3. **Enable Realtime Database**
   - Go to Realtime Database
   - Click "Create Database"
   - Choose "Start in test mode" for development

4. **Enable Storage**
   - Go to Storage
   - Click "Get started"
   - Choose "Start in test mode" for development

5. **Get Configuration Values**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" > Web app
   - Copy the configuration values to your `.env.local` file

## Google Cloud Setup Instructions

1. **Create a Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing one

2. **Enable Vertex AI API**
   - Go to APIs & Services > Library
   - Search for "Vertex AI API"
   - Click "Enable"

3. **Set up Authentication**
   - Go to IAM & Admin > Service Accounts
   - Create a new service account
   - Download the JSON key file
   - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable

## Development vs Production

### Development Mode
- Use Firebase test mode for database and storage rules
- Use local development server
- Enable all feature flags for testing

### Production Mode
- Set up proper Firebase security rules
- Use production Google Cloud project
- Configure proper CORS settings
- Set up monitoring and logging

## Troubleshooting

### Common Issues

1. **Firebase Connection Errors**
   - Check that all environment variables are set correctly
   - Verify Firebase project is active
   - Check Firebase security rules

2. **Authentication Issues**
   - Ensure Authentication is enabled in Firebase
   - Check that the domain is authorized
   - Verify API keys are correct

3. **Database Permission Errors**
   - Check Realtime Database rules
   - Ensure user is authenticated
   - Verify data structure matches expected format

4. **AI Generation Not Working**
   - Verify Vertex AI API is enabled
   - Check Google Cloud authentication
   - Ensure proper permissions are set

### Getting Help

- Check the Firebase Console for error logs
- Review Google Cloud Console for API issues
- Check browser console for client-side errors
- Refer to the main README.md for detailed setup instructions
