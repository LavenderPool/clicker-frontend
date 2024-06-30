import styles from "./BoostersPage.module.scss";
import Popup from "../../components/Popup/Popup";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setDecimalBalance} from "../../utils/helpers";
import BoosterService from "../../services/BoosterService";
import {BoostersSlice} from "../../store/reducers/BoostersSlice";
import {UserSlice} from "../../store/reducers/UserSlice";
import {BoosterNames} from "../../models/BoosterModule";

interface Props {
    type: BoosterNames
}
const TimeBooster = ({type}:Props) => {
    const [nextLvlPrice, setNextLvlPrice] = useState<number>(0)
    const [currentLvl, setCurrentLvl] = useState<number>(0)
    const [lvlIsMax, setLvlIsMax] = useState<boolean>(false)
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { upgradeLvl } = BoostersSlice.actions;
    const { decrementBalance } = UserSlice.actions;
    const userBalance = useAppSelector(state => state.UserReducer.balance)
    const BoostersData = useAppSelector(state => state.BoostersReducer)

    useEffect(() => {
        if(BoostersData.prices){

            setCurrentLvl(BoostersData[type])
            setNextLvlPrice(BoostersData.prices[type][currentLvl + 1])

            if(BoostersData[type] == 4){
                setLvlIsMax(true)
            }
        }
    }, [BoostersData])

    const upgradeBooster = async () => {
        try {
            await BoosterService.upgradeBooster(type)
            dispatch(upgradeLvl(type))
            dispatch(decrementBalance(nextLvlPrice))
            setPopupVisible(false)
        }catch (e) {
            console.log(e);
        }
    }

    const showPopup = () => {
        if(!lvlIsMax){
            setPopupVisible(true)
        }
    }

    return (
        <>
            <div className={styles.booster} onClick={showPopup}>
                <img src={`/boosters/${type}_${currentLvl}.png`} className={styles.booster_img}/>
                <div className={styles.booster_info}>
                    <div className={styles.booster_title}>
                        example title
                    </div>
                    <div className={styles.booster_subtitle}>
                        example subtitle
                    </div>
                    <div className={styles.booster_bottom}>
                        {!lvlIsMax ?
                            <div className={styles.booster_price}>
                                <img draggable={false} src="/boom.png" alt=""/>
                                {setDecimalBalance(nextLvlPrice)}
                            </div>
                            :
                            <span className={styles.booster_max}>max</span>
                        }
                        <span className={styles.booster_circle}></span>
                        <span className={styles.booster_lvl}>
                            LVL {currentLvl}
                        </span>
                    </div>
                </div>
                {!lvlIsMax ?
                    <div className={styles.booster_more}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"/>
                        </svg>
                    </div> : ''
                }
            </div>
            <Popup visible={popupVisible} setVisible={setPopupVisible} header={'Time booster'}>
                <div className={styles.upgrade_icons}>
                    <img draggable={false} src={`/boosters/${type}_${currentLvl}.png`} alt=""/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>
                    <img draggable={false} src={`/boosters/${type}_${currentLvl+1}.png`} alt=""/>
                </div>
                <div className={styles.upgrade_description}>Booster description</div>
                <div onClick={upgradeBooster} className={`${styles.upgrade_button} ${userBalance < nextLvlPrice ? 'disabled' : ''}`}>
                    Upgrade for
                    <div>
                        <img src="/boom.png"/>
                        {setDecimalBalance(nextLvlPrice)}
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default TimeBooster;