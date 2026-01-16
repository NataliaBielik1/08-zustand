"use client";
import { useState } from "react";
import css from "./page.module.css"
import { useDebouncedCallback } from "use-debounce";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";


const NotesClient = () => {
    console.log("Hello")
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const changeSearchQuery = useDebouncedCallback((newQuery: string) => { setCurrentPage(1); setSearchQuery(newQuery) }, 300)
    const { data } = useQuery({
        queryKey: ["notes", searchQuery, currentPage],
        queryFn: () => fetchNotes(searchQuery, currentPage),
        placeholderData: keepPreviousData
    })

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const notes = data?.notes ?? []
    const totalPages = data?.totalPages ?? 0
    return (
        <div className={css.app}>
            <main>
                <section>
                    <header className={css.toolbar}>
                        <SearchBox onSearch={changeSearchQuery} />
                        {totalPages > 1 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        )}
                        <button className={css.button} onClick={toggleModal}>
                            Create note +
                        </button>
                    </header>

                    {isModalOpen && (
                        <Modal onClose={toggleModal}>
                            <NoteForm onClose={toggleModal} />
                        </Modal>
                    )}
                    {notes.length > 0 && <NoteList notes={notes} />}
                </section>
            </main>
        </div>
    );
}

export default NotesClient;