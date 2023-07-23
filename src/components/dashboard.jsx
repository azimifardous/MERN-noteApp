import React, { Fragment } from "react";
import Sidebar from "./sideBar";

const Dashboard = ({ children }) => {
  return (
    <Fragment>
      <Sidebar />
      {children}
    </Fragment>
  );
};

export default Dashboard;
