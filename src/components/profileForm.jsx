import React, { useState } from "react";
import Button from "./common/button";
import Input from "./common/profileInput";
import useUser from "./hooks/useUser";
import DeleteBtn from "./common/deleteBtn";
import Joi from "joi-browser";
import useForm from "./hooks/useForm";
import { validate } from "joi-browser";

const ProfileForm = ({ onOpenModal }) => {
  const userData = {
    user: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
    },
    errors: {},
  };

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

  const { data: user, isLoading } = useUser();

  if (isLoading) return;

  const { name, email } = user.data;
  return (
    <form
      onSubmit={(e) => handleSubmit(e, doSubmit)}
      className="w-full px-8 py-5 md:w-2/3"
    >
      <Input data={data} name="name" value={name} label="Full Name" />
      <Input
        onChange={handleChange}
        data={data}
        name="email"
        value={email}
        label="Email Address"
        type="email"
      />
      <Input
        onChange={handleChange}
        data={data}
        name="currentPassword"
        label="Current Password"
        type="password"
      />
      <Input
        onChange={handleChange}
        data={data}
        name="newPassword"
        label="New Password"
        type="password"
      />
      <div className="flex justify-between">
        <Button label="Save" isValid={validate(data, schema)} />
        <DeleteBtn onOpenModal={onOpenModal} />
      </div>
    </form>
  );
};

export default ProfileForm;
