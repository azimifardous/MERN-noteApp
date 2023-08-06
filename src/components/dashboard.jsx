import React from "react";
import Sidebar from "./sideBar";

const Dashboard = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default Dashboard;
