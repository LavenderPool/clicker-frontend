import UserComponent from "../../components/UserComponent/UserComponent";
import ClickService from "../../services/ClickService.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import styles from './MainPage.module.scss'
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import {sendErrorMessage} from "../../utils/helpers";
import {useState} from "react";

const MainPage = () => {
    const [clickerState, setClickerState] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { removeClickFromBalance, addClickToBalance } = UserSlice.actions;
    const userData = useAppSelector(state => state.UserReducer)

    const doClick = async () => {
        if(!clickerState || !userData.is_loaded){
            return 0;
        }
        dispatch(addClickToBalance())
        try {
            await ClickService.click()
        }catch (e) {
            dispatch(removeClickFromBalance())
            sendErrorMessage('hello')
            setClickerState(false)
            setTimeout(() => {
                setClickerState(true)
            }, 2000)
        }

    }

    return (
        <div className={"container"}>
            <UserComponent />

            <button onClick={() => doClick()} className={styles.button}>
            </button>
        </div>
    );
};

export default MainPage;