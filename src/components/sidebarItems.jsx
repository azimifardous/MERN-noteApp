import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const SidebarItems = ({ onGetColor }) => {
  const [isListOpen, setIsListOpen] = useState(true);

  const toggleColorList = () => {
    setIsListOpen(!isListOpen);
  };

  const noteColors = [
    "customRed",
    "customOrange",
    "customYellow",
    "customPink",
  ];

  return (
    <ul className="mt-10 text-white">
      <li className="flex flex-row justify-center items-center hover:bg-customGreen p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full active:scale-90">
        <FontAwesomeIcon icon={faUser} />
        <a href="#" className="ml-5">
          Profile
        </a>
      </li>
      <li
        className="flex flex-row justify-center items-center hover:bg-customGreen mt-2 p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full active:scale-90 "
        onClick={toggleColorList}
      >
        <FontAwesomeIcon icon={isListOpen ? faMinus : faPlus} />
        <a href="#" className="ml-5">
          Add Note
        </a>
      </li>

      <div className={`list ${isListOpen ? "active" : ""}`}>
        <ul>
          {noteColors.map((color) => {
            return (
              <li
                key={uuidv4()}
                className="flex flex-row justify-center items-center p-2 pl-4 pr-4 mt-5"
              >
                <a
                  href="#"
                  onClick={() => onGetColor(color)}
                  className={`w-5 h-5 rounded-full transition-all active:scale-90 bg-${color}`}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <li className="flex flex-row justify-center items-center hover:bg-customGreen p-2 cursor-pointer transition-all mt-2 rounded-full relative top-[50px] active:scale-90">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <a href="#" className="ml-5">
          Log out
        </a>
      </li>
    </ul>
  );
};

export default SidebarItems;
