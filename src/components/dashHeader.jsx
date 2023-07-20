import React from "react";

const DashHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-pacifico text-white mt-5 text-2xl">Dashboard</h1>
      <img
        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
        alt="avatar"
        className="rounded-full w-20 h-20 mt-5 border-white border-4"
      />
      <p className="mt-5 text-white">Ahmad Azimi</p>
    </div>
  );
};

export default DashHeader;
