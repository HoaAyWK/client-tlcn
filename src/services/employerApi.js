import axiosClient from "./axiosClient";

class EmployerApi {
    updateProfile = (data) => {
        const url = '/employer/edit';
        return axiosClient.put(url, data);
    };

}

export default new EmployerApi();
