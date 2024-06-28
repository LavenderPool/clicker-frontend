import UserComponent from "../../components/UserComponent/UserComponent";
import ClickService from "../../services/ClickService.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import styles from './MainPage.module.scss'
import {UserSlice} from "../../store/reducers/UserSlice.ts";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { incrementClick } = UserSlice.actions;

    const doClick = async () => {
        dispatch(incrementClick(1))

        const res = await ClickService.click()
        console.log(res);
    }

    return (
        <div className={"container"}>
            <UserComponent />


            <button onClick={() => doClick()} className={styles.button}>
                click !
            </button>
        </div>
    );
};

export default MainPage;