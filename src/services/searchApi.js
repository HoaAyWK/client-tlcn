import axiosClient from "./axiosClient";

class SearchApi {
    searchJobs = (keyword, page) => {
        console.log(page)
        const url = `/search/jobs?name=${keyword}&company=${keyword}&limit=5&page=${page}`;
        return axiosClient.get(url);
    }
}

export default new SearchApi();
