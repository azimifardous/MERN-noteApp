import httpService from './httpService';
import { apiEndpoint } from './config';
import authService from './authService';

const { _id: currentUserId } = authService.getCurrentUser() || "";
const usersAPI = `${apiEndpoint}/users`;

function register(user) {
    return httpService.post(usersAPI, {
        name: user.name,
        email: user.email,
        password: user.password
    })
}

function updateUser(user) {
    return httpService.put(`${usersAPI}/${currentUserId}`, {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword
    })
}

function deleteUser() {
    return httpService.delete(`${usersAPI}/${currentUserId}`)
}

function generateNewAvatar() {
    return httpService.patch(`${usersAPI}/${currentUserId}/avatar`)
}

export default {
    register,
    generateNewAvatar,
    updateUser,
    deleteUser
}
