export interface Task {
    completed: boolean,
    link: string,
    type: string,
    title: string,
    reward: number,
    order: number,
    friends_count: number,

    id: number,

    user_task?: UserTask
}
export interface UserTask {
    reward: number,
    task_collected: boolean
}