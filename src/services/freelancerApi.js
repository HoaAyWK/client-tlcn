import axiosClient from "./axiosClient";

class FreelancerApi {
    updateProfile = (data) => {
        const url = '/freelancer/edit';
        return axiosClient.put(url, data);
    };

    getFreelancers = () => {
        const url = '/freelancer/top';
        return axiosClient.get(url);
    }

    getInfoFreelancer = (id) => {
        const url = `/freelancer/info?id=${id}`
        return axiosClient.get(url)
    }

    turnOnFindJob = () => {
        const url = `/freelancer/turnOn`;
        return axiosClient.put(url);
    };

    turnOffFindJob = () => {
        const url = `/freelancer/turnOff`;
        return axiosClient.put(url);
    };
}

export default new FreelancerApi();
