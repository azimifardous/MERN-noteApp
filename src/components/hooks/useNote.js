import { useQuery } from "@tanstack/react-query"
import noteService from "../notes/noteService"

const useNote = (noteId) => {
    return useQuery({
        queryKey: ['note', noteId],
        queryFn: async () => {
            const { data } = await noteService.getNote(noteId)
            return data
        },
    })
}

export default useNote;