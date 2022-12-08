import axiosClient from "./axiosClient";

class AppliedApi {
    checkApply = (job) => {
        const url = `applied/check/${job}`
        return axiosClient.get(url)
    }
    
    createApply = (data) => {
        const url = '/applied/add';
        return axiosClient.post(url, data);
    };

    getMyApplies = (page) => {
        const url = `/applied/my?page=${page}&limit=5`;
        return axiosClient.get(url);
    }
};

export default new AppliedApi();