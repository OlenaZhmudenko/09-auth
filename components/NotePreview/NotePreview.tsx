'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const handleBack = () => {
    router.back();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading note</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={handleBack}>
        ← Back
      </button>
      
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        
        <div className={css.content}>
          {note.content}
        </div>
        
        <div className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
          {note.updatedAt !== note.createdAt && (
            <span> Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
