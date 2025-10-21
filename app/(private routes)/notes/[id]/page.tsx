import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import getQueryClient from '@/app/utils/getQueryClient';
import NotePreviewClient from '@/components/NotePreview/NotePreview';
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
        url: `https://notehub.com/notes/${id}`,
        siteName: 'NoteHub',
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
  } catch {
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