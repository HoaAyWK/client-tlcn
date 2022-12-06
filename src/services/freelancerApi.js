import axiosClient from "./axiosClient";

class FreelancerApi {
    updateProfile = (data) => {
        const url = '/freelancer/edit';
        return axiosClient.put(url, data);
    };
}

export default new FreelancerApi();
