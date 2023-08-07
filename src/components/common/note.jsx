import React, { useRef } from "react";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import useText from "../hooks/useText";

const Note = ({ color, onDelete, id }) => {
  const textAreaRef = useRef(null);
  const { note, onChange, onMouseOut, onMouseOver, onClear } =
    useText(textAreaRef);

  return (
    <li className={`note ${color}`}>
      <span
        className="relative"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {note.isMouseOnNote && !note.isFocused && (
          <button onClick={onDelete} className="deleteBtn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        <textarea
          ref={textAreaRef}
          value={note.content}
          // onKeyDown={handleKeyDown}
          onChange={(e) => onChange(e)}
          className="textArea"
        />
        <button
          onClick={onClear}
          className={`clearBtn ${note.isFocused ? "hidden" : ""}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </li>
  );
};

export default Note;
