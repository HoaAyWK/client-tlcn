import axiosClient from "./axiosClient";

class UserApi {
    updateProfile = (data) => {
        const url = '/users/profile';
        return axiosClient.put(url, data);
    };
}

export default new UserApi();
