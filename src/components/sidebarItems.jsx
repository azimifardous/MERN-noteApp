import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faRightFromBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const SidebarItems = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <ul className="mt-10 text-white">
      <li
        className={`sideBarItem ${activeItem === "home" ? "active" : ""}`}
        onClick={() => handleItemClick("home")}
      >
        <FontAwesomeIcon icon={faHouse} />
        <Link to="/home" className="ml-5">
          Home
        </Link>
      </li>
      <li
        className={`sideBarItem ${activeItem === "profile" ? "active" : ""}`}
        onClick={() => handleItemClick("profile")}
      >
        <FontAwesomeIcon icon={faUser} />
        <Link to="/me" className="ml-5">
          Profile
        </Link>
      </li>
      <li className="logout">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <a href="#" className="ml-5">
          Log out
        </a>
      </li>
    </ul>
  );
};

export default SidebarItems;
