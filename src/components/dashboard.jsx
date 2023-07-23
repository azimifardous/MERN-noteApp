import React, { Fragment, useState } from "react";
import Sidebar from "./sideBar";
import Notes from "./notes";
import Note from "./common/note";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  let _id = "";
  const handleGetColor = (color) => {
    notes.push(
      <Note
        key={(_id = uuidv4())}
        color={color}
        onDelete={() => handleDelete(_id)}
      />
    );
  };

  const handleDelete = (id) => {
    const index = notes.findIndex((note) => note.key === id);
    const res = notes.splice(index, 1);
    setNotes(notes.filter((note) => note.key !== res.key));
  };

  return (
    <Fragment>
      <Notes notes={notes} />
      <Sidebar onGetColor={handleGetColor} />
    </Fragment>
  );
};

export default Dashboard;
