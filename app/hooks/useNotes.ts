import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  });
};