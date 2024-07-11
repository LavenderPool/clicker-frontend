import styles from './Footer.module.scss'
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.pluck}></div>
            <footer className={styles.footer}>
                <div className={styles.footer_body}>
                    <NavLink className={styles.footer_link} to={'/'}>
                        <img src="/footer/home.svg" alt=""/>
                        <span>{ t('home') }</span>
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
        </>
    );
};

export default Footer;