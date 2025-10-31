'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  Sparkles, 
  Loader2, 
  Wand2, 
  Image, 
  Globe, 
  Settings,
  X,
  Check
} from 'lucide-react';
import { aiGenerationService, AIGenerationRequest } from '@/services/AIGenerationService';

interface AIGenerationPanelProps {
  onObjectGenerated: (object: any) => void;
  onEnvironmentGenerated: (environment: any) => void;
  onClose: () => void;
}

export default function AIGenerationPanel({ 
  onObjectGenerated, 
  onEnvironmentGenerated, 
  onClose 
}: AIGenerationPanelProps) {
  const [activeTab, setActiveTab] = useState('object');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<any[]>([]);
  
  const [objectPrompt, setObjectPrompt] = useState('');
  const [objectStyle, setObjectStyle] = useState<'realistic' | 'cartoon' | 'low-poly' | 'architectural'>('realistic');
  const [objectComplexity, setObjectComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [objectSize, setObjectSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  const [texturePrompt, setTexturePrompt] = useState('');
  const [environmentPrompt, setEnvironmentPrompt] = useState('');

  const handleGenerateObject = async () => {
    if (!objectPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const request: AIGenerationRequest = {
        prompt: objectPrompt,
        style: objectStyle,
        complexity: objectComplexity,
        size: objectSize
      };

      const response = await aiGenerationService.generate3DAsset(request);
      
      if (response.success && response.object) {
        onObjectGenerated(response.object);
        setGenerationHistory(prev => [response.object, ...prev.slice(0, 9)]);
        setObjectPrompt('');
      } else {
        console.error('Generation failed:', response.error);
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTexture = async () => {
    if (!texturePrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await aiGenerationService.generateTexture(texturePrompt, 'current-object');
      
      if (response.success && response.textureUrl) {
        console.log('Texture generated:', response.textureUrl);
        // Handle texture application
      } else {
        console.error('Texture generation failed:', response.error);
      }
    } catch (error) {
      console.error('Texture generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateEnvironment = async () => {
    if (!environmentPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await aiGenerationService.generateEnvironment(environmentPrompt);
      
      if (response.success && response.environment) {
        onEnvironmentGenerated(response.environment);
      } else {
        console.error('Environment generation failed:', response.error);
      }
    } catch (error) {
      console.error('Environment generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const quickPrompts = [
    'weathered stone fountain with moss',
    'medieval castle tower',
    'futuristic spaceship',
    'rustic wooden cabin',
    'crystal cave entrance',
    'floating island with waterfalls',
    'steampunk airship',
    'ancient temple ruins',
    'magical forest clearing',
    'underwater coral reef'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
              AI Generation
            </CardTitle>
            <CardDescription className="text-gray-300">
              Generate 3D assets, textures, and environments with AI
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger value="object" className="text-white data-[state=active]:bg-gray-600">
                <Wand2 className="h-4 w-4 mr-2" />
                3D Objects
              </TabsTrigger>
              <TabsTrigger value="texture" className="text-white data-[state=active]:bg-gray-600">
                <Image className="h-4 w-4 mr-2" />
                Textures
              </TabsTrigger>
              <TabsTrigger value="environment" className="text-white data-[state=active]:bg-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                Environment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="object" className="space-y-4 mt-4">
              {/* Quick Prompts */}
              <div>
                <h3 className="text-white font-medium mb-2">Quick Prompts</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setObjectPrompt(prompt)}
                      className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white text-left justify-start"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="text-white font-medium mb-2 block">Custom Prompt</label>
                <Input
                  placeholder="Describe the 3D object you want to create..."
                  value={objectPrompt}
                  onChange={(e) => setObjectPrompt(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Generation Settings */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Style</label>
                  <select
                    value={objectStyle}
                    onChange={(e) => setObjectStyle(e.target.value as any)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="realistic">Realistic</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="low-poly">Low-Poly</option>
                    <option value="architectural">Architectural</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Complexity</label>
                  <select
                    value={objectComplexity}
                    onChange={(e) => setObjectComplexity(e.target.value as any)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="simple">Simple</option>
                    <option value="medium">Medium</option>
                    <option value="complex">Complex</option>
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Size</label>
                  <select
                    value={objectSize}
                    onChange={(e) => setObjectSize(e.target.value as any)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerateObject}
                disabled={!objectPrompt.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate 3D Object
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="texture" className="space-y-4 mt-4">
              <div>
                <label className="text-white font-medium mb-2 block">Texture Prompt</label>
                <Input
                  placeholder="Describe the texture you want to generate..."
                  value={texturePrompt}
                  onChange={(e) => setTexturePrompt(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Button
                onClick={handleGenerateTexture}
                disabled={!texturePrompt.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    Generate Texture
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="environment" className="space-y-4 mt-4">
              <div>
                <label className="text-white font-medium mb-2 block">Environment Prompt</label>
                <Input
                  placeholder="Describe the environment atmosphere..."
                  value={environmentPrompt}
                  onChange={(e) => setEnvironmentPrompt(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Button
                onClick={handleGenerateEnvironment}
                disabled={!environmentPrompt.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Generate Environment
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>

          {/* Generation History */}
          {generationHistory.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-white font-medium mb-3">Recent Generations</h3>
              <div className="space-y-2">
                {generationHistory.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">{item.metadata.prompt}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onObjectGenerated(item)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
