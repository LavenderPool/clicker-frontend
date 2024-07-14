import styles from './UserComponent.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useEffect, useState} from "react";
import UserComponentSkeleton from "../Skeletons/UserComponentSkeleton";
import {getUserAvatar, sendErrorMessage, sendSuccessMessage} from "../../utils/helpers";
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
    const boostersData = useAppSelector(state => state.BoostersReducer)
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
                    <div className={styles.user_boosters}>
                        {boostersData.time} lvl<span>\</span>{boostersData.power} lvl
                    </div>
                </div>
                <div className={styles.user_settings} onClick={showSettingsPopup}>
                    <img src="/settings.svg" alt=""/>
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