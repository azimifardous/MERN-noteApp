import React from "react";
import Joi from "joi-browser";
import Header from "../common/header";
import Footer from "../common/footer";
import registerService from "./registerService";
import authService from "../auth/authService";
import useForm from "../hooks/useForm";
import Input from "../common/input";
import { Link, Redirect } from "react-router-dom";
import { validate } from "../utils/validateForm";
import { useMutation } from "@tanstack/react-query";

const RegisterForm = () => {
  const userData = {
    user: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().max(64).required().label("Name"),
  };

  const { data, setData, handleChange, handleSubmit } = useForm(
    userData,
    schema
  );

  const mutation = useMutation(registerService.register);

  const doSubmit = async () => {
    mutation.mutate(data.user, {
      onSuccess: (res) => {
        authService.loginWithJWT(res.headers["x-auth-token"]);
        window.location = "/";
      },
      onError: (ex) => {
        setData((prevData) => ({
          ...prevData,
          errors: {
            ...prevData.errors,
            name: ex.response.data,
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
          <span className="text-2xl font-light ">Sign up a new account</span>
          <div className="mt-4 bg-white shadow-md rounded-lg text-left">
            <div className="h-2 bg-customRed rounded-t-md" />
            <div className="px-8 py-6 ">
              <Input
                name="name"
                value={data.user["name"]}
                onChange={handleChange}
                type="text"
                label="Full Name"
                error={data.errors["name"]}
              />
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
                  {mutation.isLoading ? "Signing up..." : "Sign up"}
                </button>
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
};

export default RegisterForm;
