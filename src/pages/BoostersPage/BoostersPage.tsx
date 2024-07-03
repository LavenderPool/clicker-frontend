import BoosterService from "../../services/BoosterService";
import {useEffect} from "react";
import styles from './BoostersPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setDecimalBalance} from "../../utils/helpers";
import {BoostersSlice} from "../../store/reducers/BoostersSlice";
import BoosterBalanceSkeleton from "../../components/Skeletons/BoosterBalanceSkeleton";
import BoosterItemsSkeleton from "../../components/Skeletons/BoosterItemsSkeleton";
import BoosterItem from "./BoosterItem";
import {useTranslation} from "react-i18next";

const BoostersPage = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const { setBoosters, setPrices } = BoostersSlice.actions;
    const userData = useAppSelector(state => state.UserReducer)
    const boostersData = useAppSelector(state => state.BoostersReducer)

    const getLevels = async () => {
        try {
            const res = await BoosterService.getUserBoosters();
            const boosters = res.data.boosters;
            const prices = res.data.prices;
            dispatch(setBoosters({power: boosters.power, time: boosters.time}));
            dispatch(setPrices(prices))
        }catch (e) {
            //
        }
    }

    useEffect(() => {
        getLevels()
    }, []);

    return (
        <div className={styles.boosters}>
            <div className={styles.balance}>
                <div className={styles.balance_title}>
                    { t('your_balance') }
                </div>
                { userData.is_loaded ?
                    <div id="balance-decrement" className={styles.balance_amount}>
                        <img draggable={false} src="/boom.png" alt=""/>
                        <span>{setDecimalBalance(userData.balance)}</span>
                    </div>
                : <BoosterBalanceSkeleton /> }
            </div>
            <div className="container">
                {boostersData.is_loaded ?
                    <div>
                        <BoosterItem type={'power'} />
                        <BoosterItem type={'time'} />
                    </div>
                    :
                    <BoosterItemsSkeleton />
                }
            </div>
        </div>
    );
};

export default BoostersPage;