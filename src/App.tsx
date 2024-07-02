import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useEffect} from "react";
import UserService from "./services/UserService";
import {retrieveLaunchParams, postEvent} from "@tma.js/sdk-react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {UserSlice} from "./store/reducers/UserSlice";
import {Toaster} from 'react-hot-toast';


const App = () => {
    const { initDataRaw } = retrieveLaunchParams();
    const dispatch = useAppDispatch();
    const { setUser, setIsLoadedTrue, incrementEnergy } = UserSlice.actions;
    const userData = useAppSelector(state => state.UserReducer);


    const getUserInfo = async () => {
        try {
            const res = await UserService.getUserInfo()
            dispatch(setUser(res.data))
            dispatch(setIsLoadedTrue())
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (userData.hours && userData.energy ) {
            const userCircleSeconds = userData.hours * 3600;
            const oneEnergySeconds = userCircleSeconds / 200 - 0.005;
            let energyInSecond = 1 / oneEnergySeconds;
            //@ts-ignore
            const energy = parseFloat(userData.energy)

            const intervalId = setInterval(() => {
                if (energy < 200) {
                    //@ts-ignore
                    let newEnergy = parseFloat(energy) + parseFloat(energyInSecond);
                    if (newEnergy > 200) {
                        newEnergy = 200
                    }
                    const for_dispatch = newEnergy - energy
                    dispatch(incrementEnergy(for_dispatch));
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [userData.hours, userData.energy]);

    useEffect(() => {
        if(initDataRaw && initDataRaw.length > 0){
            postEvent('web_app_expand');
            getUserInfo()
        }
    }, [initDataRaw])
    return (
        <BrowserRouter>
                <AppRouter/>
                <Toaster />
        </BrowserRouter>
    )
}

export default App
