import httpService from "../../services/httpService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import registerService from "../../services/registerService";


const useUser = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: registerService.getUser,
    });



    return {
        user,
        isLoading,
    }

}

export default useUser;