import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task, UserTask} from "../../models/TaskModule.ts";

export type AdWidgetAdsgramShow = "always" | "on_first_end"
interface AdWidget {
    ad_widget_id: number,
    ad_widget_reward: number,
    ad_widget_multiply: number[]
    ad_widget_tries?: number,
    ad_widget_adsgram_show: AdWidgetAdsgramShow,
    ad_widget_adsgram_id: string,
}
interface TasksState {
    is_loaded: boolean,
    tasks?: Task[],
    ad_widget?: AdWidget,
    ad_popup: boolean,
}

const initialState: TasksState = {
    is_loaded: false,
    ad_popup: false,
}

export const TasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        changePopupState(state){
            state.ad_popup = !state.ad_popup;
        },
        storeAdWidget(state, action:PayloadAction<AdWidget>){
            state.ad_widget = action.payload
        },
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