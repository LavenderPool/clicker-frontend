import Footer from "../../components/Footer/Footer";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <main className="main">
            <Outlet/>
            <Footer/>
        </main>
    );
};

export default MainLayout;