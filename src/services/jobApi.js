import axiosClient from "./axiosClient";

class JobApi {
    createJob = (data) => {
        const url = '/job/create';
        return axiosClient.post(url, data);
    };

    getJobs = (num, page) => {
        const url = `/job/show?num=${num}&page=${page}`;
        return axiosClient.get(url);
    };
};

export default new JobApi();
