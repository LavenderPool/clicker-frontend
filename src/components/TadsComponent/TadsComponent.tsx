import styles from './TadsComponent.module.scss'
import i18next from "i18next"
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts"
import TaskService from "../../services/TaskService.ts"
import toast from "react-hot-toast"
import {sendErrorMessage, setDecimalBalance} from "../../utils/helpers.ts"
import {UserSlice} from "../../store/reducers/UserSlice.ts"
// @ts-ignore
import { TadsWidget } from 'react-tads-widget'
import React, {useCallback, useState} from "react";
import {useAdsgram} from "../../hooks/useAdsgram.ts";


const TadsComponent = React.memo(() => {
    const { t } = i18next
    const tasksData = useAppSelector(state => state.TasksReducer)
    const boostersData = useAppSelector(state => state.BoostersReducer)
    const dispatch = useAppDispatch()
    const { incrementBalance} = UserSlice.actions
    const [ adFound, setAdFound ] = useState<boolean>(true)

    const handleReward = async () => {
        try {
            await TaskService.claimAdReward();
            setTimeout(() => {
                if(tasksData.ad_widget){
                    const reward = (tasksData.ad_widget?.ad_widget_multiply[boostersData.power] * tasksData.ad_widget?.ad_widget_reward) * 100
                    sendRewardToast(reward)
                    dispatch(incrementBalance(reward))
                }
            }, 1000)
        } catch (e) {
            console.log(e);
        }
    };
    const onReward = useCallback(() => handleReward(), [tasksData, dispatch]);

    const onError = useCallback(() => {
        sendErrorMessage(t('ads.watch_empty'))
    }, []);

    const showAd = useAdsgram({ blockId: '2130', onReward, onError });


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
            {tasksData.ad_widget && boostersData ?
                <div className={styles.tads}>
                    <h3 className={styles.tads_title}>
                        {t('tads_title')}
                    </h3>
                    <div className={styles.tads_subtitle}>
                        {t('tads_subtitle')}
                        <span>
                        {tasksData.ad_widget?.ad_widget_multiply[boostersData.power] * tasksData.ad_widget?.ad_widget_reward}
                            <img src="/token.png" alt=""/>
                     </span>
                    </div>

                    <div className={styles.tads_body}>
                        <TadsWidget id={`${tasksData.ad_widget?.ad_widget_id}`}
                                    debug={false}
                                    onClickReward={() => handleReward()}
                                    onAdsNotFound={() => {
                                        setAdFound(false)
                                    }}
                                    onShowReward={() => {
                                    }}
                        />
                        {tasksData.ad_widget.ad_widget_adsgram_show == 'always' || !adFound && tasksData.ad_widget.ad_widget_adsgram_show == 'on_first_end' ?
                            <div onClick={showAd} className={`${styles.adsgram_widget} ${!adFound ? 'last' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-play-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                </svg>
                                { t('ads.watch') }
                            </div> : ''
                        }

                    </div>
                </div>
                : ''}
        </>);
});

export default TadsComponent;