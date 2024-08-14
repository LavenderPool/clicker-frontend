import $api from "../api";
export default class TaskService {

    static async getTasks(){
        return await $api.get('/task')
    }

    static async addTgTry(task_id: number){
        return await $api.post('/task/tg/try', {task_id: task_id})
    }

    static async collectReward(task_id: number | string){
        return await $api.post('/task/collect', {task_id: task_id})
    }

    static async checkTask(task_id: number){
        return await $api.get(`/task/check/${task_id}`)
    }

    static async claimLink(task_id: number) {
        return await $api.get(`/task/claim-link/${task_id}`)
    }
    static async claimFriends(task_id: number) {
        return await $api.get(`/task/claim-friends/${task_id}`)
    }


    static async claimAdReward(){
        return await $api.post(`/task/collect-ad`)
    }
}