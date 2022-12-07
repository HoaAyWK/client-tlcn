import axiosClient from "./axiosClient";

class EmployerApi {
    updateProfile = (data) => {
        const url = '/employer/edit';
        return axiosClient.put(url, data);
    };
    getInfo = (id) => {
        const url = `/employer/info?id=${id}`
        return axiosClient.get(url)
    }
}

export default new EmployerApi();
