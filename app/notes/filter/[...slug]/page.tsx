import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface NotesPageProps {
    params: Promise<{ slug: string[] }>
}

const NotesPage = async ({ params }: NotesPageProps) => {
    const { slug } = await params;
    const tag: NoteTag | string = slug[0]
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['notes', { searchText: "", currentPage: 1, tag }], queryFn: () => fetchNotes({ tag }) })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
}

export default NotesPage;