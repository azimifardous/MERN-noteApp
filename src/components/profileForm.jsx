import React from "react";
import Button from "./common/button";
import Input from "./common/profileInput";
import useUser from "./hooks/useUser";
import DeleteBtn from "./common/deleteBtn";
import Joi from "joi-browser";
import useForm from "./hooks/useForm";

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
    newPassword: Joi.string().min(8).required().label("New Password"),
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
        <Button label="Save" isValid={true} />
        <DeleteBtn onOpenModal={onOpenModal} />
      </div>
    </form>
  );
};

export default ProfileForm;
