import React from "react";
import Form from "./common/form";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().max(64).required().label("Name"),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
      >
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Sign up a new account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-gray-700 rounded-t-md" />
            <div className="px-8 py-6 ">
              {this.renderInput("name", "Full Name")}
              {this.renderInput("email", "Email Address", "email")}
              {this.renderInput("password", "Password", "password")}
              <div className="flex justify-between items-baseline">
                {this.renderButton("Sign up")}
                <Link to="/login" className="text-sm hover:underline">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
