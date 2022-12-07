import axiosClient from './axiosClient';

class CommentApi {
    getComments = (id) => {
        const url = `/comment/show?id=${id}`
        return axiosClient.get(url)
    };
}

export default new CommentApi();