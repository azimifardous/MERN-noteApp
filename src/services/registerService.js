import httpService from './httpService';
import { apiEndpoint } from './config';

function register(user) {
    return httpService.post(`${apiEndpoint}/users`, {
        name: user.name,
        email: user.email,
        password: user.password
    })
}

async function getUser() {
    const userId = localStorage.getItem('userId');
    return await httpService.get(`${apiEndpoint}/users/${userId}`)
}

function updateUser(user) {
    const userId = localStorage.getItem('userId');
    return httpService.put(`${apiEndpoint}/users/${userId}`, {
        name: user.name,
        email: user.email,
        currentPassword: user.currentPassword,
        newPassword: user.newPassword
    })
}

function deleteUser() {
    const userId = localStorage.getItem('userId');
    return httpService.delete(`${apiEndpoint}/users/${userId}`)
}

function generateNewAvatar() {
    const userId = localStorage.getItem('userId');
    return httpService.patch(`${apiEndpoint}/users/${userId}/avatar`)
}

export default {
    register,
    generateNewAvatar,
    getUser,
    updateUser,
    deleteUser
}
