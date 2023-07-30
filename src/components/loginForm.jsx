import React from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import Header from "./common/header";
import Footer from "./common/footer";
import authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await authService.login(this.state.data);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/home" />;
    return (
      <div className="formDiv">
        <Header />
        <form onSubmit={this.handleSubmit} className="form">
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