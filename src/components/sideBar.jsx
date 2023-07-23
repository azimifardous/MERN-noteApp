import React, { Fragment, useState, useEffect } from "react";
import SidebarHeader from "./sidebarHeader";
import SidebarItems from "./sidebarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleOutsideClick = (event) => {
    if (event.target.className === "overlay active") setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Remove the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Fragment>
      <button
        onClick={toggleSidebar}
        className={`btn ${isSidebarOpen ? "hide" : ""}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`overlay ${isSidebarOpen ? "active" : ""}`} />
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <SidebarHeader />
        <SidebarItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;
