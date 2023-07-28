import React, { Component, Fragment } from "react";
import NoteBtn from "./common/noteBtn";
import Note from "./common/note";
import { v4 as uuidv4 } from "uuid";

class Notes extends Component {
  state = {
    notes: [],
  };

  handleAddNote = (color) => {
    const notes = this.state.notes;
    let id = "";
    notes.push(
      <Note
        key={(id = uuidv4())}
        color={color}
        onDelete={() => this.handleDelete(id)}
      />
    );
    this.setState({ notes });
  };

  handleDelete = (id) => {
    const notes = [...this.state.notes];
    const index = notes.findIndex((note) => note.key === id);
    notes.splice(index, 1);
    this.setState({ notes });
  };

  render() {
    return (
      <div className="notesDiv">
        <NoteBtn onAddNote={this.handleAddNote} />
        {this.state.notes.length > 0 ? (
          <Fragment>
            <h1 className="text-4xl font-bold mt-2 ml-4">Notes</h1>
            <ul className="notesList">
              {this.state.notes.map((note) => note)}
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
