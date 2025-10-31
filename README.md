# Aetheria - Collaborative 3D Environment Creation Platform

Aetheria is a web-based, collaborative 3D environment creation platform that enables distributed teams to jointly build, edit, and test 3D worlds in real-time. Think "Google Docs for the Metaverse."

## Features

### Core Features
- **Real-time Multi-user Synchronization**: Firebase Realtime Database for instantaneous updates
- **Generative AI-powered 3D Asset Creation**: Vertex AI/Imagen integration for text-to-3D generation
- **Cloud Game Servers**: Google Cloud Game Servers for physics simulation
- **WebRTC Voice Chat**: Low-latency peer communication for team collaboration
- **Modular 3D Editor**: Intuitive UI for object placement, manipulation, and real-time previewing
- **User Authentication**: Firebase Auth for team permissions and secure access
- **Cloud Storage**: Firebase Storage for assets and project files
- **Responsive Web Frontend**: Modern Next.js, React, Tailwind CSS stack

### Architectural Highlights
- Distributed client-server model with Google Cloud Game Servers
- Firebase Realtime Database as central syncing mechanism
- Vertex AI (Imagen) for generative modeling pipelines
- WebRTC for direct peer voice chat channels
- Scalable and fault-tolerant design leveraging Google's managed cloud infrastructure

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project with Authentication, Realtime Database, and Storage enabled
- Google Cloud project with Vertex AI API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aetheria
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google Cloud Configuration
   GOOGLE_CLOUD_PROJECT_ID=your_project_id
   GOOGLE_CLOUD_REGION=us-central1

   # Vertex AI Configuration
   VERTEX_AI_LOCATION=us-central1
   ```

4. **Set up Firebase**
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google providers)
   - Enable Realtime Database
   - Enable Storage
   - Update the environment variables with your Firebase config

5. **Set up Google Cloud**
   - Create a Google Cloud project
   - Enable the Vertex AI API
   - Set up authentication credentials

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
aetheria/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── auth/              # Authentication page
│   │   ├── dashboard/         # Main dashboard
│   │   ├── editor/            # 3D editor pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── Editor.tsx        # Main 3D editor component
│   │   └── AIGenerationPanel.tsx # AI generation interface
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.tsx   # Authentication context
│   │   └── AetheriaContext.tsx # Main app context
│   ├── lib/                  # Utility libraries
│   │   ├── firebase.ts       # Firebase configuration
│   │   └── utils.ts          # Utility functions
│   ├── services/             # Business logic services
│   │   ├── RealtimeSyncService.ts # Firebase sync service
│   │   ├── VoiceChatService.ts    # WebRTC voice chat
│   │   └── AIGenerationService.ts # AI generation service
│   └── types/                # TypeScript type definitions
│       └── index.ts          # Main type definitions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## Usage

### Creating a Project
1. Sign up or log in to your account
2. Click "New Project" on the dashboard
3. Enter project name and description
4. Invite team members by email

### Using the 3D Editor
1. Open a project from the dashboard
2. Use the toolbar to select tools (Move, Rotate, Scale)
3. Add objects using the object library or AI generation
4. Collaborate in real-time with team members
5. Use voice chat for communication

### AI Generation
1. Click "AI Generate" in the object library
2. Enter a text prompt describing the 3D object you want
3. Select style, complexity, and size options
4. Click "Generate 3D Object" to create the asset
5. The generated object will appear in your scene

### Collaboration Features
- **Real-time Synchronization**: See changes from other users instantly
- **User Presence**: View where other team members are working
- **Voice Chat**: Enable voice communication for better collaboration
- **Permission Management**: Control who can edit vs. view projects

## Technology Stack

### Frontend
- **Next.js 15**: React framework with app router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for R3F

### Backend Services
- **Firebase Auth**: User authentication
- **Firebase Realtime Database**: Real-time data synchronization
- **Firebase Storage**: File and asset storage
- **Google Cloud Game Servers**: Physics simulation
- **Vertex AI**: AI-powered 3D asset generation
- **WebRTC**: Peer-to-peer voice communication

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aetheria.com or join our Discord community.

## Roadmap

- [ ] Advanced physics simulation
- [ ] VR/AR support
- [ ] Advanced AI generation models
- [ ] Plugin system for custom tools
- [ ] Mobile app
- [ ] Advanced collaboration features
- [ ] Performance optimizations
- [ ] Multi-language support# Aetheria-a-3D-modeling-world
