import { User } from 'firebase/auth';

export interface TeamMember {
  uid: string;
  email: string;
  displayName: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  teamMembers: TeamMember[];
  createdAt: number;
  updatedAt: number;
  settings: {
    isPublic: boolean;
    allowGuestAccess: boolean;
    physicsEnabled: boolean;
  };
}

export interface SceneObject {
  id: string;
  type: 'mesh' | 'light' | 'camera' | 'group';
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  visible: boolean;
  locked: boolean;
  metadata: {
    material?: any;
    geometry?: any;
    aiGenerated?: boolean;
    prompt?: string;
    style?: 'realistic' | 'cartoon' | 'low-poly' | 'architectural';
    complexity?: 'simple' | 'medium' | 'complex';
    size?: 'small' | 'medium' | 'large';
    createdAt: number;
    createdBy: string;
  };
}

export interface Scene {
  id: string;
  projectId: string;
  name: string;
  objects: Record<string, SceneObject>;
  settings: {
    backgroundColor: string;
    fogEnabled: boolean;
    fogColor: string;
    fogNear: number;
    fogFar: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface CollaborationState {
  activeUsers: Record<string, {
    uid: string;
    displayName: string;
    position: [number, number, number];
    rotation: [number, number, number];
    isEditing: boolean;
    editingObjectId?: string;
    lastSeen: number;
  }>;
  voiceChatEnabled: boolean;
  voiceChatParticipants: string[];
}
