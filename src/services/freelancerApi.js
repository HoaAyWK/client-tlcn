import axiosClient from "./axiosClient";

class FreelancerApi {
    updateProfile = (data) => {
        const url = '/freelancer/edit';
        return axiosClient.put(url, data);
    };

    getFreelancers = () => {
        const url = '/freelancer';
        return axiosClient.get(url);
    }
    getInfoFreelancer = (id) => {
        const url = `/freelancer/info?id=${id}`
        return axiosClient.get(url)
    }
}

export default new FreelancerApi();
