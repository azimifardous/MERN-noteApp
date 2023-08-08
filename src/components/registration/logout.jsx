import { useEffect } from "react";
import authService from "../auth/authService";

const Logout = () => {
  useEffect(() => {
    authService.logout();
    window.location = "/login";
  });
};

export default Logout;
