export interface Task {
    completed: boolean,
    link: string,
    type: string,
    title: string,
    reward: number,

    id: number,

    user_task?: {
        reward: number,
        task_collected: boolean
    }
}