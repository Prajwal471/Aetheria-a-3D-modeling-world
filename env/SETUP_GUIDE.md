# 🔥 Complete Guide: Where to Get All Environment Variable Values

## Quick Reference - Firebase Configuration

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Project name: `aetheria-dev` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Get Firebase Config Values
1. In Firebase Console, click **gear icon (⚙️)** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → **Web app (</>)** 
4. App nickname: `aetheria-web`
5. Click **"Register app"**
6. **Copy the config object** - you'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",                    // ← NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "your-project.firebaseapp.com", // ← NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  
  projectId: "your-project-id",           // ← NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "your-project.appspot.com", // ← NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789",          // ← NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789:web:abcdef123456"    // ← NEXT_PUBLIC_FIREBASE_APP_ID
};
```

### Step 3: Enable Firebase Services
1. **Authentication**: Authentication → Sign-in method → Enable Email/Password
2. **Database**: Realtime Database → Create Database → Start in test mode  
3. **Storage**: Storage → Get started → Start in test mode

## ☁️ Google Cloud Configuration

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Select a project"** → **"New Project"**
3. Project name: Same as Firebase project
4. Click **"Create"**

### Step 2: Enable APIs
1. Go to **"APIs & Services"** → **"Library"**
2. Search **"Vertex AI API"** → Click → **Enable**
3. Search **"Cloud Storage API"** → Click → **Enable**

### Step 3: Get Project ID
1. Go to **"IAM & Admin"** → **"Settings"**
2. Copy the **"Project ID"** (this is your `GOOGLE_CLOUD_PROJECT_ID`)

## 📝 Complete Environment Variable Mapping

| Environment Variable | Where to Find | Example Value |
|---------------------|---------------|---------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → General → Your apps → Web app config | `AIzaSyC...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same location | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same location | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Same location | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same location | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same location | `1:123456789:web:abcdef123456` |
| `GOOGLE_CLOUD_PROJECT_ID` | Google Cloud Console → IAM & Admin → Settings | `your-project-id` |
| `GOOGLE_CLOUD_REGION` | Keep default | `us-central1` |
| `VERTEX_AI_LOCATION` | Keep default | `us-central1` |

## 🚀 Quick Setup Steps

1. **Copy development template**:
   ```bash
   cp env/development.env .env.local
   ```

2. **Edit .env.local with your actual values**:
   ```env
   # Replace these with your actual Firebase values
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC... # From Firebase config
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com # From Firebase config
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id # From Firebase config
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com # From Firebase config
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 # From Firebase config
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456 # From Firebase config

   # Replace with your Google Cloud project ID
   GOOGLE_CLOUD_PROJECT_ID=your-project-id # Same as Firebase project ID
   ```

3. **Test your setup**:
   ```bash
   npm run dev
   ```

## 🔧 Fixed Hydration Issues

The hydration mismatch error has been fixed by:
- Adding `suppressHydrationWarning={true}` to form elements
- Using proper client-side mounting for dynamic components
- Preventing server/client rendering differences

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Firebase config values copied to `.env.local`
- [ ] Firebase services enabled (Auth, Database, Storage)
- [ ] Google Cloud project created
- [ ] Vertex AI API enabled
- [ ] `.env.local` file created with correct values
- [ ] Development server starts without errors
- [ ] No hydration mismatch errors
- [ ] Can sign up/sign in successfully

## 🆘 Still Having Issues?

1. **Check browser console** for specific error messages
2. **Verify all environment variables** are set correctly
3. **Ensure Firebase services** are enabled
4. **Check Google Cloud APIs** are enabled
5. **Restart development server** after changing environment variables
