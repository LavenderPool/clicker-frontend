import $api from "../api";
export type LanguageCodes = "en" | "ru" | "es" | "id";
export default class UserService {

    static async getUserInfo(){
        return await $api.get(`user/info`)
    }

    static async updateUser(public_name: string, language_code: string ){
        return await $api.post(`user`, {public_name: public_name, language_code: language_code})
    }
}