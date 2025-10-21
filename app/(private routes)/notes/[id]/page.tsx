import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import getQueryClient from '@/app/utils/getQueryClient';
import NotePreviewClient from '../../@modal/(.)notes/[id]/NotePreview.client';
import type { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    
    return {
      title: `${note.title} - NoteHub`,
      description: note.content.substring(0, 160) + (note.content.length > 160 ? '...' : ''),
      openGraph: {
        title: `${note.title} - NoteHub`,
        description: note.content.substring(0, 160) + (note.content.length > 160 ? '...' : ''),
        url: `https://vercel.com/new/olenas-projects-81ca86a5/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=07-routing-nextjs-j99qmfeh0-olenas-projects-81ca86a5.vercel.app&projectName=07-routing-nextjs&s=https%3A%2F%2Fgithub.com%2FOlenaZhmudenko%2F07-routing-nextjs&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=N5KH7YGpWN6gircyGJqOg/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: `NoteHub - ${note.title}`,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Note Not Found - NoteHub',
      description: 'The requested note could not be found in your NoteHub application.',
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}