'use client';

import { useParams } from 'next/navigation';
import Editor from '@/components/Editor';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <div className="h-screen">
      <Editor projectId={projectId} />
    </div>
  );
}
