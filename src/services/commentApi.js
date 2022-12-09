import axiosClient from './axiosClient';

class CommentApi {
    getComments = (id) => {
        const url = `/comment/show?id=${id}`
        return axiosClient.get(url)
    };

    getCommentsByReceiver = (id) => {
        const url = `/comment/user?receiver=${id}`;
        return axiosClient.get(url);
    };

    getCommentsBySender = (id) => {
        const url = `/comment/sender?sender=${id}`;
        return axiosClient.get(url);
    }

    addComment = (data) => {
        const url = `/comment/create`;
        return axiosClient.post(url, data);
    };
}

export default new CommentApi();
