import axios from "axios";
import { DOMAIN, USER_LOGIN } from "../utils/settings/config";
import { TOKEN_CYBERSOFT } from "../utils/settings/config";

const api = axios.create({
    baseURL: DOMAIN,
});

api.interceptors.request.use(
    function (config) {
        const toKenUser = "Bearer " + JSON.parse(localStorage.getItem(USER_LOGIN))?.accessToken;
        config.headers = {
            ...config.headers,
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: toKenUser,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export { api };