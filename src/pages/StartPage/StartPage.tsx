import styles from './StartPage.module.scss'
import i18next from "i18next";
import {useAppSelector} from "../../hooks/redux";
import UserStartService from "../../services/UserStartService";
import {AGE_REWARD_PAGE, SHARE_LINK_PAGE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const StartPage = () => {
    const {t} = i18next
    const navigate = useNavigate();

    const userData = useAppSelector(state => state.UserReducer)

    const clickStart = async () => {
        navigate(userData.age_feature ? AGE_REWARD_PAGE : SHARE_LINK_PAGE)
        const res = await UserStartService.makeOpenedTrue()
        console.log(res);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.first}>
            <div className={styles.first_header}>
                <div>
                    <img src="/svgs/back.svg" alt=""/>
                </div>

                <div className={styles.first_title}>
                    <img src="/tap.png" alt=""/>
                    <div>
                        <span>TapMaster</span>
                        <span>{ t('bot') }</span>
                    </div>
                </div>

                <div className={styles.first_dots}>
                    <img src="/svgs/dots.svg" alt=""/>
                </div>
            </div>

            <div className={styles.first_container}>
                <div className={styles.first_body}>
                    <div className={styles.first_body_img}>
                        <img src="/start_icon.png" alt=""/>
                    </div>
                    <div className={styles.first_body_text}>
                        <span className={styles.first_body_title}>{ t('start_title') }</span>
                        <span className={styles.first_body_subtitle}>{ t('start_text') }</span>
                    </div>
                </div>

                <div onClick={clickStart} className={styles.first_button}>
                    START
                </div>
            </div>
        </div>
    );
};

export default StartPage;