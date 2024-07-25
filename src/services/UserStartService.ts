import $api from "../api";
export default class UserStartService {

    static async makeOpenedTrue(){
        return await $api.get(`user-start/start`)
    }

    static async makeOpenedAgeTrue(){
        return await $api.get(`user-start/age`)
    }
}