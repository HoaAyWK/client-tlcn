import axiosClient from "./axiosClient";

class SkillApi {
    getSkills = () => {
        const url = '/skills/show';
        return axiosClient.get(url);
    };

}

export default new SkillApi();
