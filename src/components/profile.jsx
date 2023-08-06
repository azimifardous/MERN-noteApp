import React, { Fragment, useState } from "react";
import registerService from "../services/registerService";
import DeleteModal from "./deleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Joi from "joi-browser";
import useUser from "./hooks/useUser";
import useForm from "./hooks/useForm";
import { validate } from "./utils/validateForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../services/httpService";

const Profile = () => {
  const userData = {
    user: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
    },
    errors: {},
  };

  const [isModalActive, setIsModalActive] = useState(false);

  const schema = {
    name: Joi.string(),
    email: Joi.string().email(),
    currentPassword: Joi.string().required().label("Current Password"),
    newPassword: Joi.string().required().label("New Password"),
  };

  const { data, setData, handleChange, handleSubmit } = useForm(
    userData,
    schema
  );

  const handleDelete = async () => {
    try {
      await registerService.deleteUser();
      window.location = "/logout";
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleClosingModal = () => setIsModalActive(false);
  const handleOpeningModal = () => setIsModalActive(true);

  const renderButton = (label) => {
    return (
      <button
        type="submit"
        disabled={validate(data, schema)}
        className="authBtn mt-0"
      >
        {label}
      </button>
    );
  };

  const renderDeleteBtn = () => {
    return (
      <button
        type="button"
        onClick={handleOpeningModal}
        className="authBtn deleteAcc"
      >
        Delete Account
      </button>
    );
  };

  const renderInput = (name, label, value, type = "text") => {
    const { user, errors } = data;
    const error = errors[name];
    return (
      <div className="w-full text-sm mb-6">
        <label className="authLabel">{label}</label>
        <input
          className="authInput disabled:bg-gray-100"
          name={name}
          type={type}
          value={user[name] || value}
          onChange={handleChange}
          disabled={value ? true : false}
        />
        {error && (
          <p className="error">
            <span className="font-medium">Oh, snapp!</span> {error}
          </p>
        )}
      </div>
    );
  };

  const doSubmit = async () => {
    // try {
    //   await registerService.updateUser(this.state.data);
    //   window.location = "/";
    // } catch (ex) {
    //   const errors = { ...this.state.errors };
    //   errors.currentPassword = ex.response.data;
    //   this.setState({ errors });
    // }
  };

  const mutation = useMutation(registerService.updateUserAvatar);
  const queryClient = useQueryClient();

  const handleChangeAvatar = () => {
    mutation.mutate("", {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    });
  };

  const { user, isLoading } = useUser();
  if (isLoading) return <p>Loading...</p>;

  const { avatar, name, email } = user.data;
  return (
    <Fragment>
      <DeleteModal
        handleDelete={handleDelete}
        handleClosingModal={handleClosingModal}
        isModalActive={isModalActive}
      />
      <h1 className="profileHeader">My Profile</h1>
      <div className="profileDiv">
        <div className="relative">
          <img src={avatar} alt="avatar" className="avatar" />
          <button className="avatarBtn" onClick={handleChangeAvatar}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e, doSubmit)}
          className="w-full px-8 py-5 md:w-2/3"
        >
          {renderInput("name", "Full Name", name)}
          {renderInput("email", "Email Address", email, "email")}
          {renderInput("currentPassword", "Current Password", "", "password")}
          {renderInput("newPassword", "New Password", "", "password")}
          <div className="flex justify-between">
            {renderButton("Save")}
            {renderDeleteBtn()}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Profile;
