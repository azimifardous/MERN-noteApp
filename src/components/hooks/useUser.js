import { useState, useEffect } from "react";
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

    const getUserProp = async (userProp, setUserProp) => {
        const { data: user } = await authService.getUser();
        setUserProp(user[userProp]);
    };

    const getNewAvatar = async () => {
        const { data: user } = await authService.generateNewAvatar();
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