import { realtimeSyncService } from './RealtimeSyncService';

export interface VoiceChatConfig {
  iceServers: RTCIceServer[];
  audioConstraints: MediaStreamConstraints;
}

export interface VoiceParticipant {
  userId: string;
  displayName: string;
  isMuted: boolean;
  isSpeaking: boolean;
  connection: RTCPeerConnection;
  audioStream: MediaStream;
}

export class VoiceChatService {
  private localStream: MediaStream | null = null;
  private participants: Map<string, VoiceParticipant> = new Map();
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private isEnabled: boolean = false;
  private sceneId: string | null = null;
  private userId: string | null = null;
  private displayName: string | null = null;

  private config: VoiceChatConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
    audioConstraints: {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
      },
    },
  };

  async initialize(sceneId: string, userId: string, displayName: string): Promise<void> {
    this.sceneId = sceneId;
    this.userId = userId;
    this.displayName = displayName;

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(this.config.audioConstraints);
      console.log('Voice chat initialized successfully');
    } catch (error) {
      console.error('Failed to initialize voice chat:', error);
      throw error;
    }
  }

  async enableVoiceChat(): Promise<void> {
    if (!this.sceneId || !this.userId || !this.localStream) {
      throw new Error('Voice chat not initialized');
    }

    this.isEnabled = true;
    
    // Notify other users that voice chat is enabled
    await realtimeSyncService.toggleVoiceChat(this.sceneId, true);
    await realtimeSyncService.addVoiceParticipant(this.sceneId, this.userId);

    // Listen for new participants
    this.setupParticipantListener();
  }

  async disableVoiceChat(): Promise<void> {
    if (!this.sceneId || !this.userId) {
      return;
    }

    this.isEnabled = false;

    // Close all peer connections
    this.peerConnections.forEach((connection) => {
      connection.close();
    });
    this.peerConnections.clear();
    this.participants.clear();

    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }

    // Notify other users
    await realtimeSyncService.toggleVoiceChat(this.sceneId, false);
    await realtimeSyncService.removeVoiceParticipant(this.sceneId, this.userId);
  }

  private setupParticipantListener(): void {
    if (!this.sceneId) return;

    realtimeSyncService.subscribeToCollaboration(this.sceneId, (state) => {
      const currentParticipants = Object.keys(this.participants);
      const voiceParticipants = state.voiceChatParticipants || [];

      // Add new participants
      voiceParticipants.forEach((participantId) => {
        if (participantId !== this.userId && !this.participants.has(participantId)) {
          this.addParticipant(participantId);
        }
      });

      // Remove participants who left
      currentParticipants.forEach((participantId) => {
        if (!voiceParticipants.includes(participantId)) {
          this.removeParticipant(participantId);
        }
      });
    });
  }

  private async addParticipant(participantId: string): Promise<void> {
    if (!this.sceneId || !this.userId || !this.localStream) return;

    try {
      const peerConnection = new RTCPeerConnection({
        iceServers: this.config.iceServers,
      });

      // Add local stream
      this.localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, this.localStream!);
      });

      // Handle incoming audio
      peerConnection.ontrack = (event) => {
        const [audioStream] = event.streams;
        this.handleIncomingAudio(participantId, audioStream);
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendIceCandidate(participantId, event.candidate);
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log(`Connection state with ${participantId}:`, peerConnection.connectionState);
      };

      this.peerConnections.set(participantId, peerConnection);

      // Create offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      
      // Send offer to participant
      await this.sendOffer(participantId, offer);

    } catch (error) {
      console.error(`Failed to add participant ${participantId}:`, error);
    }
  }

  private async removeParticipant(participantId: string): Promise<void> {
    const peerConnection = this.peerConnections.get(participantId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(participantId);
    }

    const participant = this.participants.get(participantId);
    if (participant) {
      participant.audioStream.getTracks().forEach((track) => track.stop());
      this.participants.delete(participantId);
    }
  }

  private handleIncomingAudio(participantId: string, audioStream: MediaStream): void {
    const participant: VoiceParticipant = {
      userId: participantId,
      displayName: `User ${participantId}`, // This should come from user data
      isMuted: false,
      isSpeaking: false,
      connection: this.peerConnections.get(participantId)!,
      audioStream,
    };

    this.participants.set(participantId, participant);

    // Create audio element for playback
    const audioElement = new Audio();
    audioElement.srcObject = audioStream;
    audioElement.autoplay = true;
    audioElement.volume = 0.8;

    // Monitor speaking activity
    this.monitorSpeakingActivity(participantId, audioStream);
  }

  private monitorSpeakingActivity(participantId: string, audioStream: MediaStream): void {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(audioStream);
    
    microphone.connect(analyser);
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkSpeaking = () => {
      analyser.getByteFrequencyData(dataArray);
      
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      const isSpeaking = average > 30; // Threshold for speaking detection
      
      const participant = this.participants.get(participantId);
      if (participant && participant.isSpeaking !== isSpeaking) {
        participant.isSpeaking = isSpeaking;
        this.onSpeakingStateChange(participantId, isSpeaking);
      }

      if (this.isEnabled) {
        requestAnimationFrame(checkSpeaking);
      }
    };

    checkSpeaking();
  }

  private onSpeakingStateChange(participantId: string, isSpeaking: boolean): void {
    // This can be used to update UI indicators
    console.log(`${participantId} is ${isSpeaking ? 'speaking' : 'not speaking'}`);
  }

  private async sendOffer(participantId: string, offer: RTCSessionDescriptionInit): Promise<void> {
    // In a real implementation, this would send the offer through a signaling server
    // For now, we'll simulate it
    console.log(`Sending offer to ${participantId}:`, offer);
  }

  private async sendIceCandidate(participantId: string, candidate: RTCIceCandidate): Promise<void> {
    // In a real implementation, this would send the ICE candidate through a signaling server
    console.log(`Sending ICE candidate to ${participantId}:`, candidate);
  }

  // Public methods for UI control
  async toggleMute(): Promise<void> {
    if (!this.localStream) return;

    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
    }
  }

  async setVolume(participantId: string, volume: number): Promise<void> {
    const participant = this.participants.get(participantId);
    if (participant) {
      // Volume control would be implemented here
      console.log(`Setting volume for ${participantId} to ${volume}`);
    }
  }

  getParticipants(): VoiceParticipant[] {
    return Array.from(this.participants.values());
  }

  isVoiceChatEnabled(): boolean {
    return this.isEnabled;
  }

  // Cleanup
  async cleanup(): Promise<void> {
    await this.disableVoiceChat();
    this.sceneId = null;
    this.userId = null;
    this.displayName = null;
  }
}

export const voiceChatService = new VoiceChatService();
