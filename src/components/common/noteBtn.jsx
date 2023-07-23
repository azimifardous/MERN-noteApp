import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const NoteBtn = ({ onAddNote }) => {
  const [isColorListOpen, setIsColorListOpen] = useState(false);
  const bgColors = [
    "bg-customRed",
    "bg-customOrange",
    "bg-customPink",
    "bg-customYellow",
  ];

  const handleListToggle = () => {
    setIsColorListOpen(!isColorListOpen);
  };

  return (
    <div className="addNote">
      <button className="addNoteBtn" onClick={handleListToggle}>
        <FontAwesomeIcon icon={isColorListOpen ? faMinus : faPlus} />
      </button>
      <ul className={`list ${isColorListOpen ? "active" : ""}`}>
        {bgColors.map((bgColor) => (
          <li key={uuidv4()} className="color">
            <button
              onClick={() => onAddNote(bgColor)}
              className={`colorSelect ${bgColor}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteBtn;
