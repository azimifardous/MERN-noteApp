import React, { useContext } from "react";
import UserContext from "./context/userContext";

const SidebarHeader = () => {
  const { avatar, name } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-pacifico text-white mt-5 text-2xl">Dashboard</h1>
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full w-20 h-20 mt-5 border-white border-4"
      />
      <p className="mt-5 text-white">{name}</p>
    </div>
  );
};

export default SidebarHeader;
