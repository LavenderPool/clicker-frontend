// @ts-nocheck
import styles from './AgeRewardPage.module.scss'
import {Link} from "react-router-dom";
import i18next from "i18next";
import {useAppSelector} from "../../hooks/redux";
import {SHARE_LINK_PAGE} from "../../utils/consts";
import UserStartService from "../../services/UserStartService";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AgeRewardPage = () => {
    const {t} = i18next
    const navigate = useNavigate();

    const userData = useAppSelector(state => state.UserReducer)

    const clickClose = async () => {
        navigate(SHARE_LINK_PAGE)
        const res = await UserStartService.makeOpenedAgeTrue()
        console.log(res);
    }
    useEffect(() => {
        if(userData.user_start){
            if(userData.user_start.account_age == 0){
                navigate(SHARE_LINK_PAGE)
            }
        }
    }, [userData.user_start])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.start}>

            <h2 className="page-title">{t('welcome')}</h2>

            <div className={styles.start_body}>
                <div className={styles.start_title}>{t('your_gift')}</div>
                <div className={styles.start_amount}>
                    <img src="/token.png" alt=""/>
                    {userData.user_start ?
                        <>+ {userData.user_start?.reward / 100}</> : ''
                    }

                </div>
                <img className={styles.start_img} src="/start_gift.png" alt=""/>
                <div className={styles.start_completed}>
                    {userData.user_start ?
                        <>{userData.user_start.account_age} {userData.user_start && userData.user_start.account_age > 1 ? 'Years' : 'Year'}</>
                        : ''
                    }

                </div>
                <div className={styles.start_more}>
                    { t('gift_thx') }
                </div>
            </div>

            <div className={styles.start_buttons}>
                <div onClick={clickClose}>
                    {t('continue')}
                </div>
            </div>
        </div>
    )
};

export default AgeRewardPage;