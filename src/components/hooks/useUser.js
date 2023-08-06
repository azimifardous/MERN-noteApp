import registerService from "../../services/registerService";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: registerService.getUser,
    });
}

export default useUser;