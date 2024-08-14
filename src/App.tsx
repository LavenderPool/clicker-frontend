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
import TaskService from "./services/TaskService.ts";
import {TasksSlice} from "./store/reducers/TasksSlice.ts";
import ReferralService from "./services/ReferralService.ts";
import {ReferralsSlice} from "./store/reducers/ReferralsSlice.ts";
import {isNumber} from "./utils/helpers.ts";

if(import.meta.env.VITE_IN_PROD == 'true'){
    localStorage.setItem('active-eruda', 'false')
}else{
    localStorage.setItem('active-eruda', 'true')
}

const App = () => {
    const { initDataRaw, initData } = retrieveLaunchParams();
    const dispatch = useAppDispatch();
    const { setBoosters, setPrices } = BoostersSlice.actions;
    const { setUser, setIsLoadedTrue, incrementEnergy } = UserSlice.actions;
    const { storeTasks, storeAdWidget} = TasksSlice.actions
    const { setReferrals, setReferralsCount, setInviteCode } = ReferralsSlice.actions;

    const userData = useAppSelector(state => state.UserReducer);

    const navigate = useNavigate();


    const getUserInfo = async () => {
        console.log(`v-1.1`)
        try {
            const res = await UserService.getUserInfo()
            dispatch(setUser(res.data))
            i18n.changeLanguage(res.data.user.selected_language_code);
            dispatch(setIsLoadedTrue())
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

    const getTasks = async () => {
        try{
            const res = await TaskService.getTasks();
            dispatch(storeTasks(res.data.tasks))
            dispatch(storeAdWidget(res.data.ad_widget))
            console.log(res);
        }catch (e){
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


    const getReferrals = async () => {
        try {
            const res = await ReferralService.getReferrals()
            dispatch(setReferrals(res.data.referrals.data))
            dispatch(setReferralsCount(res.data.referral_count))
            dispatch(setInviteCode(res.data.invite_code))
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!userData.hours || !userData.energy) return;

        const userCircleSeconds = userData.hours * 3600;
        const oneEnergySeconds = userCircleSeconds / 200 - 0.001;
        const energyInSecond = 1 / oneEnergySeconds;
        const initialEnergy = userData.energy;
        const now = Date.now();

        let storedTimestamp = parseFloat(localStorage.getItem('lastUpdateTimestamp') || now.toString())

        const elapsedTime = (now - storedTimestamp) / 1000;

        const energyGained = elapsedTime * energyInSecond;

        const intervalId = setInterval(() => {
            const newEnergy = Math.min(initialEnergy + energyGained, 200);
            if (isNumber(newEnergy) && isNumber(initialEnergy)) {
                dispatch(incrementEnergy(newEnergy - initialEnergy));
                localStorage.setItem('lastUpdateTimestamp', now.toString());
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [userData.hours, userData.energy, dispatch]);

    useEffect(() => {
        if(initDataRaw && initDataRaw.length > 0){
            postEvent('web_app_expand');
            postEvent('web_app_set_header_color', {color: '#000000'})
            getBoosters()
            getReferrals()
            getTasks()
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
