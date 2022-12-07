import axiosClient from "./axiosClient";

class PricingApi {
    getPricings = () => {
        const url = '/packages';
        return axiosClient.get(url);
    }
}

export default new PricingApi();
