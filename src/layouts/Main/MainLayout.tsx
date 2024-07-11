import Footer from "../../components/Footer/Footer";
import {Outlet} from "react-router-dom";
import styles from './MainLayout.module.scss'

const MainLayout = () => {
    return (
        <main className={styles.main}>
                <Outlet/>
            <Footer/>
        </main>
    );
};

export default MainLayout;