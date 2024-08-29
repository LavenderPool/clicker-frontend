import $api from "../api";

export default class ClickService {

    static async click(){
        return await $api.post(`click`)
    }
    static async megaClick(){
        return await $api.post(`mega-click`)
    }
}