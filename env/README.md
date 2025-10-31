# Aetheria Environment Configuration Templates

This folder contains environment configuration templates and examples for different deployment scenarios.

## Files in this folder:

- `development.env` - Development environment template
- `production.env` - Production environment template  
- `staging.env` - Staging environment template
- `docker.env` - Docker deployment environment template
- `firebase-config.json` - Firebase service account configuration example
- `README.md` - This environment setup guide

## Quick Setup:

1. Copy the appropriate template file to your project root as `.env.local`
2. Replace placeholder values with your actual configuration
3. Follow the setup guide below

## Environment Setup Guide

### 1. Development Environment

For local development, use the `development.env` template:

```bash
# Copy development template
cp env/development.env .env.local

# Edit with your actual values
nano .env.local
```

**Required for Development:**
- Firebase project with Authentication, Realtime Database, and Storage
- Google Cloud project with Vertex AI API enabled
- Local development server (Next.js dev server)

### 2. Staging Environment

For staging/testing, use the `staging.env` template:

```bash
# Copy staging template
cp env/staging.env .env.local

# Edit with your staging values
nano .env.local
```

**Required for Staging:**
- Separate Firebase project for staging
- Staging Google Cloud project
- Staging database and Redis instances

### 3. Production Environment

For production deployment, use the `production.env` template:

```bash
# Copy production template
cp env/production.env .env.local

# Edit with your production values
nano .env.local
```

**Required for Production:**
- Production Firebase project
- Production Google Cloud project
- Production database and Redis instances
- SSL certificates and domain configuration

### 4. Docker Deployment

For containerized deployments, use the `docker.env` template:

```bash
# Copy docker template
cp env/docker.env .env.local

# Set environment variables in your container orchestration
```

**Required for Docker:**
- Environment variables set in your container platform
- Docker secrets for sensitive data
- Container registry configuration

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Authentication, Realtime Database, and Storage

### 2. Get Configuration Values

1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Add app" > Web app
4. Copy the configuration values to your `.env.local`

### 3. Service Account (Optional)

For server-side operations, download the service account key:

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save as `firebase-config.json` (see example in this folder)

## Google Cloud Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable billing

### 2. Enable APIs

Enable the following APIs:
- Vertex AI API
- Cloud Storage API
- Cloud Functions API (if using)

### 3. Set up Authentication

1. Go to IAM & Admin > Service Accounts
2. Create a new service account
3. Download the JSON key file
4. Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

## Environment Variables Reference

### Core Firebase Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID

### Google Cloud Variables
- `GOOGLE_CLOUD_PROJECT_ID` - Google Cloud project ID
- `GOOGLE_CLOUD_REGION` - Google Cloud region
- `VERTEX_AI_LOCATION` - Vertex AI location
- `VERTEX_AI_MODEL_NAME` - Vertex AI model name

### Feature Flags
- `NEXT_PUBLIC_ENABLE_AI_GENERATION` - Enable AI asset generation
- `NEXT_PUBLIC_ENABLE_VOICE_CHAT` - Enable voice chat
- `NEXT_PUBLIC_ENABLE_PHYSICS` - Enable physics simulation
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable analytics

### Development Tools
- `NEXT_PUBLIC_DEBUG_MODE` - Enable debug mode
- `NEXT_PUBLIC_LOG_LEVEL` - Log level (debug, info, warn, error)
- `NEXT_PUBLIC_ENABLE_DEV_TOOLS` - Enable development tools

## Security Notes

- **Never commit actual environment files to version control**
- Use different configurations for different environments
- Rotate API keys regularly
- Use environment-specific Firebase projects
- Store sensitive data in secure environment variable systems
- Use Docker secrets for containerized deployments

## Troubleshooting

### Common Issues

1. **Firebase Connection Errors**
   - Check that all environment variables are set correctly
   - Verify Firebase project is active
   - Check Firebase security rules

2. **Google Cloud API Errors**
   - Verify APIs are enabled
   - Check authentication credentials
   - Ensure proper permissions are set

3. **Environment Variable Issues**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Check for typos in variable names
   - Verify values don't contain extra spaces or quotes

### Getting Help

- Check the Firebase Console for error logs
- Review Google Cloud Console for API issues
- Check browser console for client-side errors
- Refer to the main project README.md for detailed setup instructions
