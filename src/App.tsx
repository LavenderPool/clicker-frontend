import './App.css'
import {useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useEffect} from "react";
import UserService from "./services/UserService";
import {retrieveLaunchParams, postEvent} from "@tma.js/sdk-react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {UserSlice} from "./store/reducers/UserSlice";
import {Toaster} from 'react-hot-toast';
//@ts-ignore
import i18n from "./i18.js"
import BoosterService from "./services/BoosterService.ts";
import {BoostersSlice} from "./store/reducers/BoostersSlice.ts";
import {AGE_REWARD_PAGE, SHARE_LINK_PAGE} from "./utils/consts";

if(import.meta.env.VITE_IN_PROD == 'true'){
    localStorage.setItem('active-eruda', 'true')
}


const App = () => {
    const { initDataRaw, initData } = retrieveLaunchParams();
    const dispatch = useAppDispatch();
    const { setBoosters, setPrices } = BoostersSlice.actions;
    const { setUser, setIsLoadedTrue, incrementEnergy } = UserSlice.actions;
    const userData = useAppSelector(state => state.UserReducer);

    const navigate = useNavigate();


    const getUserInfo = async () => {
        console.log(`v-1.1`)
        try {
            const res = await UserService.getUserInfo()
            dispatch(setUser(res.data))
            i18n.changeLanguage(res.data.user.selected_language_code);
            dispatch(setIsLoadedTrue())
            console.log(res);
            if(!res.data.user_start.opened){
                navigate(res.data.age_feature ? AGE_REWARD_PAGE : SHARE_LINK_PAGE)
            }
            if(res.data.user_start.opened && !res.data.user_start.opened_age && res.data.user_start.reward){
                navigate(AGE_REWARD_PAGE)
            }
        }catch (e) {
            console.log(e);
        }
    }
    const getBoosters = async () => {
        try {
            const res = await BoosterService.getUserBoosters();
            const boosters = res.data.boosters;
            const prices = res.data.prices;
            dispatch(setBoosters({power: boosters.power, time: boosters.time}));
            dispatch(setPrices(prices))
        }catch (e) {
            //
        }
    }

    useEffect(() => {
        if (!userData.hours || !userData.energy) return;

        const userCircleSeconds = userData.hours * 3600;
        const oneEnergySeconds = userCircleSeconds / 200 - 0.005;
        const energyInSecond = 1 / oneEnergySeconds;
        const initialEnergy = userData.energy;

        const storedTimestamp = parseFloat(localStorage.getItem('lastUpdateTimestamp') || '0');
        const now = Date.now();

        const elapsedTime = (now - storedTimestamp) / 1000;
        console.log('elapsedTime: ' + elapsedTime);
        const energyGained = elapsedTime * energyInSecond;
        console.log('energyGained ' + energyGained);

        if(elapsedTime > 10){
            const newEnergy = Math.min(initialEnergy + energyInSecond, 200);
            dispatch(incrementEnergy(newEnergy - initialEnergy));
        }

        localStorage.setItem('lastUpdateTimestamp', now.toString());

        const intervalId = setInterval(() => {
            if (initialEnergy >= 200) return;

            const newEnergy = Math.min(initialEnergy + energyInSecond, 200);
            const energyToDispatch = newEnergy - initialEnergy;

            dispatch(incrementEnergy(energyToDispatch));
        }, 1000);

        return () => clearInterval(intervalId);
        // @ts-ignore
    }, [userData.hours, userData.energy, window.Telegram.WebApp.isExpanded]);

    useEffect(() => {
        if(initDataRaw && initDataRaw.length > 0){
            postEvent('web_app_expand');
            postEvent('web_app_set_header_color', {color: '#000000'})
            getBoosters()
            getUserInfo()

            if(initData?.user?.id == 6439111063){
                localStorage.setItem('active-eruda', 'true')
            }
        }
    }, [initDataRaw])
    return (
        <>
            <AppRouter/>
            <Toaster />
        </>
    )
}

export default App
