import React, { useState, useRef, useEffect } from "react";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import noteService from "../../services/noteService";

const Note = ({ color, onDelete, id }) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [isMouseOnNote, setIsMouseOnNote] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExceedingLimit, setIsExceedingLimit] = useState(false);
  const maxChars = 100;
  let prevText = "";

  const autoSave = async () => {
    try {
      await noteService.updateNote({
        _id: id,
        content: text,
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const currentCharCount = value.length;

    if (currentCharCount > maxChars) {
      setIsExceedingLimit(true);
      return;
    }

    setIsExceedingLimit(false);
    prevText = value;
    setText(value);
  };

  const handleKeyDown = (event) => {
    // Allow the user to delete if the textarea is exceeding the limit
    if (isExceedingLimit && event.key === "Backspace") {
      prevText = text;
    }
  };

  const handleClear = () => setText("");

  const handleMouseOver = () => setIsMouseOnNote(true);

  const handleMouseOut = () => setIsMouseOnNote(false);

  useEffect(() => {
    const autoSaveInterval = setInterval(autoSave, 5000);

    return () => {
      clearInterval(autoSaveInterval);
    };
  }, [text]);

  useEffect(() => {
    const textareaElement = textAreaRef.current;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    getNoteContent();

    textareaElement.addEventListener("focus", handleFocus);
    textareaElement.addEventListener("blur", handleBlur);

    return () => {
      textareaElement.removeEventListener("focus", handleFocus);
      textareaElement.removeEventListener("blur", handleBlur);
    };
  }, []);

  const getNoteContent = async () => {
    const { data: note } = await noteService.getNote(id);
    setText(note.content);
  };

  return (
    <li className={`note ${color}`}>
      <span
        className="relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isMouseOnNote && !isFocused && (
          <button onClick={onDelete} className="deleteBtn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        <textarea
          ref={textAreaRef}
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="textArea"
        />
        <button
          onClick={handleClear}
          className={`clearBtn ${isFocused ? "hidden" : ""}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </li>
  );
};

export default Note;
