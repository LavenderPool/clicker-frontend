import $api from "../api";
import {BoosterNames} from "../models/BoosterModule";

export default class BoosterService {

    static async getUserBoosters(){
        return await $api.get(`boosters`)
    }

    static async upgradeBooster(boosterName: BoosterNames){
        return await $api.post('boosters/upgrade', {type: boosterName})
    }
}