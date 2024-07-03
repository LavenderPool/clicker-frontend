import UserComponent from "../../components/UserComponent/UserComponent";
import ClickService from "../../services/ClickService.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import styles from './MainPage.module.scss'
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import {calculateEnergyRatio, howMuchCanEarn, sendErrorMessage, setDecimalBalance} from "../../utils/helpers";
import {useState} from "react";
import EnergySkeleton from "../../components/Skeletons/EnergySkeleton";
import ButtonSkeleton from "../../components/Skeletons/ButtonSkeleton";
import CanEarnSkeleton from "../../components/Skeletons/CanEarnSkeleton";
import {useTranslation} from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation();
    const [clickerState, setClickerState] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { removeClickFromBalance, addClickToBalance, setEnergy } = UserSlice.actions;
    const userData = useAppSelector(state => state.UserReducer)

    const doClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(userData.energy < 1){
            setClickerState(false)
            return 0
        }
        if(!clickerState || !userData.is_loaded){
            return 0
        }
        dispatch(addClickToBalance())
        dispatch(setEnergy(userData.energy-1))
        createFloatingNumber(event, userData.click_price);
        try {
            await ClickService.click()
        }catch (e) {
            //@ts-ignore
            if(e.response.data.status == 'no energy'){
                dispatch(removeClickFromBalance())
                //@ts-ignore
                dispatch(setEnergy(e.response.data.energy))
                return sendErrorMessage('No energy')
            }
            sendErrorMessage('Server error')
            setClickerState(false)
            setTimeout(() => {
                setClickerState(true)
            }, 2000)
        }

    }

    const createFloatingNumber = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, number: number) => {
        const span = document.createElement('span');
        span.textContent = `+${setDecimalBalance(number)}`;
        span.className = styles.floatingNumber;
        span.style.left = `${event.clientX}px`;
        span.style.top = `${event.clientY}px`;
        document.body.appendChild(span);

        setTimeout(() => {
            span.style.transform = 'translateY(-50px)';
            span.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            span.remove();
        }, 1000);
    };

    return (
        <div className={"container"}>
            <UserComponent />

            <div className={styles.main_top}>
                <span className={styles.can_earn}>{ t('you_can_earn')}</span>
                <div className={styles.can_earn_counter}>
                    <img draggable={false} src="/boom.png" alt=""/>
                    {userData.is_loaded ?
                        <span>
                            {howMuchCanEarn(userData.energy, userData.click_price)}
                        </span>
                        : <CanEarnSkeleton />
                    }
                </div>

            </div>

            {userData.is_loaded ?
                <div>
                    <div
                        className={styles.energy_bar}
                        style={{backgroundColor: `${userData.energy < 1? '#444': ''}`}}
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

            {userData.is_loaded ?
                <button
                    onClick={(e) => doClick(e)}
                    className={`${styles.button} ${userData.energy < 1 ? 'no-energy' : ''}`}
                >
                </button>
            : <ButtonSkeleton />}
        </div>
    );
};

export default MainPage;