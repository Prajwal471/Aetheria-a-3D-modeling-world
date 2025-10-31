'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
            <CardTitle className="text-3xl font-bold text-white">Privacy Policy</CardTitle>
            <CardDescription className="text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-gray-300 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Account information (name, email, password)</li>
                  <li>3D content and projects you create</li>
                  <li>Collaboration data and team interactions</li>
                  <li>Usage analytics and performance data</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Enable real-time collaboration features</li>
                  <li>Generate AI-powered 3D content</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. AI and Machine Learning</h2>
                <p>
                  We use AI services to generate 3D content based on your prompts. Your prompts may be processed by third-party AI services to provide the requested content.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your 3D projects and content</li>
                  <li>Opt out of certain data processing activities</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy, please contact us at privacy@aetheria.com
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
