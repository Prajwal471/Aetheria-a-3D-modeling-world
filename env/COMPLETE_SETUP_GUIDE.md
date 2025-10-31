# 🔥 Complete Step-by-Step Guide: Where to Get ALL Environment Values

## 🚀 Quick Start (15 minutes total)

### Step 1: Firebase Setup (8 minutes)

#### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** (or "Add project")
3. **Project name**: `aetheria-dev` (or your preferred name)
4. **Enable Google Analytics**: Optional (recommended: Yes)
5. Click **"Create project"**
6. Wait for project creation (30 seconds)

#### 1.2 Get Firebase Configuration Values
1. In your Firebase project dashboard, click the **⚙️ gear icon** (top left)
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** → **Web app** (</> icon)
5. **App nickname**: `aetheria-web`
6. **Register app**: Click "Register app"
7. **Copy the config object** - it looks like this:

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

#### 1.3 Enable Firebase Services
1. **Authentication**:
   - Go to **Authentication** (left sidebar)
   - Click **"Get started"**
   - Go to **"Sign-in method"** tab
   - Enable **"Email/Password"**
   - Click **"Save"**

2. **Realtime Database**:
   - Go to **Realtime Database** (left sidebar)
   - Click **"Create Database"**
   - Choose **"Start in test mode"** (for development)
   - Choose **"us-central1"** region
   - Click **"Done"**

3. **Storage**:
   - Go to **Storage** (left sidebar)
   - Click **"Get started"**
   - Choose **"Start in test mode"** (for development)
   - Choose **"us-central1"** region
   - Click **"Done"**

### Step 2: Google Cloud Setup (5 minutes)

#### 2.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Select a project"** dropdown (top bar)
3. Click **"New Project"**
4. **Project name**: Same as Firebase project (`aetheria-dev`)
5. Click **"Create"**
6. Wait for project creation (30 seconds)

#### 2.2 Enable Required APIs
1. Go to **"APIs & Services"** → **"Library"** (left sidebar)
2. Search **"Vertex AI API"**:
   - Click on **"Vertex AI API"**
   - Click **"Enable"**
   - Wait for activation (30 seconds)

3. Search **"Cloud Storage API"**:
   - Click on **"Cloud Storage API"**
   - Click **"Enable"**
   - Wait for activation (30 seconds)

#### 2.3 Get Project ID
1. Go to **"IAM & Admin"** → **"Settings"** (left sidebar)
2. Copy the **"Project ID"** (this is your `GOOGLE_CLOUD_PROJECT_ID`)

### Step 3: Create Your Environment File (2 minutes)

#### 3.1 Copy Template
```bash
# In your project root directory
cp env/development.env .env.local
```

#### 3.2 Edit .env.local with Your Values
Replace the placeholder values with your actual Firebase values:

```env
# Firebase Configuration (Replace with your actual values from Step 1.2)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC... # From firebaseConfig.apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com # From firebaseConfig.authDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id # From firebaseConfig.projectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com # From firebaseConfig.storageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 # From firebaseConfig.messagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456 # From firebaseConfig.appId

# Google Cloud Configuration (Replace with your actual values from Step 2.3)
GOOGLE_CLOUD_PROJECT_ID=your-project-id # Same as Firebase project ID
GOOGLE_CLOUD_REGION=us-central1 # Keep as is
VERTEX_AI_LOCATION=us-central1 # Keep as is
```

## 📋 Complete Value Mapping Table

| Environment Variable | Where to Find | Example Value | Required |
|---------------------|---------------|---------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings → Web app config → apiKey | `AIzaSyC...` | ✅ Required |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Console → Project Settings → Web app config → authDomain | `your-project.firebaseapp.com` | ✅ Required |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Console → Project Settings → Web app config → projectId | `your-project-id` | ✅ Required |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Console → Project Settings → Web app config → storageBucket | `your-project.appspot.com` | ✅ Required |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Project Settings → Web app config → messagingSenderId | `123456789` | ✅ Required |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Console → Project Settings → Web app config → appId | `1:123456789:web:abcdef123456` | ✅ Required |
| `GOOGLE_CLOUD_PROJECT_ID` | Google Cloud Console → IAM & Admin → Settings → Project ID | `your-project-id` | ✅ Required |
| `GOOGLE_CLOUD_REGION` | Keep default | `us-central1` | ✅ Required |
| `VERTEX_AI_LOCATION` | Keep default | `us-central1` | ✅ Required |

