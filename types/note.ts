export type NoteTag = "Todo" | "Work" | "Meeting" | "Shopping" | "Personal"
export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;

}
export interface NewNoteContent {
    title: string;
    content?: string;
    tag: NoteTag;
}