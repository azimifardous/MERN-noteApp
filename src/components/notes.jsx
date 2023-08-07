import React from "react";
import NoteBtn from "./common/noteBtn";
import Note from "./common/note";
import noteService from "../services/noteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Notes = () => {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await noteService.getNotes();
      return data;
    },
    staleTime: 60 * 60 * 1000, // 1hr
  });

  const queryClient = useQueryClient();
  const addNoteMutation = useMutation((note) => noteService.addNote(note), {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const handleAddNote = (color) =>
    addNoteMutation.mutate({ content: "", color });

  const deleteNoteMutation = useMutation((id) => noteService.deleteNote(id), {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });
  const handleDelete = (id) => {
    deleteNoteMutation.mutate(id);
  };

  if (isLoading) return <div className="emptyNote">Loading Notes...</div>;
  return (
    <div className="notesDiv">
      <NoteBtn onAddNote={handleAddNote} />
      {notes.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold mt-2 ml-4">Notes</h1>
          <ul className="notesList">
            {notes.map((note) => (
              <Note
                id={note._id}
                key={note._id}
                color={note.color}
                onDelete={() => handleDelete(note._id)}
              />
            ))}
          </ul>
        </>
      ) : (
        <div className="emptyNote">Add a note...</div>
      )}
    </div>
  );
};

export default Notes;
