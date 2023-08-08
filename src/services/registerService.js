import httpService from './httpService';
import authService from './authService';

const { _id: currentUserId } = authService.getCurrentUser() || "";

function register(user) {
    return httpService.post("/users", {
        name: user.name,
        email: user.email,
        password: user.password
    })
}

function updateUser(user) {
    return httpService.put(`/users/${currentUserId}`, {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword
    })
}

function getUser() {
    return httpService.get(`/users/${currentUserId}`);
}

function deleteUser() {
    return httpService.delete(`/users/${currentUserId}`)
}

function updateUserAvatar() {
    return httpService.patch(`/users/${currentUserId}/avatar`)
}

export default {
    register,
    updateUser,
    deleteUser,
    getUser,
    updateUserAvatar
}
