import $api from "../api";

export default class ShopService {

    static async buyMegaClick(){
        return await $api.post(`shop/mega-click`)
    }
    static async changeMegaClick(status: boolean){
        return await $api.post(`shop/mega-click-status`, {status: status})
    }
}