'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page
    router.replace('/auth/signin');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Aetheria</h2>
        <p className="text-gray-300">Redirecting to sign in...</p>
      </div>
    </div>
  );
}
