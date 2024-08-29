// @ts-nocheck
import styles from './BoostersPage.module.scss'
import {useAppSelector} from "../../hooks/redux";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const BoostersPage = () => {
    const { t } = useTranslation();

    const boostersData = useAppSelector(state => state.BoostersReducer)

    return (
        <div className={styles.boosters}>
            <h2 className="page-title">{ t('boosters') }</h2>

            { ['power', 'time'].map(i => (
                <Link key={i} className={styles.boosters_item} to={`/upgrade/${i}`}>
                    <img src={`/boosters/${i}.png`} alt=""/>
                    <div className={styles.boosters_item_body}>
                        <h3 className={styles.boosters_item_title}>{ t(`${i}.title`) }</h3>
                        <h4 className={styles.boosters_subtitle}>{ t(`${i}.subtitle`) }</h4>

                        <div className={styles.boosters_item_button}>
                            {boostersData[i] == 4 ?
                                <span className={styles.boosters_item_max}>MAX</span>: ''
                            }
                            <span>{boostersData[i]} LVL</span>
                            <img src="/svgs/arrow-right.svg" alt=""/>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div>
    );
};

export default BoostersPage;