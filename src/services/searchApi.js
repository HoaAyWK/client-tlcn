import axiosClient from "./axiosClient";

class SearchApi {
    searchJobs = (keyword, page, categories) => {
        console.log(page)
        let url = `/search/jobs?name=${keyword}&company=${keyword}&limit=5&page=${page}`;

        if (categories) {
            url = url + `&categories=${categories}`;
        }
        
        return axiosClient.get(url);
    }

    searchFreelancers = (keyword, page) => {
        const url = `/search/freelancers?limit=5&page=${page}&firstName=${keyword}`;
        return axiosClient.get(url);
    }

    searchEmployers = (keyword, page) => {
        const url = `/search/employers?limit=5&page=${page}&companyName=${keyword}`;
        return axiosClient.get(url);
    }
}

export default new SearchApi();
