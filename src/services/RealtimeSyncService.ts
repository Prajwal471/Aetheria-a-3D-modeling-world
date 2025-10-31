import { ref, set, get, onValue, off, push, remove, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { SceneObject, Project, Scene, CollaborationState } from '@/types';

export class RealtimeSyncService {
  private listeners: Map<string, () => void> = new Map();

  // Project Management
  async createProject(project: Omit<Project, 'id'>): Promise<string> {
    const projectRef = push(ref(database, 'projects'));
    const projectId = projectRef.key!;
    
    await set(projectRef, {
      ...project,
      id: projectId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    
    return projectId;
  }

  async getProject(projectId: string): Promise<Project | null> {
    const projectRef = ref(database, `projects/${projectId}`);
    const snapshot = await get(projectRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const projectRef = ref(database, `projects/${projectId}`);
    await update(projectRef, {
      ...updates,
      updatedAt: Date.now()
    });
  }

  // Scene Management
  async createScene(scene: Omit<Scene, 'id'>): Promise<string> {
    const sceneRef = push(ref(database, 'scenes'));
    const sceneId = sceneRef.key!;
    
    await set(sceneRef, {
      ...scene,
      id: sceneId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    
    return sceneId;
  }

  async getScene(sceneId: string): Promise<Scene | null> {
    const sceneRef = ref(database, `scenes/${sceneId}`);
    const snapshot = await get(sceneRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async updateScene(sceneId: string, updates: Partial<Scene>): Promise<void> {
    const sceneRef = ref(database, `scenes/${sceneId}`);
    await update(sceneRef, {
      ...updates,
      updatedAt: Date.now()
    });
  }

  // Object Management
  async addObject(sceneId: string, object: Omit<SceneObject, 'id'>): Promise<string> {
    const objectRef = push(ref(database, `scenes/${sceneId}/objects`));
    const objectId = objectRef.key!;
    
    await set(objectRef, {
      ...object,
      id: objectId,
      metadata: {
        ...object.metadata,
        createdAt: Date.now()
      }
    });
    
    return objectId;
  }

  async updateObject(sceneId: string, objectId: string, updates: Partial<SceneObject>): Promise<void> {
    const objectRef = ref(database, `scenes/${sceneId}/objects/${objectId}`);
    await update(objectRef, updates);
  }

  async deleteObject(sceneId: string, objectId: string): Promise<void> {
    const objectRef = ref(database, `scenes/${sceneId}/objects/${objectId}`);
    await remove(objectRef);
  }

  // Real-time Listeners
  subscribeToScene(sceneId: string, callback: (scene: Scene | null) => void): () => void {
    const sceneRef = ref(database, `scenes/${sceneId}`);
    
    const unsubscribe = onValue(sceneRef, (snapshot) => {
      const scene = snapshot.exists() ? snapshot.val() : null;
      callback(scene);
    });

    this.listeners.set(sceneId, unsubscribe);
    return unsubscribe;
  }

  subscribeToObjects(sceneId: string, callback: (objects: Record<string, SceneObject>) => void): () => void {
    const objectsRef = ref(database, `scenes/${sceneId}/objects`);
    
    const unsubscribe = onValue(objectsRef, (snapshot) => {
      const objects = snapshot.exists() ? snapshot.val() : {};
      callback(objects);
    });

    this.listeners.set(`objects_${sceneId}`, unsubscribe);
    return unsubscribe;
  }

  subscribeToCollaboration(sceneId: string, callback: (state: CollaborationState) => void): () => void {
    const collaborationRef = ref(database, `collaboration/${sceneId}`);
    
    const unsubscribe = onValue(collaborationRef, (snapshot) => {
      const state = snapshot.exists() ? snapshot.val() : {
        activeUsers: {},
        voiceChatEnabled: false,
        voiceChatParticipants: []
      };
      callback(state);
    });

    this.listeners.set(`collaboration_${sceneId}`, unsubscribe);
    return unsubscribe;
  }

  // Collaboration Management
  async updateUserPresence(sceneId: string, userId: string, presence: {
    position: [number, number, number];
    rotation: [number, number, number];
    isEditing: boolean;
    editingObjectId?: string;
  }): Promise<void> {
    const presenceRef = ref(database, `collaboration/${sceneId}/activeUsers/${userId}`);
    await update(presenceRef, {
      ...presence,
      lastSeen: Date.now()
    });
  }

  async removeUserPresence(sceneId: string, userId: string): Promise<void> {
    const presenceRef = ref(database, `collaboration/${sceneId}/activeUsers/${userId}`);
    await remove(presenceRef);
  }

  async toggleVoiceChat(sceneId: string, enabled: boolean): Promise<void> {
    const voiceChatRef = ref(database, `collaboration/${sceneId}/voiceChatEnabled`);
    await set(voiceChatRef, enabled);
  }

  async addVoiceParticipant(sceneId: string, userId: string): Promise<void> {
    const participantsRef = ref(database, `collaboration/${sceneId}/voiceChatParticipants`);
    const snapshot = await get(participantsRef);
    const participants = snapshot.exists() ? snapshot.val() : [];
    
    if (!participants.includes(userId)) {
      await set(participantsRef, [...participants, userId]);
    }
  }

  async removeVoiceParticipant(sceneId: string, userId: string): Promise<void> {
    const participantsRef = ref(database, `collaboration/${sceneId}/voiceChatParticipants`);
    const snapshot = await get(participantsRef);
    const participants = snapshot.exists() ? snapshot.val() : [];
    
    const updatedParticipants = participants.filter((id: string) => id !== userId);
    await set(participantsRef, updatedParticipants);
  }

  // Cleanup
  cleanup(): void {
    this.listeners.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.listeners.clear();
  }

  // Batch Operations for Performance
  async batchUpdateObjects(sceneId: string, updates: Record<string, Partial<SceneObject>>): Promise<void> {
    const updatesRef: Record<string, any> = {};
    
    Object.entries(updates).forEach(([objectId, update]) => {
      updatesRef[`scenes/${sceneId}/objects/${objectId}`] = update;
    });
    
    await update(ref(database), updatesRef);
  }

  // Conflict Resolution
  async resolveObjectConflict(sceneId: string, objectId: string, localVersion: SceneObject, remoteVersion: SceneObject): Promise<SceneObject> {
    // Simple conflict resolution: use the version with the latest timestamp
    const localTimestamp = localVersion.metadata.createdAt;
    const remoteTimestamp = remoteVersion.metadata.createdAt;
    
    if (localTimestamp > remoteTimestamp) {
      // Local version is newer, update remote
      await this.updateObject(sceneId, objectId, localVersion);
      return localVersion;
    } else {
      // Remote version is newer, use remote
      return remoteVersion;
    }
  }

  // Offline Support
  async getOfflineData(sceneId: string): Promise<{ scene: Scene | null; objects: Record<string, SceneObject> }> {
    const sceneRef = ref(database, `scenes/${sceneId}`);
    const objectsRef = ref(database, `scenes/${sceneId}/objects`);
    
    const [sceneSnapshot, objectsSnapshot] = await Promise.all([
      get(sceneRef),
      get(objectsRef)
    ]);
    
    return {
      scene: sceneSnapshot.exists() ? sceneSnapshot.val() : null,
      objects: objectsSnapshot.exists() ? objectsSnapshot.val() : {}
    };
  }
}

export const realtimeSyncService = new RealtimeSyncService();
