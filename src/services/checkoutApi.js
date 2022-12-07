import axiosClient from './axiosClient';

class CheckoutApi {
    checkout = (pricing) => {
        const url = `/checkout?package=${pricing}`;
        return axiosClient.get(url);
    }
}


export default new CheckoutApi();
