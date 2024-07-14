import styles from './Footer.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const Footer = () => {
    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(true)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/reward')) {
            console.log('Pathname starts with /reward');
            setShow(false)
        }else{
            setShow(true)
        }
    }, [location]);
    return (
        <>
        {show ?
            <section>
                <div className={styles.pluck}></div>
                <footer className={styles.footer}>
                    <div className={styles.footer_body}>
                        <NavLink className={styles.footer_link} to={'/'}>
                            <img src="/footer/home.svg" alt=""/>
                            <span>{t('home')}</span>
                        </NavLink>
                        <NavLink className={styles.footer_link} to={'/tasks'}>
                            <img src="/footer/tasks.svg" alt=""/>
                            <span>{t('tasks')}</span>
                        </NavLink>
                        <NavLink className={styles.footer_link} to={'/boosters'}>
                            <img src="/footer/boosters.svg" alt=""/>
                            <span>{t('boosters')}</span>
                        </NavLink>
                        <NavLink className={styles.footer_link} to={'/friends'}>
                            <img src="/footer/friends.svg" alt=""/>
                            <span>{t('friends')}</span>
                        </NavLink>
                    </div>
                </footer>
            </section>
            : ''}
        </>
    );
};

export default Footer;