import styles from './UserComponent.module.scss'
import {useAppSelector} from "../../hooks/redux";
import {useEffect} from "react";
import UserComponentSkeleton from "../Skeletons/UserComponentSkeleton";
import {getUserAvatar} from "../../utils/helpers";

const UserComponent = () => {
    const userData = useAppSelector(state => state.UserReducer)

    useEffect(() => {
        if(userData.is_loaded){
            console.log(userData);
        }
    }, [userData.is_loaded])

    return (
        <>
            {userData.is_loaded ?
            <div className={styles.user}>
                <div className={styles.user_avatar}>
                    {userData.user.photo_uploaded ?
                        <img draggable={false} src={getUserAvatar(userData.user.telegram_id)} />
                        :
                        <img draggable={false} src="/avatar-empty.png"/>
                    }
                </div>
                <div className={styles.user_info}>
                    <span className={styles.user_name}>
                        {userData.user.username ? userData.user.username : userData.user.first_name}
                    </span>
                    <div className={styles.user_balance}>
                        <img src="/boom.png" alt=""/>
                        0.000000
                    </div>
                </div>
            </div>
            : <UserComponentSkeleton /> }

        </>
    );
};

export default UserComponent;