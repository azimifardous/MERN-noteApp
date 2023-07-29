import React, { Component, Fragment } from "react";
import NoteBtn from "./common/noteBtn";
import Note from "./common/note";
import noteService from "../services/noteService";
import { v4 as uuidv4 } from "uuid";

class Notes extends Component {
  state = {
    notes: [],
  };

  async componentDidMount() {
    // get the notes and update the state
    const { data: notes } = await noteService.getNotes();
    this.setState({ notes });
  }

  handleAddNote = async (color) => {
    try {
      const notes = this.state.notes;
      const { data: note } = await noteService.addNote({
        content: "",
        color,
      });
      notes.push(note);
      this.setState({ notes });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleDelete = async (id) => {
    try {
      const notes = [...this.state.notes];
      const index = notes.findIndex((note) => note._id === id);
      notes.splice(index, 1);
      this.setState({ notes });
      await noteService.deleteNote(id);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div className="notesDiv">
        <NoteBtn onAddNote={this.handleAddNote} />
        {this.state.notes.length > 0 ? (
          <Fragment>
            <h1 className="text-4xl font-bold mt-2 ml-4">Notes</h1>
            <ul className="notesList">
              {this.state.notes.map((note) => (
                <Note
                  id={note._id}
                  key={note._id}
                  color={note.color}
                  onDelete={() => this.handleDelete(note._id)}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <div className="emptyNote">Add a note...</div>
        )}
      </div>
    );
  }
}

export default Notes;
