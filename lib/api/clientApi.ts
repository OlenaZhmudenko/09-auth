import { api } from './api';
import { User } from '@/types/user';
import { Note, NoteTag } from '@/types/note';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
}

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

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post('/auth/register', data); 
  return response.data;
};  

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const response = await api.get('/auth/session');
  return response.data || null;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateMe = async (data: UpdateUserData): Promise<User> => {
  const response = await api.patch('/users/me', data);
  return response.data;
};

export const fetchNotes = async (params?: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const response = await api.post('/notes', data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};