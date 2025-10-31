import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Check if we're in demo mode (no real Firebase config provided)
const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key" ||
                   process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "";

if (isDemoMode) {
  console.warn("🔥 Firebase is running in DEMO mode. Please configure your Firebase project for full functionality.");
}

// Demo Firebase configuration for development
// Replace these with your actual Firebase project values
const firebaseConfig = isDemoMode ? {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  databaseURL: "https://demo-project-default-rtdb.firebaseio.com/"
} : {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`
};

let app: any;
let auth: any;
let database: any;
let storage: any;

if (isDemoMode) {
  // Create mock objects for demo mode
  console.log("🎭 Initializing Firebase in DEMO mode");
  auth = {
    currentUser: null,
    _getRecaptchaConfig: () => null,
    signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured - Demo mode")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured - Demo mode")),
    signOut: () => Promise.reject(new Error("Firebase not configured - Demo mode")),
    onAuthStateChanged: (callback: any) => {
      callback(null);
      return () => {};
    }
  };
  
  // Mock Google Auth Provider
  (global as any).GoogleAuthProvider = class MockGoogleAuthProvider {
    constructor() {
      this.providerId = 'google.com';
    }
  };
  
  // Mock signInWithPopup
  (global as any).signInWithPopup = () => Promise.reject(new Error("Firebase not configured - Demo mode"));
  database = {
    ref: () => ({ set: () => Promise.resolve(), get: () => Promise.resolve({ exists: () => false }) }),
    get: () => Promise.resolve({ exists: () => false }),
    set: () => Promise.resolve(),
    update: () => Promise.resolve(),
    remove: () => Promise.resolve(),
    onValue: () => () => {},
    off: () => {}
  };
  storage = {
    ref: () => ({ put: () => Promise.resolve(), getDownloadURL: () => Promise.resolve("") })
  };
  app = null;
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
    storage = getStorage(app);
    console.log("🔥 Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // Fallback to demo mode if Firebase fails
    auth = {
      currentUser: null,
      _getRecaptchaConfig: () => null,
      signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase initialization failed")),
      createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase initialization failed")),
      signOut: () => Promise.reject(new Error("Firebase initialization failed")),
      onAuthStateChanged: (callback: any) => {
        callback(null);
        return () => {};
      }
    };
    
    // Mock Google Auth Provider for fallback
    (global as any).GoogleAuthProvider = class MockGoogleAuthProvider {
      constructor() {
        this.providerId = 'google.com';
      }
    };
    
    // Mock signInWithPopup for fallback
    (global as any).signInWithPopup = () => Promise.reject(new Error("Firebase initialization failed"));
    database = {
      ref: () => ({ set: () => Promise.resolve(), get: () => Promise.resolve({ exists: () => false }) }),
      get: () => Promise.resolve({ exists: () => false }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      onValue: () => () => {},
      off: () => {}
    };
    storage = {
      ref: () => ({ put: () => Promise.resolve(), getDownloadURL: () => Promise.resolve("") })
    };
    app = null;
  }
}

// Export Firebase Auth functions with different names
export const AuthGoogleProvider = isDemoMode ? 
  (global as any).GoogleAuthProvider : 
  require('firebase/auth').GoogleAuthProvider;

export const authSignInWithPopup = isDemoMode ? 
  (global as any).signInWithPopup : 
  require('firebase/auth').signInWithPopup;

export const authSignInWithEmailAndPassword = isDemoMode ? 
  auth.signInWithEmailAndPassword : 
  require('firebase/auth').signInWithEmailAndPassword;

export const authCreateUserWithEmailAndPassword = isDemoMode ? 
  auth.createUserWithEmailAndPassword : 
  require('firebase/auth').createUserWithEmailAndPassword;

export const authSignOut = isDemoMode ? 
  auth.signOut : 
  require('firebase/auth').signOut;

export { auth, database, storage };
export default app;
