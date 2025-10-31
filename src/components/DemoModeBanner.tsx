'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div className="bg-yellow-500 text-yellow-900 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-medium">
          Demo Mode: Aetheria is running with mock Firebase configuration. 
          <a 
            href="/CONFIGURATION.md" 
            className="underline ml-1 hover:text-yellow-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Configure Firebase for full functionality.
          </a>
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="text-yellow-900 hover:bg-yellow-400 h-6 w-6 p-0"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
