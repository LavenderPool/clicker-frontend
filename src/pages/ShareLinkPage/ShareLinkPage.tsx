// @ts-nocheck
import styles from './ShareLinkPage.module.scss'
import i18next from "i18next";
import {useAppSelector} from "../../hooks/redux";
import {useEffect} from "react";
import {getShareUrl} from "../../utils/helpers";
import {initUtils} from "@tma.js/sdk";
import UserStartService from "../../services/UserStartService";
import {useNavigate} from "react-router-dom";

const ShareLinkPage = () => {
    const {t} = i18next
    const utils = initUtils();
    const navigate = useNavigate();


    const userData = useAppSelector(state => state.UserReducer)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const shareLink = () => {
        utils.shareURL(getShareUrl(userData.invite_code), t('friends_link'));
    }

    const clickStartEnded = async () => {
        navigate('/')
        const res = await UserStartService.makeOpenedTrue()
        console.log(res);
    }
    return (
        <div className={styles.start}>

            <h2 className="page-title">{t('share_link')}</h2>

            <div className={styles.start_body}>
                <img className={styles.start_img} src="/start_share.png" alt=""/>
                <div className={styles.start_completed}>
                    { t('invite_friends') }
                </div>
                <div className={styles.start_more}>
                    { t('account_link_subtitle') }
                </div>

                <div onClick={shareLink} className={styles.start_invite}>
                    { t('friends_invite') }
                </div>
            </div>

            <div className={styles.start_buttons}>
                <div onClick={clickStartEnded}>
                    {t('continue')}
                </div>
            </div>
        </div>
    )
};

export default ShareLinkPage;