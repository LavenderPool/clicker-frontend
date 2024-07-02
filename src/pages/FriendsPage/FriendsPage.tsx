import styles from './FriendsPage.module.scss'
import {useEffect, useState} from "react";
import ReferralService from "../../services/ReferralService";
import {retrieveLaunchParams} from "@tma.js/sdk-react";
import {initUtils} from "@tma.js/sdk";
import {getShareUrl, getUserAvatar} from "../../utils/helpers";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {ReferralsSlice} from "../../store/reducers/ReferralsSlice.ts";
import ReferralsListSkeleton from "../../components/Skeletons/ReferralsListSkeleton.tsx";

const FriendsPage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const referrals = useAppSelector(state => state.ReferralsReducer);

    const utils = initUtils();

    const dispatch = useAppDispatch();
    const { setReferrals, setReferralsCount, setInviteCode } = ReferralsSlice.actions;

    const getReferrals = async () => {
        try {
            const res = await ReferralService.getReferrals()
            dispatch(setReferrals(res.data.referrals))
            dispatch(setReferralsCount(res.data.referral_count))
            dispatch(setInviteCode(res.data.invite_code))
            setShareUrl(getShareUrl(res.data.invite_code))
            setIsLoaded(true)
            console.log(res);
        }catch (e) {
            console.log(e);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1200)
    }

    const shareLink = () => {
        utils.shareURL(shareUrl, 'Look! Some cool app here!');
    }
    useEffect(() => {
        getReferrals()
    }, [])

    return (
        <div className={styles.friends}>
            <div className="container">
                <div className={styles.friends_title}>
                    Friends
                </div>

                <div className={styles.friends_subtitle}>
                    You will receive 20% of your friend's earned currency
                </div>

                <div className={`${styles.friends_buttons} ${!referrals.inviteCode ? 'disabled' : ''}`}>
                    <div className={styles.friends_button} onClick={copyToClipboard}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </div>
                    <div className={styles.friends_button} onClick={shareLink}>Send</div>
                </div>

                <div className={styles.friends_body}>
                    { !referrals.is_loaded ? <ReferralsListSkeleton /> : ''}
                    { referrals.is_loaded && referrals.count > 0 ?
                        <div className={styles.friends_list}>
                            {referrals.referrals && referrals.referrals.map((friend) => (
                                <div className={styles.friends_item} key={friend.id}>
                                    {friend.user.photo_uploaded ?
                                        <img draggable={false} src={getUserAvatar(friend.user.telegram_id)}/>
                                        :
                                        <img draggable={false} src="/avatar-empty.png" />
                                    }
                                    <span>{friend.user.username ? friend.user.username : friend.user.first_name}</span>
                                </div>
                            ))}
                        </div>
                        : '' }
                    {referrals.is_loaded && referrals.count == 0 ?
                        <div className={styles.friends_empty}>
                            <span>You didn't <br/> invite your friends</span>
                            <img src="/cry_duck.svg" alt=""/>
                        </div> : ''}
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;