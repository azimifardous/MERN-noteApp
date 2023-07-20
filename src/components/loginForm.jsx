import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import Header from "./common/header";
import Footer from "./common/footer";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call the server
    console.log("logged in.");
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
            <span className="text-2xl font-light ">Login to your account</span>
            <div className="mt-4 bg-white shadow-md rounded-lg text-left">
              <div className="h-2 bg-customRed rounded-t-md" />
              <div className="px-8 py-6">
                {this.renderInput("email", "Email Address", "email")}
                {this.renderInput("password", "Password", "password")}
                <div className="flex justify-between items-baseline">
                  {this.renderButton("Login")}
                  <Link to="/register" className="text-sm hover:underline">
                    Sign Up
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

export default LoginForm;
