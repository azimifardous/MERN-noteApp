import { useMutation } from "@tanstack/react-query";
import registerService from "../../services/registerService";
import authService from "../../services/authService";

const useRegMutation = (setData) => {
    return useMutation(registerService.register, {
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
        }
    });
}

export default useRegMutation;