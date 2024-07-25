import $api from "../api";
export type LanguageCodes = "en" | "ru" | "es" | "id";
export default class UserService {

    static async getUserInfo(){
        return await $api.get(`user/info`)
    }

    static async updateUserPublicName(public_name: string, ){
        return await $api.post(`user/public_name`, {public_name: public_name})
    }
    static async updateLanguage(language_code: string){
        return await $api.post(`user/language`, {language_code: language_code})
    }
}