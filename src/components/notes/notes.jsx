import React from "react";
import NoteBtn from "../common/noteBtn";
import Note from "../common/note";
import useNotes from "../hooks/useNotes";

const Notes = () => {
  const {
    data: notes,
    isLoading,
    addNoteMutation,
    deleteNoteMutation,
  } = useNotes();

  const handleAddNote = (color) =>
    addNoteMutation.mutate({ content: "", color });

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
