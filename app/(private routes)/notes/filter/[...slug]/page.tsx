import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import getQueryClient from '@/app/utils/getQueryClient';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import type { Metadata } from 'next';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagParam = slug?.[0] || 'all';
  const filterText = tagParam === 'all' ? 'all notes' : `${tagParam} notes`;

  return {
    title: `${tagParam.charAt(0).toUpperCase() + tagParam.slice(1)} Notes - NoteHub`,
    description: `Browse ${filterText} in your NoteHub application. Organize and manage your notes efficiently.`,
    openGraph: {
      title: `${tagParam.charAt(0).toUpperCase() + tagParam.slice(1)} Notes - NoteHub`,
      description: `Browse ${filterText} in your NoteHub application. Organize and manage your notes efficiently.`,
      url: `https://vercel.com/new/olenas-projects-81ca86a5/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=07-routing-nextjs-j99qmfeh0-olenas-projects-81ca86a5.vercel.app&projectName=07-routing-nextjs&s=https%3A%2F%2Fgithub.com%2FOlenaZhmudenko%2F07-routing-nextjs&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=N5KH7YGpWN6gircyGJqOg/notes/filter/${tagParam}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub - ${tagParam} Notes`,
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tagParam = slug?.[0];
  const tag: NoteTag | undefined = tagParam === 'All' 
    ? undefined 
    : (tagParam as NoteTag);
  
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 12, tag }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
