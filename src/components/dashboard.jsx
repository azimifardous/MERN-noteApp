import React from "react";
import Sidebar from "./sideBar";
import UserContext from "./context/userContext";
import useUser from "./hooks/useUser";

const Dashboard = ({ children }) => {
  const user = useUser();
  return (
    <UserContext.Provider value={user}>
      <Sidebar />
      {children}
    </UserContext.Provider>
  );
};

export default Dashboard;
