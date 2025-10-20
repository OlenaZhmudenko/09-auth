import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create New Note - NoteHub',
  description: 'Create a new note in NoteHub. Add title, content, and tags to organize your thoughts and tasks efficiently.',
  openGraph: {
    title: 'Create New Note - NoteHub',
    description: 'Create a new note in NoteHub. Add title, content, and tags to organize your thoughts and tasks efficiently.',
    url: '/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Create New Note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}