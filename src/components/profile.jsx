import React, { Fragment } from "react";
import ProfileForm from "./profileForm";
import UserContext from "./context/userContext";
import registerService from "../services/registerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

class Profile extends ProfileForm {
  static contextType = UserContext;

  doSubmit = async () => {
    try {
      await registerService.updateUser(this.state.data);
      window.location = "/";
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.currentPassword = ex.response.data;
      this.setState({ errors });
    }
  };

  handleDelete = async () => {
    try {
      await registerService.deleteUser();
      window.location = "/logout";
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { name, email, avatar, getNewAvatar } = this.context;
    return (
      <Fragment>
        <h1 className="absolute top-9 left-36 md:left-[300px] sm:text-xl">
          My Profile
        </h1>
        <div className="flex flex-col justify-center items-center pt-20 md:ml-[250px]">
          <div className="relative">
            <img
              src={avatar}
              alt="avatar"
              className="rounded-full w-24 h-24 mt-5 border-white bg-white border-4 shadow-lg"
            />
            <button
              onClick={getNewAvatar}
              className="absolute bg-customGreen rounded-full h-5 w-5 text-xs text-white pt-[1px] right-[4px] bottom-[3px] active:scale-90 transition-all"
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="w-full px-8 py-5 md:w-2/3"
          >
            {this.renderInput("name", "Full Name", name)}
            {this.renderInput("email", "Email Address", email, "email")}
            {this.renderInput(
              "currentPassword",
              "Current Password",
              "",
              "password"
            )}
            {this.renderInput("newPassword", "New Password", "", "password")}
            <div className="flex justify-between">
              {this.renderButton("Save")}
              {this.renderDeleteBtn()}
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
