import $api from "../api";

export default class RouletteService {


    static async buy(){
        return await $api.post(`roulette/buy`)
    }
    static async spin(){
        return await $api.post(`roulette/spin`)
    }
    static async getCollect(){
        return await $api.get(`roulette/`)
    }

    static async getTestAdverse(){
        return await $api.get(`roulette/test/ad`)
    }
}