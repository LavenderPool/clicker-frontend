import styles from './FriendsPage.module.scss'
import {useEffect, useState} from "react";
import ReferralService from "../../services/ReferralService";
import {retrieveLaunchParams} from "@tma.js/sdk-react";
import {initUtils} from "@tma.js/sdk";
import {getUserAvatar} from "../../utils/helpers";

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const { initData } = retrieveLaunchParams();
    const utils = initUtils();

    const getReferrals = async () => {
        try {
            const res = await ReferralService.getReferrals()
            setFriends(res.data.referrals)
            console.log(res);
        }catch (e) {
            //
        }
    }

    const copyToClipboard = () => {
        const invite_link = `${import.meta.env.VITE_TELEGRAM_LINK}?start=${initData.user.id}`
        navigator.clipboard.writeText(invite_link);
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1200)
    }

    const shareLink = () => {
        const invite_link = `${import.meta.env.VITE_TELEGRAM_LINK}?start=${initData.user.id}`
        utils.shareURL(invite_link, 'Look! Some cool app here!');
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

                <div className={styles.friends_buttons}>
                    <div className={styles.friends_button} onClick={copyToClipboard}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </div>
                    <div className={styles.friends_button} onClick={shareLink}>Send</div>
                </div>

                <div className={styles.friends_body}>
                    { friends.length > 0 ?
                        <div className={styles.friends_list}>
                            {friends.map((friend) => (
                                <div className={styles.friends_item} key={friend.id}>
                                    {friend.user.photo_uploaded ?
                                        <img draggable={false} src={getUserAvatar(friend.user.telegram_id)}/>
                                        :
                                        <img draggable={false} src="/avatar-empty.png"/>
                                    }
                                    <span>{friend.user.username ? friend.user.username : friend.user.first_name}</span>
                                </div>
                            ))}
                        </div>
                        :
                        <div className={styles.friends_empty}>
                            <span>You didn't <br/> invite your friends</span>
                            <img src="/cry_duck.svg" alt=""/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;