import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import authService from "./authService";
import AuthForm from "./authForm";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const isUserLoggedIn = authService.getCurrentUser();
  if (isUserLoggedIn) return <Redirect to="/home" />;
  return (
    <div className="formDiv">
      <Header />
      <AuthForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
