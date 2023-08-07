import { useQuery } from "@tanstack/react-query"
import noteService from "../../services/noteService"

const useNote = (noteId) => {
    return useQuery({
        queryKey: ['note', noteId],
        queryFn: async () => {
            const { data } = await noteService.getNote(noteId)
            return data
        },
        staleTime: 60 * 60 * 1000 // 1hr
    })
}

export default useNote;