import noteService from "../services/noteService";
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
        onSuccess: () => queryClient.invalidateQueries(["notes"]),
    });

    const deleteNoteMutation = useMutation((id) => noteService.deleteNote(id), {
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