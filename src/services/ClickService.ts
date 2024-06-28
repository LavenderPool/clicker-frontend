import $api from "../api";

export default class ClickService {

    static async click(){
        return await $api.post(`click`)
    }
}