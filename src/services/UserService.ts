import $api from "../api";

export default class UserService {

    static async getUserInfo(){
        return await $api.get(`user/info`)
    }
}