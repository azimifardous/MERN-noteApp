import Axios from 'axios';

Axios.interceptors.response.use(null, error => {
    const expectedErr = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedErr) {
        console.log("Logging the error", error);
    }

    return Promise.reject(error);
})

function setJWT(jwt) {
    Axios.defaults.headers.common['x-auth-token'] = jwt;
}

const httpService = {
    get: Axios.get,
    put: Axios.put,
    delete: Axios.delete,
    post: Axios.post,
    patch: Axios.patch,
    setJWT: setJWT
}

export default httpService;