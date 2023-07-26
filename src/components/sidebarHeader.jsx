import React, { useState, useEffect } from "react";
import authService from "../services/authService";

const SidebarHeader = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getUserProp("avatar", setAvatar);
    getUserProp("name", setName);
  });

  const getUserProp = async (userProp, setUserProp) => {
    const { data: user } = await authService.getUser();
    setUserProp(user[userProp]);
  };

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
