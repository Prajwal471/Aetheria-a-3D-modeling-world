'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Plus, 
  Users, 
  Box, 
  Settings, 
  LogOut, 
  Play, 
  Share2, 
  Download,
  Upload,
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading projects
    setTimeout(() => {
      setProjects([
        {
          id: '1',
          name: 'Fantasy Castle',
          description: 'A medieval castle with towers and courtyards',
          lastModified: new Date().toISOString(),
          collaborators: 3,
          scenes: 5
        },
        {
          id: '2',
          name: 'Space Station Alpha',
          description: 'Futuristic space station with docking bays',
          lastModified: new Date(Date.now() - 86400000).toISOString(),
          collaborators: 2,
          scenes: 3
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateProject = () => {
    // TODO: Implement project creation
    console.log('Create new project');
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Aetheria</h1>
              <span className="ml-2 text-sm text-gray-300">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">{user?.displayName || user?.email}</p>
                <p className="text-xs text-gray-300">Collaborative 3D Editor</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-white border-white/20 hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.displayName || 'Creator'}!
          </h2>
          <p className="text-gray-300">
            Continue building amazing 3D worlds with your team
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Plus className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-medium">New Project</h3>
              <p className="text-gray-300 text-sm">Start from scratch</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Upload className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-medium">Import Assets</h3>
              <p className="text-gray-300 text-sm">Upload 3D models</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-medium">AI Generate</h3>
              <p className="text-gray-300 text-sm">Create with AI</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-medium">Invite Team</h3>
              <p className="text-gray-300 text-sm">Collaborate together</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Your Projects</h3>
            <Button
              onClick={handleCreateProject}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => handleOpenProject(project.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{project.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.collaborators} collaborators
                      </div>
                      <div className="flex items-center">
                        <Box className="h-4 w-4 mr-1" />
                        {project.scenes} scenes
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Modified {new Date(project.lastModified).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                          <Share2 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-12 text-center">
                <Box className="h-16 w-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No projects yet</h3>
                <p className="text-gray-300 mb-6">
                  Create your first 3D project to start collaborating with your team
                </p>
                <Button
                  onClick={handleCreateProject}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">Sarah Chen</span> added a new object to Fantasy Castle
                    </p>
                    <p className="text-gray-400 text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">Mike Johnson</span> generated AI asset "weathered stone fountain"
                    </p>
                    <p className="text-gray-400 text-xs">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">You</span> created new scene "Castle Courtyard"
                    </p>
                    <p className="text-gray-400 text-xs">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
