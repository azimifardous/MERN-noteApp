import React from "react";
import Button from "./common/button";
import Input from "./common/profileInput";
import useUser from "./hooks/useUser";
import DeleteBtn from "./common/deleteBtn";
import Joi from "joi-browser";
import useForm from "./hooks/useForm";
import registerService from "../services/registerService";
import { validate } from "./utils/validateForm";
import { useMutation } from "@tanstack/react-query";

const ProfileForm = ({ onOpenModal }) => {
  const userData = {
    user: {
      currentPassword: "",
      newPassword: "",
    },
    errors: {},
  };

  const schema = {
    currentPassword: Joi.string().required().label("Current Password"),
    newPassword: Joi.string().min(8).required().label("New Password"),
  };

  const { data, setData, handleChange, handleSubmit } = useForm(
    userData,
    schema
  );

  const mutation = useMutation(registerService.updateUser);
  const doSubmit = () => {
    mutation.mutate(data.user, {
      onSuccess: () => (window.location = "/"),
      onError: (ex) => {
        setData((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            currentPassword: ex.response.data,
          },
        }));
      },
    });
  };

  const { data: user, isLoading } = useUser();

  if (isLoading) return;

  const { name, email } = user;
  return (
    <form
      onSubmit={(e) => handleSubmit(e, doSubmit)}
      className="w-full px-8 py-5 md:w-2/3"
    >
      <Input data={data} name="name" value={name} label="Full Name" />
      <Input
        data={data}
        value={email}
        name="email"
        label="Email Address"
        type="email"
      />
      <Input
        value=""
        onChange={handleChange}
        data={data}
        name="currentPassword"
        label="Current Password"
        type="password"
      />
      <Input
        value=""
        onChange={handleChange}
        data={data}
        name="newPassword"
        label="New Password"
        type="password"
      />
      <div className="flex justify-between">
        <Button
          label={mutation.isLoading ? "Saving..." : "Save"}
          isValid={validate(data.user, schema) || mutation.isLoading}
        />
        <DeleteBtn onOpenModal={onOpenModal} />
      </div>
    </form>
  );
};

export default ProfileForm;
