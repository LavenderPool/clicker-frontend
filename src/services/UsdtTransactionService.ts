import $api from "../api";
export default class UsdtTransactionService {

    static async create(amount: number, address: string){
        return await $api.post(`usdt-transaction`, {
            amount: amount,
            address: address
        })
    }
}