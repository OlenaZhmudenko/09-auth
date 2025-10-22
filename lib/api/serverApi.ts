import { api } from './api';
import { User } from '@/types/user';
import { Note, NoteTag } from '@/types/note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export const fetchNotes = async (cookies?: string, params?: FetchNotesParams): Promise<FetchNotesResponse> => {
  const headers = cookies ? { Cookie: cookies } : {};
  const response = await api.get('/notes', { params, headers });
  return response.data;
};

export const fetchNoteById = async (id: string, cookies?: string): Promise<Note> => {
  const headers = cookies ? { Cookie: cookies } : {};
  const response = await api.get(`/notes/${id}`, { headers });
  return response.data;
};

export const getMe = async (cookies?: string): Promise<User> => {
  const headers = cookies ? { Cookie: cookies } : {};
  const response = await api.get('/users/me', { headers });
  return response.data;
};

export const checkSession = async (cookies?: string): Promise<User | null> => {
  const headers = cookies ? { Cookie: cookies } : {};
  const response = await api.get('/auth/session', { headers });
  return response.data || null;
};