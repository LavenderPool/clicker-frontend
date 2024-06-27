import $api from "../api";

export default class ReferralService {

    static async getReferrals(){
        return await $api.get(`referral`)
    }
}