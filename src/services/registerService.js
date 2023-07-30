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

function deleteUser() {
    return httpService.delete(`/users/${currentUserId}`)
}

function generateNewAvatar() {
    return httpService.patch(`/users/${currentUserId}/avatar`)
}

export default {
    register,
    generateNewAvatar,
    updateUser,
    deleteUser
}
