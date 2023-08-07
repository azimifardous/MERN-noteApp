import registerService from "../../services/registerService";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: registerService.getUser,
        staleTime: 60 * 60 * 1000 // 1hr
    });
}

export default useUser;