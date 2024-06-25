import instance from "../api/instance.ts";

export default class WalletService {

    static async getWallet(){
        return await instance.get(`wallet`)
    }
}