import axiosClient from "./axiosClient";

class TransactionApi {
    getMyTransactions = () => {
        const url = '/transactions/my';
        return axiosClient.get(url);
    };
}


export default new TransactionApi();
