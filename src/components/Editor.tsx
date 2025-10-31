'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Grid, 
  Box, 
  Sphere, 
  Cylinder,
  Text,
  Html
} from '@react-three/drei';
import { Vector3, Color } from 'three';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Move3D, 
  RotateCcw, 
  Scale, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Plus,
  Trash2,
  Copy,
  Settings,
  Users,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Box as BoxIcon,
  Circle,
  Cylinder as CylinderIcon
} from 'lucide-react';
import AIGenerationPanel from './AIGenerationPanel';

interface SceneObject {
  id: string;
  type: 'box' | 'sphere' | 'cylinder';
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  visible: boolean;
  locked: boolean;
}

interface EditorProps {
  projectId: string;
}

export default function Editor({ projectId }: EditorProps) {
  const [objects, setObjects] = useState<SceneObject[]>([
    {
      id: '1',
      type: 'box',
      name: 'Ground',
      position: [0, -1, 0],
      rotation: [0, 0, 0],
      scale: [10, 0.2, 10],
      color: '#8B4513',
      visible: true,
      locked: true
    },
    {
      id: '2',
      type: 'box',
      name: 'Building',
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      scale: [2, 2, 2],
      color: '#708090',
      visible: true,
      locked: false
    }
  ]);

  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'move' | 'rotate' | 'scale'>('select');
  const [isVoiceChatEnabled, setIsVoiceChatEnabled] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [collaborators, setCollaborators] = useState([
    { id: '1', name: 'Sarah Chen', position: [2, 0, 2], isActive: true },
    { id: '2', name: 'Mike Johnson', position: [-2, 0, -2], isActive: true }
  ]);

  const addObject = (type: SceneObject['type']) => {
    const newObject: SceneObject = {
      id: Date.now().toString(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${objects.length + 1}`,
      position: [0, 2, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: type === 'box' ? '#4A90E2' : type === 'sphere' ? '#E24A4A' : '#4AE24A',
      visible: true,
      locked: false
    };
    setObjects([...objects, newObject]);
  };

  const deleteObject = (id: string) => {
    setObjects(objects.filter(obj => obj.id !== id));
    if (selectedObject === id) {
      setSelectedObject(null);
    }
  };

  const duplicateObject = (id: string) => {
    const object = objects.find(obj => obj.id === id);
    if (object) {
      const newObject: SceneObject = {
        ...object,
        id: Date.now().toString(),
        name: `${object.name} Copy`,
        position: [object.position[0] + 1, object.position[1], object.position[2]]
      };
      setObjects([...objects, newObject]);
    }
  };

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(objects.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ));
  };

  const handleAIGeneratedObject = (object: SceneObject) => {
    setObjects([...objects, object]);
    setShowAIPanel(false);
  };

  const handleAIGeneratedEnvironment = (environment: any) => {
    console.log('Environment generated:', environment);
    // Update scene environment settings
  };

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Left Sidebar - Tools */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Tools</h2>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={tool === 'select' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('select')}
              className="text-white"
            >
              Select
            </Button>
            <Button
              variant={tool === 'move' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('move')}
              className="text-white"
            >
              <Move3D className="h-4 w-4 mr-1" />
              Move
            </Button>
            <Button
              variant={tool === 'rotate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('rotate')}
              className="text-white"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Rotate
            </Button>
            <Button
              variant={tool === 'scale' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool('scale')}
              className="text-white"
            >
              <Scale className="h-4 w-4 mr-1" />
              Scale
            </Button>
          </div>
        </div>

        {/* Object Library */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Add Objects</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIPanel(true)}
              className="text-white border-purple-600 hover:bg-purple-700 bg-purple-600/20"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI Generate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addObject('box')}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addObject('box')}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <BoxIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addObject('sphere')}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Circle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addObject('cylinder')}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <CylinderIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scene Objects */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-3">Scene Objects</h3>
          <div className="space-y-2">
            {objects.map((obj) => (
              <Card
                key={obj.id}
                className={`bg-gray-700 border-gray-600 cursor-pointer transition-colors ${
                  selectedObject === obj.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-600'
                }`}
                onClick={() => setSelectedObject(obj.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: obj.color }}
                      />
                      <span className="text-white text-sm font-medium">{obj.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateObject(obj.id, { visible: !obj.visible });
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        {obj.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateObject(obj.id, { locked: !obj.locked });
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        {obj.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateObject(obj.id);
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteObject(obj.id);
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collaboration */}
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Collaboration</h3>
          <div className="space-y-2">
            <Button
              variant={isVoiceChatEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsVoiceChatEnabled(!isVoiceChatEnabled)}
              className="w-full text-white"
            >
              {isVoiceChatEnabled ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isVoiceChatEnabled ? 'Disable Voice' : 'Enable Voice'}
            </Button>
            <div className="text-sm text-gray-300">
              <div className="flex items-center justify-between mb-1">
                <span>Active Users:</span>
                <span>{collaborators.filter(c => c.isActive).length}</span>
              </div>
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{collaborator.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main 3D Viewport */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 60 }}
          shadows
          className="bg-gradient-to-b from-blue-900 to-purple-900"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Environment */}
            <Environment preset="sunset" />
            <Grid
              position={[0, -1, 0]}
              args={[20, 20]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6b7280"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#9ca3af"
              fadeDistance={30}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
            />

            {/* Scene Objects */}
            {objects.map((obj) => (
              <SceneObjectComponent
                key={obj.id}
                object={obj}
                isSelected={selectedObject === obj.id}
                tool={tool}
                onUpdate={(updates) => updateObject(obj.id, updates)}
              />
            ))}

            {/* Collaborator Avatars */}
            {collaborators.map((collaborator) => (
              <CollaboratorAvatar
                key={collaborator.id}
                collaborator={collaborator}
              />
            ))}

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>

        {/* Top Toolbar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-gray-800/90 backdrop-blur-md rounded-lg px-4 py-2">
            <h1 className="text-white font-semibold">Project Editor</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* AI Generation Panel */}
      {showAIPanel && (
        <AIGenerationPanel
          onObjectGenerated={handleAIGeneratedObject}
          onEnvironmentGenerated={handleAIGeneratedEnvironment}
          onClose={() => setShowAIPanel(false)}
        />
      )}
    </div>
  );
}

// Individual Scene Object Component
function SceneObjectComponent({ 
  object, 
  isSelected, 
  tool, 
  onUpdate 
}: { 
  object: SceneObject; 
  isSelected: boolean; 
  tool: string;
  onUpdate: (updates: Partial<SceneObject>) => void;
}) {
  const meshRef = useRef<any>();
  const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (meshRef.current && isSelected && tool === 'rotate') {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Selection logic would be handled by parent
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  const renderGeometry = () => {
    switch (object.type) {
      case 'box':
        return <Box ref={meshRef} args={object.scale} />;
      case 'sphere':
        return <Sphere ref={meshRef} args={[object.scale[0] / 2]} />;
      case 'cylinder':
        return <Cylinder ref={meshRef} args={[object.scale[0] / 2, object.scale[0] / 2, object.scale[1]]} />;
      default:
        return <Box ref={meshRef} args={object.scale} />;
    }
  };

  if (!object.visible) return null;

  return (
    <group
      position={object.position}
      rotation={object.rotation}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <mesh
        castShadow
        receiveShadow
        ref={meshRef}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={object.color}
          transparent={isSelected}
          opacity={isSelected ? 0.8 : 1}
        />
      </mesh>
      
      {/* Selection Outline */}
      {isSelected && (
        <mesh>
          {renderGeometry()}
          <meshBasicMaterial
            color="#00ff00"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Object Label */}
      <Html
        position={[0, object.scale[1] / 2 + 0.5, 0]}
        center
        distanceFactor={10}
        occlude
      >
        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {object.name}
        </div>
      </Html>
    </group>
  );
}

// Collaborator Avatar Component
function CollaboratorAvatar({ collaborator }: { collaborator: any }) {
  return (
    <group position={collaborator.position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1.8]} />
        <meshBasicMaterial color="#4A90E2" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <Html
        position={[0, 2.2, 0]}
        center
        distanceFactor={10}
        occlude
      >
        <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {collaborator.name}
        </div>
      </Html>
    </group>
  );
}
