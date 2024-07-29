import styles from './FriendsPage.module.scss'
import {useState} from "react";
import {initUtils} from "@tma.js/sdk";
import {getShareUrl, getUserAvatar, setDecimalBalance} from "../../utils/helpers";
import {useAppSelector} from "../../hooks/redux.ts";
import ReferralsListSkeleton from "../../components/Skeletons/ReferralsListSkeleton.tsx";
import {useTranslation} from "react-i18next";

const FriendsPage = () => {
    const { t } = useTranslation();

    const [isCopied, setIsCopied] = useState<boolean>(false);
    const referrals = useAppSelector(state => state.ReferralsReducer);

    const utils = initUtils();


    const copyToClipboard = () => {
        if(!referrals.inviteCode){
            return 0
        }
        navigator.clipboard.writeText(getShareUrl(referrals.inviteCode));
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1200)
    }

    const shareLink = () => {
        if(!referrals.inviteCode){
            return 0
        }
        utils.shareURL(getShareUrl(referrals.inviteCode), t('friends_link'));
    }

    return (
        <div className={styles.friends}>
            <h2 className="page-title">{t('friends')}</h2>

            <div className="container">
                <div className={styles.friends_up}>
                    <img draggable={false} src="/friends_money.png" className={styles.friends_up_money} alt=""/>
                    <div className={styles.friends_subtitle} dangerouslySetInnerHTML={{ __html: t('friends_subtitle') }}></div>

                    <div className={`${styles.friends_buttons} ${!referrals.inviteCode ? 'disabled' : ''}`}>
                        <div className={styles.friends_button} onClick={() => copyToClipboard()}>
                            {isCopied ? t('copied') : t('copy')}
                        </div>
                        <div className={styles.friends_button} onClick={shareLink}>{t('send')}</div>
                    </div>
                </div>

                {!referrals.is_loaded ? <ReferralsListSkeleton/> : ''}
                {referrals.is_loaded && referrals.count > 0 ?
                    <div className={styles.friends_list}>
                        {referrals.referrals && referrals.referrals.map((friend) => (
                            <div className={styles.friends_item} key={friend.id}>
                                {friend.user.photo_uploaded ?
                                    <img draggable={false} src={getUserAvatar(friend.user.telegram_id)}/>
                                    :
                                    <img draggable={false} src="/avatar-empty.png"/>
                                }
                                <span>{friend.user.username ? friend.user.username : friend.user.first_name}</span>
                                <div className={styles.friends_collected}>
                                    <img src="/token.png" alt=""/>
                                    <span>+{setDecimalBalance(friend.collected)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    : ''}

                {referrals.is_loaded && referrals.count == 0 ?
                    <div className={styles.friends_empty}>
                        <img src="/thermometr_face.png" alt=""/>
                        <span
                            className={styles.friends_empty_title}
                        >{ t('friends_no_friends_title') }</span>
                        <span
                            className={styles.friends_empty_subtitle}
                            dangerouslySetInnerHTML={{__html: t('friends_no_friends')}}
                        ></span>
                        <span
                            onClick={shareLink}
                            className={styles.friends_empty_invite}>{t('friends_invite')}</span>
                    </div> : ''}
            </div>
        </div>
    );
};

export default FriendsPage;