import styles from './UserComponent.module.scss'
import {useAppSelector} from "../../hooks/redux";
import UserComponentSkeleton from "../Skeletons/UserComponentSkeleton";
import {getUserAvatar} from "../../utils/helpers";
import {Link} from "react-router-dom";

const UserComponent = () => {
    const userData = useAppSelector(state => state.UserReducer)
    const boostersData = useAppSelector(state => state.BoostersReducer)

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
                        {userData.user && userData.user.public_name ? userData.user.public_name :
                            userData.user ? userData.user.first_name : ''
                        }
                    </span>
                    <div className={styles.user_boosters}>
                        {boostersData.time} lvl<span>\</span>{boostersData.power} lvl
                    </div>
                </div>
                <Link to={'/profile'} className={styles.user_settings}>
                    <img src="/svgs/settings.svg" alt=""/>
                </Link>
            </div>
            : <UserComponentSkeleton /> }
        </>
    );
};

export default UserComponent;