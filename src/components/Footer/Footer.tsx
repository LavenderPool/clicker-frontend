import styles from './Footer.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux.ts";
import {WITHDRAWAL_USDT} from "../../utils/consts.ts";

const Footer = () => {
    const { t } = useTranslation();
    const [show, setShow] = useState<boolean>(true)
    const tasksData = useAppSelector(state => state.TasksReducer.tasks)
    const location = useLocation();

    useEffect(() => {
        const paths = ['/reward', '/profile', '/start', '/age-reward', '/share-link', WITHDRAWAL_USDT];
        if (paths.some(path => location.pathname.startsWith(path))) {
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
                        <NavLink className={`${styles.footer_link} ${tasksData && tasksData.filter(i => !i.completed).length > 0 ? 'new' : ''}`} to={'/tasks'}>
                            <img src="/footer/tasks.svg" alt=""/>
                            <span>{t('tasks')}</span>
                        </NavLink>
                        <NavLink className={styles.footer_link} to={'/boosters'}>
                            <img src="/footer/boosters.svg" alt=""/>
                            <span>{t('boosters')}</span>
                        </NavLink>
                        <NavLink className={styles.footer_link} to={'/roulette'}>
                            <img src="/footer/roulette.svg" alt=""/>
                            <span>{t('roulette.title')}</span>
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