import React, { useState, useRef, useEffect } from "react";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Note = ({ color, onDelete }) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [isMouseOnNote, setIsMouseOnNote] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExceedingLimit, setIsExceedingLimit] = useState(false);
  const maxChars = 100;
  let prevText = "";

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
    const textareaElement = textAreaRef.current;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    textareaElement.addEventListener("focus", handleFocus);
    textareaElement.addEventListener("blur", handleBlur);

    return () => {
      textareaElement.removeEventListener("focus", handleFocus);
      textareaElement.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <li className={`w-[250px] h-[220px] rounded-xl shadow-md bg-${color}`}>
      <span
        className="relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isMouseOnNote && !isFocused && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white absolute left-[-8px] top-[-210px] w-7 h-7 text-sm text-center rounded-full transition-all active:scale-90"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        <textarea
          ref={textAreaRef}
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="bg-transparent w-[250px] h-[220px] rounded-xl p-4 resize-none shadow-none focus:outline outline-none border-none focus:border-none"
        />
        <button
          onClick={handleClear}
          className={`absolute bottom-5 text-white h-8 w-8 text-sm bg-black rounded-full right-5 active:scale-90 transition-all ${
            isFocused ? "hidden" : ""
          }`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </li>
  );
};

export default Note;
