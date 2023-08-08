import { useMutation } from "@tanstack/react-query";
import authService from "../../services/authService";

const useAuthMutation = (setData) => {
    return useMutation(authService.login, {
        onSuccess: () => window.location = "/home",
        onError: ex => setData((prevData) => ({
            ...prevData,
            errors: {
                ...prevData.errors,
                email: ex.response.data,
            }
        }))
    })
}

export default useAuthMutation;