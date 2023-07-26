import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "./context/userContext";

const Profile = () => {
  const { avatar, getNewAvatar, name, email } = useContext(UserContext);
  return (
    <div className="w-full sm:text-xl">
      <h1 className="absolute top-8 left-36 md:left-[300px]">My Profile</h1>
      <form className="w-full flex flex-col justify-center items-center md:w-auto md:absolute md:top-[50px] md:left-[350px] lg:left-[650px]">
        <div className="relative">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-24 h-24 mt-5 border-white shadow-md border-4"
          />
          <button
            onClick={getNewAvatar}
            type="button"
            className="absolute left-[70px] bottom-0 bg-customGreen h-6 w-6 rounded-full text-white text-sm shadow-sm active:scale-90 transition-all"
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <div>
          <label htmlFor="name" className="authLabel text-sm">
            Full Name
          </label>
          <input
            type="text"
            defaultValue={name}
            className="authInput w-[300px] mb-4 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="authLabel text-sm">
            Email Address
          </label>
          <input
            type="email"
            defaultValue={email}
            className="authInput w-[300px] mb-4 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="authLabel text-sm">
            Current Password
          </label>
          <input type="password" className="authInput w-[300px] mb-4 text-sm" />
          <label htmlFor="password" className="authLabel text-sm">
            New Password
          </label>
          <input type="password" className="authInput w-[300px] mb-4 text-sm" />
        </div>
        <div className="w-full flex justify-center items-center text-sm">
          <button className="authBtn mr-2">Save</button>
          <button className="authBtn bg-transparent text-customRed hover:bg-transparent">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
