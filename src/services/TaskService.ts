import $api from "../api";
export default class TaskService {

    static async getTasks(){
        return await $api.get('/task')
    }

    static async addTgTry(task_id: number){
        return await $api.post('/task/tg/try', {task_id: task_id})
    }
    static async collectReward(task_id: number){
        return await $api.post('/task/collect', {task_id: task_id})
    }
}