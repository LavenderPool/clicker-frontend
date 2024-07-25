//@ts-nocheck

import styles from "../../pages/MainPage/MainPage.module.scss";
import ButtonSkeleton from "../Skeletons/ButtonSkeleton";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import ClickService from "../../services/ClickService";
import {sendErrorMessage} from "../../utils/helpers";
import {useState} from "react";
import {UserSlice} from "../../store/reducers/UserSlice";

const ClickerButton = ({balanceRef}) => {
    const [haveTouch, setHaveTouch] = useState<boolean>(false)
    const [clickerState, setClickerState] = useState<boolean>(true);
    const [touches, setTouches] = useState([]);

    const dispatch = useAppDispatch();
    const { removeClickFromBalance, addClickToBalance, setEnergy } = UserSlice.actions;

    const userData = useAppSelector(state => state.UserReducer)

    const handleTouchStart = (e) => {
        setHaveTouch(true)
        setTouches(Array.from(e.touches));
    };

    const handleTouchMove = (e) => {
        setTouches(Array.from(e.touches));
    };
    const handleTouchEnd = (e) => {
        const updatedTouches = Array.from(e.changedTouches);

        console.log(`length - ${updatedTouches.length}`);
        updatedTouches.forEach(touch => {
            doClick(touch, false);
        });

        setTouches(Array.from(e.touches));
    };


    const doClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fromClick = true) => {

        if(haveTouch && fromClick){
            return 0
        }
        if(userData.energy < 1){
            setClickerState(false)
            return 0
        }


        if(!clickerState || !userData.is_loaded){
            return 0
        }
        dispatch(addClickToBalance())
        dispatch(setEnergy(userData.energy-1))
        createFloatingNumber(event);

        try {
            const res = await ClickService.click()
            console.log(res);
        }catch (e) {
            console.log(e);
            //@ts-ignore
            if(e.response.data.status == 'no energy'){
                dispatch(removeClickFromBalance())
                //@ts-ignore
                dispatch(setEnergy(e.response.data.energy))
                return sendErrorMessage('No energy')
            }
            sendErrorMessage('Server error')
            setClickerState(false)
            setTimeout(() => {
                setClickerState(true)
            }, 2000)
        }

    }

    const createFloatingNumber = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const img = document.createElement('img');
        img.src = '/penis.svg';
        img.className = styles.floatingImage;
        img.style.left = `${event.clientX}px`;
        img.style.top = `${event.clientY}px`;
        document.body.appendChild(img);

        if (balanceRef.current) {
            const balanceRect = balanceRef.current.getBoundingClientRect();
            const randomX = balanceRect.left + Math.random() * balanceRect.width;
            const randomY = balanceRect.top + Math.random() * balanceRect.height;

            const targetX = randomX;
            const targetY = randomY;

            setTimeout(() => {
                img.style.transform = `translate(${targetX - event.clientX}px, ${targetY - event.clientY}px) rotate3d(1, 1, 0, 360deg)`;
                img.style.opacity = '0';
            }, 0);

            setTimeout(() => {
                img.remove();
            }, 2000);
        }
    };

    return (
        <div>
            {userData.is_loaded ?
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    // @ts-ignore
                    onClick={(e: React.MouseEvent<MouseEvent>,) => doClick(e)}
                    className={`${styles.button} ${userData.energy < 1 ? 'no-energy' : ''}`}
                >
                </div>
                : <ButtonSkeleton />}
        </div>
    );
};

export default ClickerButton;