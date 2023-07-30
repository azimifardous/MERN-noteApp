import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class ProfileForm extends Form {
  schema = {
    name: Joi.string(),
    email: Joi.string().email(),
    currentPassword: Joi.string().required().label("Current Password"),
    newPassword: Joi.string().required().label("New Password"),
  };

  renderButton = (label) => {
    return (
      <button type="submit" disabled={this.validate()} className="authBtn mt-0">
        {label}
      </button>
    );
  };

  renderDeleteBtn = () => {
    return (
      <button
        type="button"
        onClick={this.handleOpeningModal}
        className="authBtn deleteAcc"
      >
        Delete Account
      </button>
    );
  };

  renderInput = (name, label, value, type = "text") => {
    const { data, errors } = this.state;
    const error = errors[name];
    return (
      <div className="w-full text-sm mb-6">
        <label className="authLabel">{label}</label>
        <input
          className="authInput disabled:bg-gray-100"
          name={name}
          type={type}
          value={data[name] || value}
          onChange={this.handleChange}
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
}

export default ProfileForm;
