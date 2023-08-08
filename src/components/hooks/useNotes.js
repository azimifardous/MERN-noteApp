import noteService from "../notes/noteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useNotes = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const { data } = await noteService.getNotes();
            return data;
        },
    });

    const queryClient = useQueryClient();
    const addNoteMutation = useMutation((note) => noteService.addNote(note), {
        onMutate: (newNote) => queryClient.setQueryData(['notes'], (oldNotes) => [...oldNotes, newNote]),
        onSuccess: () => queryClient.invalidateQueries(["notes"]),
    });

    const deleteNoteMutation = useMutation((id) => noteService.deleteNote(id), {
        onMutate: (deletedId) =>
            queryClient.setQueryData(["notes"], (oldNotes) =>
                oldNotes.filter((note) => note._id !== deletedId)
            )
        ,
        onSuccess: () => queryClient.invalidateQueries(["notes"]),
    });

    return {
        data,
        isLoading,
        addNoteMutation,
        deleteNoteMutation
    }
}

export default useNotes;