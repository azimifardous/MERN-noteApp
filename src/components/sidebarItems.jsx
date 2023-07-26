import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faRightFromBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const SidebarItems = () => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "home"
  );

  const handleItemClick = (item) => {
    localStorage.setItem("activeItem", item);
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
        <Link to="/logout" className="ml-5">
          Log out
        </Link>
      </li>
    </ul>
  );
};

export default SidebarItems;
