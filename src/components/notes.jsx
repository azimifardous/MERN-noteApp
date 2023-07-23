import React, { Fragment } from "react";

const Notes = ({ notes }) => {
  return (
    <div className="absolute left-10 top-24 w-full px-10 text-black md:w-2/3 md:left-64 md:p-0 lg:left-80 lg:w-3/4">
      {notes.length > 0 ? (
        <Fragment>
          <h1 className="text-4xl font-bold">Notes</h1>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => note)}
          </ul>
        </Fragment>
      ) : (
        <div className="text-center select-none text-gray-400 w-full absolute h-full top-[250px] right-10">
          Add a note...
        </div>
      )}
    </div>
  );
};

export default Notes;
