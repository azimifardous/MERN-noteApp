import { useEffect } from "react";
import authService from "../services/authService";

const Logout = () => {
  useEffect(() => {
    authService.logout();
    window.location = "/login";
  });
};

export default Logout;
