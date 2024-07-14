import styles from './UpgradeBoosterPage.module.scss'
import {Link, useParams} from "react-router-dom";
import i18next from "i18next";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useEffect, useState} from "react";
import {setDecimalBalance} from "../../utils/helpers.ts";
import Popup from "../../components/Popup/Popup.tsx";
import BoosterService from "../../services/BoosterService.ts";
import {BoostersSlice} from "../../store/reducers/BoostersSlice.ts";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import {upgrades} from "../../utils/consts.ts";
const UpgradeBoosterPage = () => {
    const [pageIsLoaded, setPageIsLoaded] = useState<boolean>(false)
    const [inUpgrading, setInUpgrading] = useState<boolean>(false)
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [popupLvl, setPopupLvl] = useState<number>(1)
    const {booster} = useParams()
    const {t} = i18next;
    const dispatch = useAppDispatch();
    const boostersData = useAppSelector(state => state.BoostersReducer)
    const userData = useAppSelector(state => state.UserReducer)
    const { upgradeLvl } = BoostersSlice.actions;
    const { decrementBalance, setClickPrice, setEnergy, setHours } = UserSlice.actions;

    useEffect(() => {
        if(boostersData.prices){
            setPageIsLoaded(true)
        }
        console.log(boostersData)
    }, [boostersData])

    const upgradeBooster = async () => {
        if(popupLvl != boostersData[booster]+1){
            return;
        }
        setInUpgrading(true)
        try {
            const res = await BoosterService.upgradeBooster(booster)
            const energy = res.data.energy
            dispatch(setEnergy(energy))
            dispatch(upgradeLvl(booster))
            dispatch(setClickPrice(res.data.click_price))
            dispatch(setHours(res.data.hours))
            dispatch(decrementBalance(boostersData.prices[booster][popupLvl]))
            setInUpgrading(false)
            setPopupVisible(false)
        }catch (e) {
            setInUpgrading(false)
            console.log(e);
        }
    }

    const openPopup = (lvl: number) => {
        setPopupLvl(lvl)
        setPopupVisible(true)
    }

    return (
        <div>
            <div className={styles.up}>
                <Link to={'/boosters'}>
                    <img src="/arrow_left.svg" alt=""/>
                </Link>
                <h2 className="page-title">
                    { t(`${booster}.title`) }
                </h2>
            </div>
            <div className={styles.description}>
                { t(`${booster}.upgrade`) }
            </div>
            {pageIsLoaded ?
                <section>
                    <div className={styles.items}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`${styles.item}`} onClick={() => openPopup(i)}>
                                <img src={`/boosters/${booster}_${i}.png`} alt=""/>

                                <div className={styles.item_body}>
                                    <span>{i} LVL</span>
                                    <span className={styles.item_upgrade}>
                                        <img src="/token.png" alt=""/>
                                        {upgrades[booster][i-1]}
                                    </span>
                                </div>

                                <div className={styles.item_button}>
                                    {boostersData[booster] < i ?
                                        <span>
                                        <img src="/token.png" alt=""/>
                                            {setDecimalBalance(boostersData.prices[booster][i])}
                                    </span>
                                        :
                                        t('tasks.purchased')
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    <Popup visible={popupVisible} setVisible={setPopupVisible} header={t(`${booster}.title`)}>
                        {!inUpgrading ?
                            <section>
                                <div className={styles.popup_icons}>
                                    <img draggable={false} src={`/boosters/${booster}_${popupLvl}.png`} alt=""/>
                                </div>
                                <div className={styles.popup_description}>
                                    {t(`${booster}.${popupLvl - 1}-${popupLvl}`)}
                                </div>
                                { boostersData[booster] < popupLvl ?
                                <div onClick={upgradeBooster}
                                     className={`${styles.popup_button} ${userData.balance < boostersData.prices[booster][popupLvl] ? 'disabled' : ''}`}>
                                    <div>
                                        {boostersData[booster] + 1 != popupLvl ?
                                            <span>{ t('tasks.no_lvl') }</span>
                                            :
                                            <span>
                                                {t('improve_for')}
                                                <img src="/token.png"/>
                                                {setDecimalBalance(boostersData.prices[booster][popupLvl])}
                                            </span>
                                        }
                                    </div>
                                </div>
                                    : ''}
                            </section>
                            :
                            <section className={styles.loader_container}>
                                <span className={styles.loader}></span>
                                <span className={styles.loader_title}>
                            {t('upgrading')}
                        </span>
                            </section>
                        }
                    </Popup>
                </section>
                : <span className={styles.loader}></span>}
        </div>
    );
};

export default UpgradeBoosterPage;