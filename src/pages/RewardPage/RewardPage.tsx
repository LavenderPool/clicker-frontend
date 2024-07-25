// @ts-nocheck
import styles from './RewardPage.module.scss'
import i18next from "i18next";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {sendErrorMessage, setDecimalBalance} from "../../utils/helpers.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {TasksSlice} from "../../store/reducers/TasksSlice.ts";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import MyConfetti from "../../components/MyConfetti/MyConfetti.tsx";
import TaskService from "../../services/TaskService.ts";


const RewardPage = () => {
    const {t} = i18next
    const [runAnimation, setRunAnimation] = useState<boolean>()
    const [buttonInLoad, setButtonInLoad] = useState<boolean>(false)
    const {amount, task_id} = useParams()
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const { enableTaskCollected } = TasksSlice.actions
    const { incrementBalance } = UserSlice.actions

    const claimReward = async () => {
        try{
            setButtonInLoad(true)
            await TaskService.collectReward(task_id)
            setRunAnimation(true)

            dispatch(incrementBalance(amount))
            dispatch(enableTaskCollected(task_id))
            setTimeout(() => {
                return navigate('/tasks')
            }, 2000)
        }catch(e){
            sendErrorMessage('server error')
            setButtonInLoad(false)
            console.error(e)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.reward}>
            { runAnimation ?
                <MyConfetti milliseconds={2000}/>
                : ''}

            <h2 className="page-title">{t('reward.title')}</h2>

            <div className={styles.reward_body}>
                <div className={styles.reward_title}>{t('reward.earned')}</div>
                <div className={styles.reward_increment}>
                    <img src="/token.png" alt="" />
                    + {setDecimalBalance(amount)}
                </div>
                <img className={styles.reward_vault} src="/vault_r.png" alt=""/>
                <div className={styles.reward_completed}>
                    { t('reward.completed') }
                </div>
                <div className={styles.reward_more}>
                    { t('reward.more') }
                </div>
            </div>

            <div className={styles.reward_buttons}>
                <Link to={'/tasks'}>
                    {t('close')}
                </Link>
                <button onClick={() => claimReward()} className={buttonInLoad ? 'disabled' : ''}>
                    {buttonInLoad ?
                        <span className={styles.loader}></span> :
                        <span>{t('tasks.claim')}</span>
                    }
                </button>
            </div>
        </div>
    )
};

export default RewardPage;