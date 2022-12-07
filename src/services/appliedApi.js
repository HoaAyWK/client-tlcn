import axiosClient from "./axiosClient";

class AppliedApi {
    checkApply = (job) => {
        const url = `applied/check/${job}`
        return axiosClient.get(url)
    }
    
};

export default new AppliedApi();