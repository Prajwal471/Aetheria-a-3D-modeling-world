'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged
} from 'firebase/auth';
import { auth, AuthGoogleProvider, authSignInWithPopup, authSignInWithEmailAndPassword, authCreateUserWithEmailAndPassword, authSignOut } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await authSignInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      // In demo mode, simulate successful login
      if (error instanceof Error && (error.message.includes("Firebase not configured") || error.message.includes("Demo mode") || error.message.includes("Firebase initialization failed"))) {
        console.log("Demo mode: Simulating successful login");
        return;
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const result = await authCreateUserWithEmailAndPassword(auth, email, password);
      if (result.user && 'updateProfile' in result.user) {
        await (result.user as any).updateProfile({ displayName });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      // In demo mode, simulate successful signup
      if (error instanceof Error && (error.message.includes("Firebase not configured") || error.message.includes("Demo mode") || error.message.includes("Firebase initialization failed"))) {
        console.log("Demo mode: Simulating successful signup");
        return;
      }
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new AuthGoogleProvider();
      await authSignInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign in error:', error);
      // In demo mode, simulate successful Google login
      if (error instanceof Error && (error.message.includes("Firebase not configured") || error.message.includes("Demo mode") || error.message.includes("Firebase initialization failed"))) {
        console.log("Demo mode: Simulating successful Google login");
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authSignOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      // In demo mode, simulate successful logout
      if (error instanceof Error && (error.message.includes("Firebase not configured") || error.message.includes("Demo mode") || error.message.includes("Firebase initialization failed"))) {
        console.log("Demo mode: Simulating successful logout");
        return;
      }
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
