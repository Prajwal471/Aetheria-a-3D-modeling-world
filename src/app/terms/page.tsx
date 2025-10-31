'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/auth/signup">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign Up
            </Button>
          </Link>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">Terms of Service</CardTitle>
            <CardDescription className="text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-gray-300 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Aetheria, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Use License</h2>
                <p>
                  Permission is granted to temporarily use Aetheria for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Content and Collaboration</h2>
                <p>
                  Users may create, share, and collaborate on 3D content. You retain ownership of your original content but grant Aetheria a license to host and display your content.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Prohibited Uses</h2>
                <p>
                  You may not use Aetheria for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. AI-Generated Content</h2>
                <p>
                  AI-generated content is provided as-is. Aetheria does not guarantee the accuracy, quality, or appropriateness of AI-generated 3D assets.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
