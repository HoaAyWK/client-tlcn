import axiosClient from './axiosClient';

class CategoryApi {
    getCategories = () => {
        const url = '/categories/all';
        return axiosClient.get(url);
    };
}

export default new CategoryApi();
