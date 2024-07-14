import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task, UserTask} from "../../models/TaskModule.ts";

interface TasksState {
    is_loaded: boolean,
    tasks?: Task[],
}

const initialState: TasksState = {
    is_loaded: false,
}

export const TasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        storeTasks(state, action:PayloadAction<Task[]>){
            state.tasks = action.payload
            state.is_loaded = true
        },
        makeTaskCompleted(state, action:PayloadAction<{user_task: UserTask, task_id: number}>){
            if(state.tasks){
                const task = state?.tasks.find(i => i.id == action.payload.task_id);
                if (task) {
                    task.user_task = action.payload.user_task;
                    task.completed = false;
                }
            }
        },
        enableTaskCollected(state, action:PayloadAction<number | string>){
            if(state.tasks){
                const task = state?.tasks.find(i => i.id == action.payload);
                if (task && task.user_task) {
                    task.user_task.task_collected = true;
                }
            }
        },
        disableTaskCollected(state, action:PayloadAction<number>){
            if(state.tasks){
                const task = state?.tasks.find(i => i.id == action.payload);
                if (task && task.user_task) {
                    task.user_task.task_collected = false;
                }
            }
        }
    }
})

export default TasksSlice.reducer