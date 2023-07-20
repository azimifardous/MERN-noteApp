import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const DashItems = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleColorList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <ul className="mt-10 text-white">
      <li className="flex flex-row justify-center items-center hover:bg-customGreen p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full">
        <FontAwesomeIcon icon={faUser} />
        <a href="#" className="ml-5">
          Profile
        </a>
      </li>
      <li
        className="flex flex-row justify-center items-center hover:bg-customGreen mt-2 p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full"
        onClick={toggleColorList}
      >
        <FontAwesomeIcon icon={faPlus} />
        <a href="#" className="ml-5">
          Add Note
        </a>
      </li>
      <div className={`list ${isListOpen ? "active" : ""}`}>
        <ul>
          <li className="flex flex-row justify-center items-center p-2 pl-4 pr-4 mt-5 cursor-pointer transition-all rounded-full">
            <a href="#" className="w-5 h-5 bg-customOrange rounded-full"></a>
          </li>
          <li className="flex flex-row justify-center items-center p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full mt-5">
            <a href="#" className="w-5 h-5 bg-customYellow rounded-full"></a>
          </li>
          <li className="flex flex-row justify-center items-center p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full mt-5">
            <a href="#" className="w-5 h-5 bg-customRed rounded-full"></a>
          </li>
          <li className="flex flex-row justify-center items-center p-2 pl-4 pr-4 cursor-pointer transition-all rounded-full mt-5">
            <a href="#" className="w-5 h-5 bg-customPink rounded-full"></a>
          </li>
        </ul>
      </div>
      <li className="flex flex-row justify-center items-center hover:bg-customGreen p-2 cursor-pointer transition-all mt-2 rounded-full relative top-[50px]">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <a href="#" className="ml-5">
          Log out
        </a>
      </li>
    </ul>
  );
};

export default DashItems;
