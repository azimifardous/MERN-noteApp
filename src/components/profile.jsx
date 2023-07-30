import React, { Fragment } from "react";
import ProfileForm from "./profileForm";
import UserContext from "./context/userContext";
import registerService from "../services/registerService";
import DeleteModal from "./deleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

class Profile extends ProfileForm {
  state = { data: {}, errors: {}, isModalActive: false };
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

  handleClosingModal = () => this.setState({ isModalActive: false });
  handleOpeningModal = () => this.setState({ isModalActive: true });

  render() {
    const { name, email, avatar, getNewAvatar } = this.context;
    return (
      <Fragment>
        <DeleteModal
          handleDelete={this.handleDelete}
          handleClosingModal={this.handleClosingModal}
          isModalActive={this.state.isModalActive}
        />
        <h1 className="profileHeader">My Profile</h1>
        <div className="profileDiv">
          <div className="relative">
            <img src={avatar} alt="avatar" className="avatar" />
            <button onClick={getNewAvatar} className="avatarBtn">
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
