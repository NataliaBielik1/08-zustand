import axios from "axios";
import type { NewNoteContent, Note } from "../types/note";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
    }`;
interface FetchNotesResponse {
    notes: Note[]
    totalPages: number
}
export const fetchNotes = async (searchText: string, page: number) => {
    const { data } = await axios.get<FetchNotesResponse>("/notes", {
        params: {
            ...(searchText !== "" && { search: searchText }),
            page,
            perPage: 12
        },
    });
    return data
}

export const createNote = async (newNote: NewNoteContent) => {
    const { data } = await axios.post<Note>("/notes", newNote)
    return data
}
export const deleteNote = async (noteId: string) => {
    const { data } = await axios.delete<Note>(`/notes/${noteId}`);
    return data
}



export const fetchNoteById = async (noteId: string) => {
    const { data } = await axios.get<Note>(`/notes/${noteId}`);
    return data
}

