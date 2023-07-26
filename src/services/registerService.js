import httpService from './httpService';
import { apiEndpoint } from './config';

export function register(user) {
    return httpService.post(`${apiEndpoint}/users`, {
        name: user.name,
        email: user.email,
        password: user.password
    })
}

