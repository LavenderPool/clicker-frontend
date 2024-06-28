import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

import eruda from 'eruda';
import {useEffect} from "react";
import UserService from "./services/UserService";
import {retrieveLaunchParams, postEvent} from "@tma.js/sdk-react";
import {useAppDispatch} from "./hooks/redux";
import {UserSlice} from "./store/reducers/UserSlice";

eruda.init();
const App = () => {
    const { initDataRaw } = retrieveLaunchParams();
    const dispatch = useAppDispatch();
    const { setUser } = UserSlice.actions;

    const getUserInfo = async () => {
        try {
            const res = await UserService.getUserInfo()
            dispatch(setUser(res.data))
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(initDataRaw.length > 0){
            postEvent('web_app_expand');
            getUserInfo()
        }
    }, [initDataRaw])
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App
