import registerService from "../registration/registerService";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await registerService.getUser();
            return data
        },
        staleTime: 60 * 60 * 1000 //1hr
    });
}

export default useUser;