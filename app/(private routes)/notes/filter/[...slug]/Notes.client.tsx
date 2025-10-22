'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesParams } from '@/lib/api/clientApi';
import { NoteTag } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { useDebounce } from '@/app/hooks/useDebounce';
import css from './NotesPage.module.css';
import type { FetchNotesResponse } from '@/lib/api/clientApi';

const NOTES_PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchParams: FetchNotesParams = {
    page: currentPage,
    perPage: NOTES_PER_PAGE,
    search: debouncedSearchTerm || undefined,
    tag: tag,
  };

  const {
    data: notesData,
    isLoading,
    error,
    isFetching,
  } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, debouncedSearchTerm, tag],
    queryFn: () => fetchNotes(fetchParams),
    placeholderData: (previousData) => previousData,
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const hasNotes = notesData && notesData.notes && notesData.notes.length > 0;
  const totalPages = notesData?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>   
      </header>

      {(isLoading || isFetching) && <div>Loading...</div>}
      {error && <div>Error loading notes</div>}

      {hasNotes && notesData && (
        <NoteList
          notes={notesData.notes}
        />
      )}

      {!isLoading && !hasNotes && !error && (
        <div>No notes found</div>
      )}
    </div>
  );
}