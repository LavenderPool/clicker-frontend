// @ts-nocheck

import styles from './Tasks.module.scss'
import {useEffect, useState} from "react";
import TaskService from "../../services/TaskService.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TasksSlice} from "../../store/reducers/TasksSlice.ts";
import {Task} from "../../models/TaskModule.ts";
import TasksSkeleton from "../../components/Skeletons/TasksSkeleton.tsx";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import {sendErrorMessage, setDecimalBalance} from "../../utils/helpers.ts";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import i18next from "i18next";

type Mode = "all" | "completed"

const TasksPage = () => {
    const { t } = i18next
    const [selectedMode, setSelectedMode] = useState<Mode>('all');
    const [tasks, setTasks] = useState<Task[]>()
    const dispatch = useAppDispatch()
    const tasksData = useAppSelector(state => state.TasksReducer)
    const { storeTasks, enableTaskCollected, makeTaskCompleted, disableTaskCollected } = TasksSlice.actions
    const { incrementBalance, decrementBalance } = UserSlice.actions
    const [loadingTasks, setLoadingTasks] = useState({});
    const navigate = useNavigate()

    const changeSelectedMode = (mode:Mode) => {
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
        if(task.user_task != null && task.user_task.task_collected == false){
            try {
                dispatch(incrementBalance(task.user_task.reward))
                dispatch(enableTaskCollected(task.id))
                sendRewardToast(task.user_task.reward)
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

                setLoadingTasks(prevState => ({ ...prevState, [task.id]: true }));

                setTimeout(() => {
                    checkTask(task.id)
                    setLoadingTasks(prevState => ({ ...prevState, [task.id]: false }));
                }, 9000);
            }catch (e){
                console.log(e);
            }
        }
    }

    const checkTask = async (task_id: number) => {
        try{
            const res = await TaskService.checkTask(task_id)
            dispatch(makeTaskCompleted({
                user_task: res.data.success,
                task_id: task_id
            }))
            console.log(res);
            return navigate(`/reward/${res.data.success.reward}/${task_id}`)
        }catch (e){
            console.log(e);
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

    const sendRewardToast = (reward: number | string) => {
        toast((tt) => (
            <div className={styles.tasks_toast}>
                <div>
                    <span>{ t('tasks.claimed') }</span>
                    <span className={styles.tasks_toast_reward}>
                        <img src="/token.png" alt=""/>
                        +{ setDecimalBalance(reward) }
                    </span>
                </div>
                <span className={styles.tasks_toast_close} onClick={() => toast.dismiss(tt.id)}>
                    <img src="/svgs/close.svg" alt=""/>
                </span>
            </div>
        ), {style: {
                background: '#3E8624'
            }});
    }

    return (
        <div>
            <h2 className="page-title">{ t('tasks') }</h2>
            <div className={styles.tasks_mode}>
                <div className={styles.tasks_mode_body}>
                    <span
                        className={`${selectedMode == 'all' ? 'active' : ''}`}
                        onClick={() => changeSelectedMode('all')}
                    >{ t('tasks.all') }</span>
                    <span
                        className={`${selectedMode == 'completed' ? 'active' : ''}`}
                        onClick={() => changeSelectedMode('completed')}
                    >{ t('tasks.completed') }</span>
                </div>
            </div>
            <h3 className={styles.tasks_subtitle}>{ t('tasks.subtitle') }</h3>
            {!tasksData.is_loaded ?
                <TasksSkeleton/>
                :
                <div className={styles.tasks_list}>

                    {tasks?.map((task: Task) => (
                        <div key={task.id} className={styles.task}>
                            {task.type == 'telegram_chat' ?
                                <img src="/svgs/telegram.svg" className={styles.task_img} alt="tg"/>
                                :
                                <img src="/avatar-empty.png" className={styles.task_img} alt="tg"/>
                            }

                            <div className={styles.task_info}>
                                <div>{task.title}</div>
                                <span className={styles.task_tokens}>
                                <img src="/token.png" alt=""/>
                                + {task.reward / 100}
                            </span>
                            </div>

                            <div onClick={() => doClick(task)} className={`${styles.task_button} ${task.user_task && !task.user_task.task_collected ? 'claim' : ''}`}>
                                {task.user_task ?
                                    <div>
                                        {task.user_task.task_collected ?
                                            <span className={styles.task_finished}>Finished</span>
                                            :
                                            <span>claim</span>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {loadingTasks[task.id] ?
                                            <span className={styles.loader}></span>
                                            : 'start'}
                                    </div>
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