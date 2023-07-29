import { useState, useEffect } from "react";
import registerService from "../../services/registerService";
import authService from "../../services/authService";


const useUser = () => {
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getUserProp("avatar", setAvatar);
        getUserProp("name", setName);
        getUserProp("email", setEmail);
    }, []);

    const getUserProp = (userProp, setUserProp) => {
        const user = authService.getCurrentUser();
        setUserProp(user[userProp]);
    };

    const getNewAvatar = async () => {
        const { data: user } = await registerService.generateNewAvatar();
        setAvatar(user.avatar)
    };

    return {
        name,
        email,
        avatar,
        getNewAvatar
    }
}

export default useUser;