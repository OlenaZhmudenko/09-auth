import { api } from './api';
import { User } from '@/types/user';
import { Note, NoteTag } from '@/types/note';
import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';

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

export const fetchNotes = async (params?: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const headers = cookieString ? { Cookie: cookieString } : {};
  const response = await api.get('/notes', { params, headers });
  return response.data;
};

export const fetchNoteById = async (id: string ): Promise<Note> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const headers = cookieString ? { Cookie: cookieString } : {};
  const response = await api.get(`/notes/${id}`, { headers });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const headers = cookieString ? { Cookie: cookieString } : {};
  const response = await api.get('/users/me', { headers });
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<User | null>>=> {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const headers = cookieString ? { Cookie: cookieString } : {};
  const response = await api.get('/auth/session', { headers });
  return response;
};