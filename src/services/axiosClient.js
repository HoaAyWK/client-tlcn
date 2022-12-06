// api/axiosClient.js
import axios from "axios";
// import queryString from "query-string";

import { API_URL } from '../constants';
 
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "content-type": "application/json",
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem('accessToken'));

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
        throw new Error(message);
    }
);
export default axiosClient;
