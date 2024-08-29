import styles from "./ProfilePage.module.scss"
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getResource, getShareUrl, getUserAvatar, sendErrorMessage} from "../../utils/helpers";
import Popup from "../../components/Popup/Popup";
import {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import {UserSlice} from "../../store/reducers/UserSlice";
import {languages, WITHDRAWAL_USDT} from "../../utils/consts";
import {useTranslation} from "react-i18next";
import {initUtils} from "@tma.js/sdk";

const ProfilePage = () => {
    const {t, i18n} = useTranslation()
    const utils = initUtils();

    const [nameModal, setNameModal] = useState<boolean>(false)
    const [languageModal, setLanguageModal] = useState<boolean>(false)
    const [publicName, setPublicName] = useState<string>(' ')
    const [buttonState, setButtonState] = useState<string>('default')
    const [selectedLanguage, setSelectedLanguage] = useState<string>('')
    const [languageCode, setLanguageCode] = useState<string>('en')

    const userData = useAppSelector(state => state.UserReducer)
    const boostersData = useAppSelector(state => state.BoostersReducer)
    const dispatch = useAppDispatch()
    const { editPublicName, editLanguageCode } = UserSlice.actions;

    const updatePublicName = async () => {
        setButtonState('loading')
        try {
            await UserService.updateUserPublicName(publicName)
            dispatch(editPublicName(publicName))
            setNameModal(false)
        }catch (e){
            console.log(e);
            sendErrorMessage('Server error')
        }
        setButtonState('default')
    }

    const updateLanguage = async () => {
        setButtonState('loading')
        try {
            await UserService.updateLanguage(languageCode)
            i18n.changeLanguage(languageCode)
            dispatch(editLanguageCode(languageCode))
            setLanguageModal(false)
        }catch (e){
            console.log(e);
            sendErrorMessage('Server error')
        }
        setButtonState('default')
    }

    const shareLink = () => {
        utils.shareURL(getShareUrl(userData.invite_code), t('friends_link'));
    }
    useEffect(() => {
        if(userData?.user){
            const { selected_language_code, public_name } = userData.user;
            if (selected_language_code) {
                const language = languages.find(lang => lang.short_code === selected_language_code);
                if (language) {
                    setSelectedLanguage(language.name_en);
                    setLanguageCode(language.short_code);
                }
            }

            if (public_name) {
                setPublicName(public_name);
            }
        }
    }, [userData.user])
    return (
        <div>
            <div className={styles.up}>
                <Link to={'/'}>
                    <img src="/svgs/arrow_left.svg" alt=""/>
                </Link>
                <h2 className="page-title">
                    { t(`account`) }
                </h2>
            </div>

            <div className={styles.profile_top}>
                <div className={styles.profile_avatar}>
                    {userData.user && userData.user.photo_uploaded ?
                        <img draggable={false} src={getUserAvatar(userData.user.telegram_id)} />
                        :
                        <img draggable={false} src="/avatar-empty.png"/>
                    }
                </div>
                <div className={styles.profile_name}>
                    {userData.user && userData.user.public_name ? userData.user.public_name :
                        userData.user ? userData.user.first_name : ''
                    }
                    <span
                        className={styles.profile_edit_name}
                        onClick={() => setNameModal(true)}
                    >
                        <img src="/svgs/edit.svg" alt=""/>
                    </span>
                </div>
            </div>

            <div className={styles.profile_buttons}>
                <div className={styles.profile_button}>
                    <div className={styles.profile_button_info}>
                        <span>{t('your_rank')}</span>
                        <span>{getResource(boostersData.power, boostersData.time)}</span>
                    </div>
                    <span className={`${styles.profile_button_right} ${styles.profile_lvls}`}>
                        {boostersData.time} lvl<span> | </span>{boostersData.power} lvl
                    </span>
                </div>

                {userData.user_start && userData.user_start.reward ?
                    <div className={styles.profile_button}>
                        <div className={styles.profile_button_info}>
                            <span>{t('account_age')}</span>
                            <span>
                            {userData.user_start ?
                                <>{userData.user_start.account_age} {userData.user_start.account_age > 1 ? 'Years' : 'Year'}</>
                                : ''
                            }
                        </span>
                        </div>
                        <span className={`${styles.profile_button_right} ${styles.profile_reward}`}>
                       <img src="/token.png" alt=""/>
                        +
                            {userData.user_start.reward / 100}
                    </span>
                    </div> : ''
                }

                <div className={styles.profile_button}>
                    <div className={styles.profile_button_info}>
                        <span>{t('language')}</span>
                        <span>{selectedLanguage}</span>
                    </div>
                    <span onClick={() => setLanguageModal(true)}
                          className={`${styles.profile_button_right} ${styles.profile_language_button}`}>
                        <img src="/svgs/arrow_down.svg" alt=""/>
                    </span>
                </div>

                <div className={styles.profile_button}>
                    <div className={styles.profile_button_info}>
                        <span>{t('account_link')}</span>
                    </div>
                    <span onClick={shareLink}
                          className={`${styles.profile_button_right} ${styles.profile_link_button}`}>
                        {t('share')}
                    </span>
                </div>


                <div className={styles.profile_button}>
                    <div className={styles.profile_button_info}>
                        <img src="/roulette/usdt.png" alt=""/>
                        <span>{ userData.usdt }</span>
                    </div>
                    <Link to={WITHDRAWAL_USDT}
                          className={`${styles.profile_button_right} ${styles.profile_link_button}`}>
                        { t('withdrawal') }
                    </Link>
                </div>
            </div>

            <div className={styles.profile_link}>
                {t('account_link_subtitle')}
            </div>


            <Popup visible={nameModal} setVisible={setNameModal} header={t('public_name')}>
                <input
                    className={styles.name_input}
                    maxLength={16}
                    type="text"
                    value={publicName || ''}
                    onChange={e => setPublicName(e.target.value)}
                />

                <div className={styles.modal_buttons}>
                    <button onClick={() => setNameModal(false)}>{ t('close') }</button>

                    <button className={buttonState == 'default' ? '' : 'disabled'} onClick={updatePublicName}>
                        {buttonState == 'default' ?
                            <span>{ t('save') }</span> : <span className={styles.loader}></span>
                        }
                    </button>
                </div>
            </Popup>

            <Popup visible={languageModal} setVisible={setLanguageModal} header={ t('language') }>
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

                <div className={styles.modal_buttons}>
                    <button onClick={() => setLanguageModal(false)}>{ t('close') }</button>

                    <button className={buttonState == 'default' ? '' : 'disabled'} onClick={updateLanguage}>
                        {buttonState == 'default' ?
                            <span>{ t('save') }</span> : <span className={styles.loader}></span>
                        }
                    </button>
                </div>
            </Popup>
        </div>
    );
};

export default ProfilePage;