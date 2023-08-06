import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Header from "./common/header";
import Footer from "./common/footer";
import authService from "../services/authService";
import useForm from "./hooks/useForm";
import { Redirect, Link } from "react-router-dom";
import { validate } from "./utils/validateForm";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const userData = {
    user: {
      email: "",
      password: "",
    },
    errors: {},
  };

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const { data, setData, handleChange, handleSubmit } = useForm(
    userData,
    schema
  );

  const mutation = useMutation(authService.login);

  const doSubmit = () => {
    mutation.mutate(data.user, {
      onSuccess: () => {
        window.location = "/home";
      },
      onError: (ex) => {
        setData((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            email: ex.response.data,
          },
        }));
      },
    });
  };

  const isUserLoggedIn = authService.getCurrentUser();
  if (isUserLoggedIn) return <Redirect to="/home" />;
  return (
    <div className="formDiv">
      <Header />
      <form onSubmit={(e) => handleSubmit(e, doSubmit)} className="form">
        <div className="relative py-3 sm:w-96 mx-auto text-center">
          <span className="text-2xl font-light ">Login to your account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-customRed rounded-t-md" />
            <div className="px-8 py-6">
              <Input
                name="email"
                value={data.user["email"]}
                onChange={handleChange}
                type="email"
                label="Email Address"
                error={data.errors["email"]}
              />
              <Input
                name="password"
                value={data.user["password"]}
                onChange={handleChange}
                type="password"
                label="Password"
                error={data.errors["password"]}
              />
              <div className="flex justify-between items-baseline">
                <button
                  disabled={validate(data.user, schema) || mutation.isLoading}
                  type="submit"
                  className="authBtn"
                >
                  {mutation.isLoading ? "Loginning..." : "Log in"}
                </button>
                <Link to="/register" className="text-sm hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default LoginForm;
