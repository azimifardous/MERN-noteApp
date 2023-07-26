import httpService from "./httpService";
import { apiEndpoint } from "./config";
import jwtDecode from 'jwt-decode';

httpService.setJWT(getJWT());

async function login(user) {
    const { data } = await httpService.post(`${apiEndpoint}/auth`, {
        email: user.email,
        password: user.password
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
};

function loginWithJWT(jwt) {
    localStorage.setItem('token', jwt);
}

function getJWT() {
    return localStorage.getItem('token');
}

async function getUser() {
    const userId = localStorage.getItem('userId');
    return await httpService.get(`${apiEndpoint}/users/${userId}`)
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem('userId');
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJWT,
    getJWT,
    getUser
}