import styles from './RoulettePage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getShareUrl, setDecimalBalance} from "../../utils/helpers.ts";
import BalanceSkeleton from "../../components/Skeletons/BalanceSkeleton.tsx";
import {useEffect, useRef, useState} from "react";
import RouletteComponent from "../../components/RoletteComponent/RouletteComponent.tsx";
import i18n from "i18next";
import CountDownTimer from "../../components/CountDownTimer/CountDownTimer.tsx";
import RouletteService from "../../services/RouletteService.ts";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import RouletteButtonsSkeleton from "../../components/Skeletons/RouletteButtonsSkeleton.tsx";
import { motion } from 'framer-motion';
import Popup from "../../components/Popup/Popup.tsx";
import {initUtils} from "@tma.js/sdk";
const RoulettePage = () => {
    const [userBalance, setUserBalance] = useState<number | string>(0)
    const [userUsdtBalance, setUserUsdtBalance] = useState<number>(0)
    const [invitePopup, setInvitePopup] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.UserReducer)
    const boosterData = useAppSelector(state => state.BoostersReducer)
    const [buttonInLoad, setButtonInLoad] = useState<boolean>(false)
    const { incrementSpins, decrementBalance, setRouletteCollect, incrementDailySpinBought } = UserSlice.actions
    const {t} = i18n
    const utils = initUtils();

    const balanceRef = useRef<HTMLSpanElement>(null)
    const balanceUsdtRef = useRef<HTMLSpanElement>(null)
    const buySpinCountRef = useRef<HTMLSpanElement>(null)


    const buySpin = async () => {
        if(!userData.roulette.collected){
            return;
        }
        setButtonInLoad(true)
        if(userData.roulette.collected.bought == userData.roulette.collected.count){
            return setInvitePopup(true)
        }
        try {
            const res = await RouletteService.buy()
            console.log(res);
            dispatch(incrementSpins(1))
            if(userData.roulette.collected.bought == userData.roulette.collected.count-1){
                setInvitePopup(true)
            }
            dispatch(incrementDailySpinBought())
            dispatch(decrementBalance((userData.roulette.price * userData.roulette.floats[boosterData.power]) * 100))

        }catch (e){
            console.log(e);
        }
        setButtonInLoad(false)
    }

    useEffect(() => {
        if(userData.balance <= userData.roulette.price * 100 || userData.roulette.collected?.count == userData.roulette.collected?.bought){
            return setButtonInLoad(true)
        }else{
            return setButtonInLoad(false)
        }

    }, [userData.balance, userData.roulette.collected, userData.is_loaded]);

    useEffect(() => {
        setUserBalance(setDecimalBalance(userData.balance))
        setUserUsdtBalance(userData.usdt)
    }, [userData.balance, userData.usdt]);
    const onEndTimer = async () => {
        try {
            const res = await RouletteService.getCollect()
            dispatch(setRouletteCollect(res.data))
            console.log(res);
        }catch (e) {
            console.log(e);
        }
    }

    const shareLink = () => {
        utils.shareURL(getShareUrl(userData.invite_code), t('friends_link'));
    }

    return (
        <div className={styles.roulette}>
            <h2 className="page-title">
                {t('roulette.title')}
            </h2>
            <div className={styles.roulette_usdt}>
                <img src="/roulette/usdt.png" alt=""/>
                {userData.is_loaded ?
                    <motion.span ref={balanceUsdtRef}
                          key={userUsdtBalance}
                          initial={{opacity: 0, scale: 0.95}}
                          animate={{opacity: 1, scale: 1}}
                          transition={{duration: 0.5}}
                    >
                        {userUsdtBalance}
                    </motion.span> : ''}
            </div>
            <div className={styles.roulette_balance}>
                <img src="/token.png" alt=""/>
                {userData.is_loaded ?
                    <motion.span ref={balanceRef}
                                 key={userBalance}
                                 initial={{opacity: 0, scale: 0.95}}
                                 animate={{opacity: 1, scale: 1}}
                                 transition={{duration: 0.5}}
                    >
                        {userBalance}
                    </motion.span>
                    : <BalanceSkeleton/>
                }
            </div>


            <RouletteComponent
                duration={1500}
                balanceRef={balanceRef}
                balanceUsdtRef={balanceUsdtRef}
                buySpinCountRef={buySpinCountRef}
            />

            {userData.is_loaded ?
                <div>
                    {userData.roulette.collected ?
                        <div className={`${styles.roulette_timer}`}>
                            <section>
                                <CountDownTimer onEnd={onEndTimer}
                                                endTime={userData.roulette.collected.timestamp + 86400}/>
                            </section>
                            <span>{t('roulette.timer')}</span>
                        </div>
                        : ''
                    }
                    <div className={styles.roulette_buttons}>
                        <div onClick={buySpin} className={`${styles.roulette_buy} ${buttonInLoad ? 'disabled ' : ''} ${!buttonInLoad && userData.roulette.balance == 0 ? 'scaleAnimation' : ''}`}>
                            {t('roulette.buy')}
                            <img src="/token.png" alt=""/>
                            <span>{userData.roulette.price * userData.roulette.floats[boosterData.power]}</span>
                        </div>
                        <div className={styles.roulette_button_balance}>
                            {userData.roulette.balance}
                            <img src="/roulette/spin.svg"/>
                        </div>
                    </div>
                    {userData.roulette.collected ?
                        <div className={styles.roulette_avaible}>
                            {t('roulette.available')}:
                            <span
                                ref={buySpinCountRef}>{userData.roulette.collected.count - userData.roulette.collected.bought}</span>
                            <img src="/roulette/spin.svg" alt=""/>
                        </div> : ''}
                </div>
                : <RouletteButtonsSkeleton/>}


            <Popup visible={invitePopup} setVisible={setInvitePopup} header={''}>
                <div className={styles.invite_title}>{t('roulette.invite_spins')}</div>
                <img className={styles.invite_img} src="/roulette/invite.svg" alt=""/>
                <div className={styles.invite_description}>{t('roulette.invite_formula')}</div>


                <span onClick={shareLink}
                      className={styles.invite_button}>
                        {t('share')}
                    </span>
            </Popup>
        </div>
    );
};

export default RoulettePage;