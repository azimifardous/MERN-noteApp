import React, { Fragment } from "react";
import Form from "./common/form";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Header from "./common/header";
import Footer from "./common/footer";

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
      <div className="flex flex-col h-full w-full justify-center items-center">
        <Header />
        <form
          onSubmit={this.handleSubmit}
          className="relative flex text-customGray antialiased flex-col justify-center overflow-hidden py-6 sm:py-12"
        >
          <div className="relative py-3 sm:w-96 mx-auto text-center">
            <span className="text-2xl font-light ">Sign up a new account</span>
            <div className="mt-4 bg-white shadow-md rounded-lg text-left">
              <div className="h-2 bg-customRed rounded-t-md" />
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
        <Footer />
      </div>
    );
  }
}

export default RegisterForm;
