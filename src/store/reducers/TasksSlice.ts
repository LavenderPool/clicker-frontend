import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../models/TaskModule.ts";

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
        enableTaskCollected(state, action:PayloadAction<number>){
            const task = state.tasks.find(i => i.id == action.payload);
            if (task && task.user_task) {
                task.user_task.task_collected = true;
            }
        },
        disableTaskCollected(state, action:PayloadAction<number>){
            const task = state.tasks.find(i => i.id == action.payload);
            if (task && task.user_task) {
                task.user_task.task_collected = false;
            }
        }
    }
})

export default TasksSlice.reducer