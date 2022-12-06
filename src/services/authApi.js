import axiosClient from "./axiosClient";

class AuthApi {
    login = (data) => {
        const url = '/account/login';
        return axiosClient.post(url, data);
    };

    freelancerRegister = (data) => {
        const url = '/freelancer/register';
        return axiosClient.post(url, data);
    };

    employerRegiser = (data) => {
        const url = '/employer/register';
        return axiosClient.post(url, data);
    };

    changePassword = (data) => {
        const url = '/account/changePassword';
        return axiosClient.put(url, data);
    };

    getCurrentUser = () => {
        const url = '/users/profile';
        return axiosClient.get(url);
    }
};

export default new AuthApi();
