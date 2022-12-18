import axiosClient from "./axiosClient";

class JobApi {
    createJob = (data) => {
        const url = '/job/create';
        return axiosClient.post(url, data);
    };

    getJobs = () => {
        const url = `/job/latest`;
        return axiosClient.get(url);
    };

    getJob = (id) => {
        const url = `/job/single/${id}`;
        return axiosClient.get(url);
    };

    getMyJobs = () => {
        const url = '/job/my';
        return axiosClient.get(url);
    };

};

export default new JobApi();