## 🎯 Optional Values (Can be left as defaults)

| Variable | Default Value | Purpose |
|----------|---------------|---------|
| `NEXT_PUBLIC_DEBUG_MODE` | `true` | Enable debug logging |
| `NEXT_PUBLIC_LOG_LEVEL` | `debug` | Log level |
| `NEXT_PUBLIC_ENABLE_AI_GENERATION` | `true` | Enable AI features |
| `NEXT_PUBLIC_ENABLE_VOICE_CHAT` | `true` | Enable voice chat |
| `NEXT_PUBLIC_ENABLE_PHYSICS` | `true` | Enable physics simulation |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Enable analytics |

## 🔍 Exact Locations with Screenshots

### Firebase Console Locations:

1. **Project Settings**: 
   - URL: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general`
   - Look for: ⚙️ gear icon → Project settings

2. **Web App Config**:
   - Scroll to: "Your apps" section
   - Click: "Add app" → Web app (</>)
   - Copy: The entire `firebaseConfig` object

3. **Authentication**:
   - URL: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/providers`
   - Enable: Email/Password provider

4. **Database**:
   - URL: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/database`
   - Create: Realtime Database in test mode

5. **Storage**:
   - URL: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/storage`
   - Create: Storage bucket in test mode

### Google Cloud Console Locations:

1. **Project Selection**:
   - URL: `https://console.cloud.google.com`
   - Look for: Project dropdown (top bar)

2. **API Library**:
   - URL: `https://console.cloud.google.com/apis/library`
   - Search: "Vertex AI API" and "Cloud Storage API"

3. **Project Settings**:
   - URL: `https://console.cloud.google.com/iam-admin/settings`
   - Copy: Project ID

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Firebase web app registered
- [ ] Firebase config values copied
- [ ] Authentication enabled (Email/Password)
- [ ] Realtime Database created (test mode)
- [ ] Storage created (test mode)
- [ ] Google Cloud project created
- [ ] Vertex AI API enabled
- [ ] Cloud Storage API enabled
- [ ] Google Cloud Project ID copied
- [ ] `.env.local` file created with correct values
- [ ] Development server starts without errors
- [ ] Can sign up successfully
- [ ] Can sign in successfully

## 🚨 Common Issues & Solutions

### Issue 1: "Firebase not configured" Error
**Solution**: Make sure all Firebase variables are set correctly in `.env.local`

### Issue 2: "Invalid API key" Error
**Solution**: Double-check the API key from Firebase Console

### Issue 3: "Project not found" Error
**Solution**: Ensure `GOOGLE_CLOUD_PROJECT_ID` matches your Firebase project ID

### Issue 4: Authentication not working
**Solution**: Enable Email/Password authentication in Firebase Console

### Issue 5: Database permission errors
**Solution**: Check Realtime Database rules in Firebase Console

## 🎯 Quick Test

After setting up your `.env.local`:

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Open browser**: http://localhost:3000

3. **Try to sign up**: Use any email/password

4. **Check console**: Should see "Firebase initialized successfully"

## 📞 Need Help?

1. **Firebase Issues**: Check Firebase Console → Project Settings → General
2. **Google Cloud Issues**: Check Google Cloud Console → APIs & Services
3. **App Issues**: Check browser console for specific error messages
4. **Still stuck?**: Refer to main project README.md

---

**Total Setup Time: ~15 minutes**
**Difficulty: Beginner-friendly**
**Result: Fully functional Aetheria with real Firebase integration**
