import styles from './Tasks.module.scss'
import {useEffect, useState} from "react";
import TaskService from "../../services/TaskService.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TasksSlice} from "../../store/reducers/TasksSlice.ts";
import {Task} from "../../models/TaskModule.ts";
import TasksSkeleton from "../../components/Skeletons/TasksSkeleton.tsx";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import {sendErrorMessage} from "../../utils/helpers.ts";

type Mode = "all" | "completed"

const TasksPage = () => {
    const [selectedMode, setSelectedMode] = useState<Mode>('all');
    const [tasks, setTasks] = useState<Task[]>()
    const dispatch = useAppDispatch()
    const tasksData = useAppSelector(state => state.TasksReducer)
    const { storeTasks, enableTaskCollected, disableTaskCollected } = TasksSlice.actions
    const { incrementBalance, decrementBalance } = UserSlice.actions

    const changeSeletedMode = (mode:Mode) => {
        setSelectedMode(mode)
        if(tasksData.tasks){
            if(mode == 'all'){
                setTasks(tasksData.tasks)
            }else{
                setTasks(tasksData.tasks.filter(task => task.completed))
            }
        }
    }

    const getTasks = async () => {
        try{
            const res = await TaskService.getTasks();
            dispatch(storeTasks(res.data.tasks))
            console.log(res);
        }catch (e){
            console.log(e);
        }
    }

    const doClick = async (task:Task) => {
        if(task.user_task != null && task.user_task.task_collected === false){
            try {
                dispatch(incrementBalance(task.user_task.reward))
                dispatch(enableTaskCollected(task.id))
                await TaskService.collectReward(task.id)
            }catch (e){
                console.log(e);
                dispatch(decrementBalance(task.user_task.reward))
                dispatch(disableTaskCollected(task.id))
                sendErrorMessage('server error')
            }
        }
        if(task.user_task == null){
            try {
                const res = await TaskService.addTgTry(task.id)
                console.log(res);
                window.location.href = task.link
            }catch (e){
                console.log(e);
            }
        }
    }

    useEffect(() => {
        if(!tasksData.is_loaded){
            getTasks()
        }
    }, []);

    useEffect(() => {
        if(tasksData.tasks){
            setTasks(tasksData.tasks)
        }
    }, [tasksData]);

    return (
        <div>
            <h2 className="page-title">Tasks</h2>

            <div className={styles.tasks_mode}>
                <div className={styles.tasks_mode_body}>
                    <span
                        className={`${selectedMode == 'all' ? 'active' : ''}`}
                        onClick={() => changeSeletedMode('all')}
                    >All</span>
                    <span
                        className={`${selectedMode == 'completed' ? 'active' : ''}`}
                        onClick={() => changeSeletedMode('completed')}
                    >Completed</span>
                </div>
            </div>
            <h3 className={styles.tasks_subtitle}>Complete tasks and get rewards</h3>
            {!tasksData.is_loaded ?
                <TasksSkeleton/>
                :
                <div className={styles.tasks_list}>

                    {tasks?.map((task: Task) => (
                        <div key={task.id} className={styles.task}>
                            {task.type == 'telegram_chat' ?
                                <img src="/telegram.png" className={styles.task_img} alt="tg"/>
                                :
                                <img src="/avatar-empty.png" className={styles.task_img} alt="tg"/>
                            }

                            <div className={styles.task_info}>
                                <div>{task.title}</div>
                                <span className={styles.task_tokens}>
                                <img src="/task-token.png" alt=""/>
                                + {task.reward / 100}
                            </span>
                            </div>

                            <div onClick={() => doClick(task)} className={`${styles.task_button} ${task.user_task && !task.user_task.task_collected ? 'claim' : ''}`}>
                                { task.user_task ?
                                    <div>
                                        {task.user_task.task_collected ?
                                            <span className={styles.task_finished}>Finished</span>
                                            :
                                            <span>claim</span>
                                        }
                                    </div>
                                    :
                                    <span>start</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default TasksPage;