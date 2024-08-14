import styles from './TadsComponent.module.scss'
import i18next from "i18next"
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts"
import TaskService from "../../services/TaskService.ts"
import toast from "react-hot-toast"
import {setDecimalBalance} from "../../utils/helpers.ts"
import {UserSlice} from "../../store/reducers/UserSlice.ts"
// @ts-ignore
import { TadsWidget } from 'react-tads-widget'
import {useState} from "react";

const TadsComponent = () => {
    const { t } = i18next
    const tasksData = useAppSelector(state => state.TasksReducer)
    const dispatch = useAppDispatch()
    const { incrementBalance} = UserSlice.actions
    const [ adFound, setAdFound ] = useState<boolean>(true)
    const collectAdReward = async () => {
        try {
            await TaskService.claimAdReward()
                setTimeout(() => {
                    if(tasksData.ad_widget){
                        const reward = tasksData.ad_widget.ad_widget_reward * 100
                        sendRewardToast(reward)
                        dispatch(incrementBalance(reward))
                    }
                }, 1000)
        }catch (e) {
            console.log(e)
        }
    }

    const sendRewardToast = (reward: number | string) => {
        toast(({ id }) => (
            <div className="tasks_toast">
                <div>
                    <span>{t('tasks.claimed')}</span>
                    <span className="tasks_toast_reward">
                        <img src="/token.png" alt="" />
                        +{setDecimalBalance(reward)}
                     </span>
                </div>
                <span className="tasks_toast_close" onClick={() => toast.dismiss(id)}>
                    <img src="/svgs/close.svg" alt="" />
                </span>
            </div>
        ), { style: { background: '#3E8624' } });
    };
    return (
        <>
            {tasksData.ad_widget && adFound ?
                <div className={styles.tads}>
                    <h3 className={styles.tads_title}>
                        {t('tads_title')}
                    </h3>
                    <div className={styles.tads_subtitle}>
                        {t('tads_subtitle')}
                        <span>
                        {tasksData.ad_widget?.ad_widget_reward}
                            <img src="/token.png" alt=""/>
                     </span>
                    </div>

                    <div className={styles.tads_body}>
                            <TadsWidget id={`${tasksData.ad_widget?.ad_widget_id}`}
                                        debug={true}
                                        onClickReward={() => collectAdReward()}
                                        onAdsNotFound={() => {
                                            setAdFound(false)
                                        }}
                                        onShowReward={() => {
                                        }}
                            />
                        {!adFound ?
                            <div className={styles.tads_empty}>
                                { t('tads_not_found') }
                            </div>: ''}
                    </div>
                </div>
                : ''}
        </>

    );
};

export default TadsComponent;