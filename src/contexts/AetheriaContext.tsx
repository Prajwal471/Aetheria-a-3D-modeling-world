import { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { Project, Scene, SceneObject, CollaborationState, TeamMember } from '@/types';

interface AetheriaContextType {
  user: User | null;
  currentProject: Project | null;
  currentScene: Scene | null;
  collaborationState: CollaborationState | null;
  isConnected: boolean;
  isLoading: boolean;
  
  // Project management
  createProject: (name: string, description: string) => Promise<string>;
  joinProject: (projectId: string) => Promise<void>;
  leaveProject: () => Promise<void>;
  
  // Scene management
  createScene: (name: string) => Promise<string>;
  loadScene: (sceneId: string) => Promise<void>;
  saveScene: () => Promise<void>;
  
  // Object manipulation
  addObject: (object: Omit<SceneObject, 'id'>) => Promise<string>;
  updateObject: (objectId: string, updates: Partial<SceneObject>) => Promise<void>;
  deleteObject: (objectId: string) => Promise<void>;
  duplicateObject: (objectId: string) => Promise<string>;
  
  // AI generation
  generateAsset: (prompt: string) => Promise<SceneObject>;
  
  // Collaboration
  startVoiceChat: () => Promise<void>;
  stopVoiceChat: () => Promise<void>;
  inviteUser: (email: string, role: TeamMember['role']) => Promise<void>;
}

const AetheriaContext = createContext<AetheriaContextType | undefined>(undefined);

export const useAetheria = () => {
  const context = useContext(AetheriaContext);
  if (!context) {
    throw new Error('useAetheria must be used within an AetheriaProvider');
  }
  return context;
};

interface AetheriaProviderProps {
  children: ReactNode;
}

export const AetheriaProvider = ({ children }: AetheriaProviderProps) => {
  // Implementation will be added in the next step
  return (
    <AetheriaContext.Provider value={{} as AetheriaContextType}>
      {children}
    </AetheriaContext.Provider>
  );
};
