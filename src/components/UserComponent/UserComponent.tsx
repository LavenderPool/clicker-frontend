import styles from './UserComponent.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useEffect, useState} from "react";
import UserComponentSkeleton from "../Skeletons/UserComponentSkeleton";
import {getUserAvatar, sendErrorMessage, sendSuccessMessage, setDecimalBalance} from "../../utils/helpers";
import Popup from "../Popup/Popup.tsx";
import {languages} from "../../utils/consts";
import UserService from "../../services/UserService";
import {UserSlice} from "../../store/reducers/UserSlice";
import {useTranslation} from "react-i18next";

const UserComponent = () => {
    const { t, i18n } = useTranslation();
    const [settingsModal, setSettingsModal] = useState<boolean>(false)
    const [buttonState, setButtonState] = useState<string>('default')
    const dispatch = useAppDispatch()

    const userData = useAppSelector(state => state.UserReducer)
    const { editPublicName } = UserSlice.actions;

    const [publicName, setPublicName] = useState<string>(' ')
    const [languageCode, setLanguageCode] = useState<string>('en')

    useEffect(() => {
        if(userData.is_loaded && userData.user){
            setPublicName(userData.user.public_name)
            setLanguageCode(userData.user.selected_language_code)
        }
    }, [userData.is_loaded])

    const showSettingsPopup = () => {
        setSettingsModal(true)
    }

    const saveUser = async () => {
        setButtonState('loading')
        try {
            const res = await UserService.updateUser(publicName, languageCode)
            dispatch(editPublicName(publicName))
            i18n.changeLanguage(languageCode)
            sendSuccessMessage('Success!')
            console.log(res);
        }catch (e){
            console.log(e);
            sendErrorMessage('Server error')
        }
        setButtonState('default')
    }

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
                    <div className={styles.user_balance}>
                        <img draggable={false} src="/boom.png" alt=""/>
                        { setDecimalBalance(userData.balance) }
                    </div>
                </div>
                <div className={styles.user_settings} onClick={showSettingsPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-gear" viewBox="0 0 16 16">
                        <path
                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path
                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                    </svg>
                </div>
            </div>
            : <UserComponentSkeleton /> }

            { userData.is_loaded ?
                <Popup visible={settingsModal} setVisible={setSettingsModal} header={ t('settings') }>
                    <label className={styles.settings_input}>
                        <span>{ t('public_name') }</span>
                        <input
                            maxLength={16}
                            type="text"
                            value={publicName || ''}
                            onChange={e => setPublicName(e.target.value)}
                        />
                    </label>

                    <div className={styles.languages}>
                        {languages.map((language) => (
                            <label className={styles.language} key={language.name_en}>
                                <input
                                    type="radio"
                                    checked={language.short_code === languageCode ? true : false}
                                    onChange={() => {setLanguageCode(language.short_code)}}
                                />

                                <div className={styles.language_body}>
                                    <img src={language.img}/>
                                    <div className={styles.language_info}>
                                        <span>{language.name}</span>
                                        <span>{language.name_en}</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>

                    <button onClick={() => saveUser()} className={styles.settings_save}>
                        {buttonState == 'default' ?
                            <span>{ t('save') }</span> : <span className={styles.loader}></span>
                        }
                    </button>
                </Popup>
                : ''
            }
        </>
    );
};

export default UserComponent;