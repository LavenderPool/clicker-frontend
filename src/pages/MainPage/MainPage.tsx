// @ts-nocheck
import UserComponent from "../../components/UserComponent/UserComponent";
import {useAppSelector} from "../../hooks/redux.ts";
import styles from './MainPage.module.scss'
import {
    calculateEnergyRatio,
    setDecimalBalance,
    setEnergyDecimal
} from "../../utils/helpers";
import {useRef} from "react";
import EnergySkeleton from "../../components/Skeletons/EnergySkeleton";
import BalanceSkeleton from "../../components/Skeletons/BalanceSkeleton.tsx";
import {useTranslation} from "react-i18next";
import EnergyBalanceSkeleton from "../../components/Skeletons/EnergyBalanceSkeleton.tsx";
import ClickerButton from "../../components/ClickerButton/ClickerButton";

const MainPage = () => {
    const { t } = useTranslation();

    const userData = useAppSelector(state => state.UserReducer)
    const balanceRef = useRef(null);

    return (
        <div className={"container"}>
            <UserComponent />

            <div className={styles.main_top}>
                <div className={styles.main_balance}>
                    <img draggable={false} src="/token.png" alt=""/>
                    {userData.is_loaded ?
                        <span ref={balanceRef}>
                            {setDecimalBalance(userData.balance)}
                        </span>
                        : <BalanceSkeleton/>
                    }
                </div>

                <div className={styles.main_energy}>
                    <img draggable={false} src="/energy.png" alt=""/>
                    {userData.is_loaded ?
                        <span>
                            { setEnergyDecimal(userData.energy) } / 200
                        </span>
                        : <EnergyBalanceSkeleton/>
                    }
                </div>

            </div>

            {userData.is_loaded ?
                <div>
                    <div
                        className={styles.energy_bar}
                        style={{backgroundColor: `${userData.energy < 1 ? '#444' : ''}`}}
                    >
                    <span
                        className={styles.energy}
                        style={{width: `${userData.energy >= 1 ? userData.energy / 2 : 0}%`}}
                    ></span>
                    </div>
                    <div className={styles.energy_time}>
                        <span>{calculateEnergyRatio(userData.energy, userData.hours)}</span>
                        <span>{userData.hours}h</span>
                    </div>
                </div>
                : <EnergySkeleton /> }
                <ClickerButton balanceRef={balanceRef} />
        </div>
    );
};

export default MainPage;