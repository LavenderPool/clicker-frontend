// @ts-nocheck
import UserComponent from "../../components/UserComponent/UserComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import styles from './MainPage.module.scss'
import {
    calculateEnergyRatio,
    setDecimalBalance,
    setEnergyDecimal
} from "../../utils/helpers";
import {useEffect, useRef, useState} from "react";
import EnergySkeleton from "../../components/Skeletons/EnergySkeleton";
import BalanceSkeleton from "../../components/Skeletons/BalanceSkeleton.tsx";
import {useTranslation} from "react-i18next";
import EnergyBalanceSkeleton from "../../components/Skeletons/EnergyBalanceSkeleton.tsx";
import ClickerButton from "../../components/ClickerButton/ClickerButton";
import Popup from "../../components/Popup/Popup.tsx";
import {Link} from "react-router-dom";
import {ROULETTE_PAGE} from "../../utils/consts.ts";
import ShopService from "../../services/ShopService.ts";
import {UserSlice} from "../../store/reducers/UserSlice.ts";

const MainPage = () => {
    const { t } = useTranslation();

    const [shopPopup, setShopPopup] = useState<boolean>(false)
    const [megaClickDisabled, setMegaClickDisabled] = useState<boolean>(false)
    const userData = useAppSelector(state => state.UserReducer)
    const balanceRef = useRef(null);
    const { buyMegaClick, decrementBalance, statusMegaClick } = UserSlice.actions
    const dispatch = useAppDispatch()
    const buyClick = async () => {
        setMegaClickDisabled(true)
        try {
            const res = await ShopService.buyMegaClick()
            dispatch(buyMegaClick())
            const price = userData.shop.mega_click_price * 100
            dispatch(decrementBalance(price))
            console.log(res);
        }catch (e) {
            console.log(e);
        }
        setMegaClickDisabled(false)
    }

    const changeStatusMegaClick = async () => {
        setMegaClickDisabled(true)
        try {
            const inverseStatus = !userData.shop.mega_click_status
            await ShopService.changeMegaClick(inverseStatus)
            dispatch(statusMegaClick(inverseStatus))
        }catch (e) {
            console.log(e);
        }
        setMegaClickDisabled(false)
    }

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

            {userData.is_loaded ?
                <div className={styles.shop_button} onClick={() => setShopPopup(true)}>
                    <img src="/svgs/shop.svg" alt=""/>
                </div>:''}

            <ClickerButton balanceRef={balanceRef}/>


            <Popup visible={shopPopup} setVisible={setShopPopup} header={t('shop')}>
                <div className={`${styles.shop_item} ${megaClickDisabled ? 'disabled' : ''}`} onClick={buyMegaClick}>
                    <div className={styles.shop_item_text}>
                        {t('shop.click')}
                        <span>{t('shop.click_description')}</span>
                    </div>

                    {userData.shop.mega_click ?
                        <div onClick={changeStatusMegaClick} className={`${styles.shop_radio} ${userData.shop.mega_click_status ? 'turned' : ''}`}>
                            <span></span>
                        </div> :
                        <span className={styles.shop_price} onClick={buyClick}>
                            <img src="/token.png" alt=""/>
                            {userData.shop.mega_click_price}
                        </span>
                    }


                </div>
                <Link to={ROULETTE_PAGE} className={styles.shop_item}>
                    {t('shop.buy_spin')}
                    <span className={styles.shop_price}>
                        <img src="/token.png" alt=""/>
                        { userData.roulette?.price }
                    </span>
                </Link>
            </Popup>
        </div>
    );
};

export default MainPage;