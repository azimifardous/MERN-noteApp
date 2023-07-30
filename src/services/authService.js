import httpService from "./httpService";
import { apiEndpoint } from "./config";
import jwtDecode from 'jwt-decode';

httpService.setJWT(getJWT());

async function login(user) {
    const { data: jwt } = await httpService.post(`${apiEndpoint}/auth`, {
        email: user.email,
        password: user.password
    });

    localStorage.setItem('token', jwt);
};

function loginWithJWT(jwt) {
    localStorage.setItem('token', jwt);
}

function getJWT() {
    return localStorage.getItem('token');
}


function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem('activeItem');
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
}