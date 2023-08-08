import { useMutation } from "@tanstack/react-query";
import authService from "../../services/authService";

const useAuthMutation = () => {
    const mutation = useMutation(authService.login);
    const handleError = (error, setData) => setData((prevData) => ({
        ...prevData,
        errors: {
            ...prevData.errors,
            email: error.response.data,
        },
    }));

    return {
        mutation,
        handleError
    }
}

export default useAuthMutation;