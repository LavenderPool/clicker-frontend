import styles from './UserComponent.module.scss'
import {useAppSelector} from "../../hooks/redux";
import {useEffect} from "react";
import UserComponentSkeleton from "../Skeletons/UserComponentSkeleton";
import {getUserAvatar, setDecimalBalance} from "../../utils/helpers";

const UserComponent = () => {
    const userData = useAppSelector(state => state.UserReducer)

    useEffect(() => {
        if(userData.is_loaded){
            console.log(userData);
        }
    }, [userData.is_loaded])

    return (
        <>
            {userData && userData.is_loaded ?
            <div className={styles.user}>
                <div className={styles.user_avatar}>
                    {userData.user && userData.user.photo_uploaded ?
                        <img draggable={false} src={getUserAvatar(userData.user.telegram_id)} />
                        :
                        <img draggable={false} src="/avatar-empty.png"/>
                    }
                </div>
                <div className={styles.user_info}>
                    <span className={styles.user_name}>
                        {userData.user && userData.user.username ? userData.user.username :
                            userData.user ? userData.user.first_name : ''
                        }
                    </span>
                    <div className={styles.user_balance}>
                        <img src="/boom.png" alt=""/>
                        { setDecimalBalance(userData.balance) }
                    </div>
                </div>
            </div>
            : <UserComponentSkeleton /> }

        </>
    );
};

export default UserComponent;