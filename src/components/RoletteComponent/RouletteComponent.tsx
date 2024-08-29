import React, {useRef, useEffect, useState} from "react";
import styles from './RouletteComponent.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import RouletteService from "../../services/RouletteService.ts";
import {PrizeTypes, UserSlice} from "../../store/reducers/UserSlice.ts";
import Popup from "../Popup/Popup.tsx";

interface Props{
    duration: number,
    balanceRef: React.RefObject<HTMLSpanElement>,
    balanceUsdtRef: React.RefObject<HTMLSpanElement>,
    buySpinCountRef: React.RefObject<HTMLSpanElement>,
}

interface AdResponse{
    'link': string,
    'color_bg': string,
    'color_text': string,
    'i18n': {
        [key: string] : {
            title: string,
            title_button: string,
            description: string,
        }
    },
}

const RouletteComponent = ({ duration, balanceRef, buySpinCountRef, balanceUsdtRef }: Props) => {
    const [adPopup, setAdPopup] = useState<boolean>(false)
    const [ad, setAd] = useState<AdResponse | null>()
    const [adWatched, setAdWatched] = useState<boolean>(true)

    const [winningSlot, setWinningSlot] = useState<number>(1);
    const [animation, setAnimation] = useState<boolean>(false)
    const [winTicker, setWinTicker] = useState<number>(0)
    const [disabledTicker, setDisabledTicker] = useState<boolean>(false)
    const userData = useAppSelector(state => state.UserReducer)
    const boosterData = useAppSelector(state => state.BoostersReducer)
    const wheel = useRef(null);
    const spinner = useRef<HTMLUListElement>(null);

    const buttonRef = useRef<HTMLDivElement>(null)

    const pieces = userData?.roulette.prizes;


    const dispatch = useAppDispatch()
    const {decrementSpin, incrementBalance, incrementUsdt, setAdWatchedTrue, incrementCollectCount} = UserSlice.actions

    const doSpin = async () => {
        if(!pieces){
            return
        }
        setDisabledTicker(true)
        try {
            const res = await RouletteService.spin();
            const data = res.data
            setWinningSlot(data.prize_slot - 1)
            setAnimation(true)
            dispatch(decrementSpin())
            setTimeout(() => {
                switch (data.prize_type) {
                    case "token":
                        dispatch(incrementBalance(data.prize_value * 100))
                        break;
                    case "usdt":
                        dispatch(incrementUsdt(data.prize_value))
                        break;
                    case "spin":
                        dispatch(incrementCollectCount(data.prize_value))
                        break;
                    case "ad":
                        dispatch(setAdWatchedTrue())
                        setAd(data.ad)
                        setAdPopup(true)
                        if (spinner.current) {
                            spinner.current.innerHTML = '';
                        }
                        break;
                }
            }, duration)
        }catch (e) {
            console.log(e);
        }
        setDisabledTicker(false)
    }

    useEffect(() => {
        if(!pieces){
            return
        }

        let currentPieces = pieces
        if (!userData.roulette.ad_watched) {
            if (Object.keys(currentPieces).length > 0) {
                Object.keys(currentPieces).pop(); // Удаление последнего элемента из массива
            }

            currentPieces = {
                ...currentPieces,
                [7]: {
                    type: 'ad',
                    value: ' '
                }
            };
        }

        const prizeSlice = 360 / Object.keys(pieces).length;
        const prizeOffset = Math.floor(180 / Object.keys(pieces).length);
        const createPrizeNodes = () => {

            if (spinner.current?.childNodes.length === 0) {
                Object.keys(currentPieces).forEach((key, i) => {
                    const { value, type } = currentPieces[Number(key)];
                    const rotation = ((prizeSlice * i) * -1) - prizeOffset;

                    let resultValue = parseInt(value)
                    if(type == 'token'){
                        resultValue = parseInt(value) * userData.roulette.floats[boosterData.power]
                    }

                    spinner.current?.insertAdjacentHTML(
                        "beforeend",
                        `<li class="prize ${type}" style="--rotate: ${rotation}deg">
                                <span class="text">${resultValue ? resultValue : ''}</span>
                    <img src="/roulette/${type}.png" alt="">
                </li>`
                    );
                });
            }
        };

        const createConicGradient = () => {
            if(!pieces){
                return
            }
            const gradientStops = Object.keys(pieces).map((_, index) => {
                const color = index % 2 === 0 ? "hsl(227, 50%, 42%)" : "hsl(226, 59%, 31%)";
                const start = (100 / Object.keys(pieces).length) * index;
                const end = (100 / Object.keys(pieces).length) * (index + 1);
                return `${color} ${start}% ${end}%`;
            }).join(", ");

            if(spinner.current){
                spinner.current.style.background = `conic-gradient(from -90deg, ${gradientStops})`;
            }
        };

        createConicGradient();
        createPrizeNodes();
    }, [pieces, userData.roulette.ad_watched, ad]);
    function getRandomNumber(n: number) {
        return Math.floor(Math.random() * (n - 6 + 1)) + 6;
    }

    const createAnimation = (prizeType: PrizeTypes) => {
        const img = document.createElement('img');
        const prizeIcons = {
            usdt: '/roulette/usdt.png',
            spin: '/roulette/spin.png',
            token: '/roulette/token.png',
            ad: '/roulette/ad.png'
        };
        img.src = prizeIcons[prizeType];
        img.className = styles.floatingImage;

        img.onload = () => {
            const startRect = buttonRef.current?.getBoundingClientRect();
            const endRect =
                prizeType === 'spin' ? buySpinCountRef.current?.getBoundingClientRect() :
                    prizeType == 'usdt' ? balanceUsdtRef.current?.getBoundingClientRect() :
                        balanceRef.current?.getBoundingClientRect();


            if (startRect && endRect) {
                img.style.left = `${startRect.left + (startRect.width / 2) - 16}px`;
                img.style.top = `${startRect.top + (startRect.height / 2) - 16}px`;

                document.body.appendChild(img);

                // Force reflow to apply the initial styles
                img.offsetHeight;

                img.style.transform = `translate(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px) rotateY(360deg)`;
                img.style.opacity = '0';

                setTimeout(() => {
                    img.remove();
                }, duration - 200); // Ensure this matches the transition duration
            }
        };
    };


    useEffect(() => {
        if(!pieces){
            return
        }
        const prizeSlice = 360 / Object.keys(pieces).length;

        if (animation) {
            const addRandomDeg = getRandomNumber(prizeSlice) - 6;
            const totalRotation = 360 * 5;
            const winningRotation = totalRotation + (prizeSlice * (winningSlot + 2)) + addRandomDeg;
            const spinnerElement = spinner.current;
            if(!spinnerElement){
                return;
            }
            const endRotation = (prizeSlice * (winningSlot + 2)) + addRandomDeg;

            spinnerElement.style.transition = `transform ${duration}ms cubic-bezier(0.42, 0, 0.58, 1)`; // плавный конец
            spinnerElement.style.transform = `rotate(${winningRotation}deg)`;

            setTimeout(() => {
                spinnerElement.style.transition = ``;
                spinnerElement.style.transform = `rotate(${endRotation}deg)`;
                if(!adWatched && winningSlot == 7){
                    return
                }
                setWinTicker(winningSlot+1)
                createAnimation(pieces[winningSlot].type)
                setAnimation(false)
            }, duration);

        }
    }, [animation]);

    useEffect(() => {
        if(userData.user && userData.user.public_name == '[TEST-BODY]'){
            getTestAd()
            setAdPopup(true)
        }
        if(userData.roulette){
            setAdWatched(userData.roulette.ad_watched)
        }
    }, [userData.is_loaded]);

    const getTestAd = async () => {
        try {
            const res = await RouletteService.getTestAdverse();
            setAd(res.data.ad)
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={styles.wheel} ref={wheel}>
                <img src="/roulette/border.png" className={styles.border}/>
                <ul className={styles.spinner} ref={spinner}></ul>
                <div
                    className={`${styles.ticker}
                    ${!animation && userData.roulette.balance > 0 ? 'scaleAnimationTicker' : ''}
                    ${animation ? 'disabled' : ''} ${disabledTicker ? 'disabled' : ''}
                    ${userData.roulette.balance == 0 ? 'disabled' : ''}`}
                    onClick={doSpin}
                >
                    <div ref={buttonRef} style={{position: "relative"}}>
                        <img src="/roulette/ticker.png" alt=""/>
                    </div>
                    {winTicker && pieces ?
                        <div className={styles.ticker_price}>
                            {pieces[winTicker - 1].type == 'token' ?
                                <span>
                                    {parseInt(pieces[winTicker - 1].value) * userData.roulette.floats[boosterData.power]}
                                </span>:
                                <span>
                                    {pieces[winTicker - 1].value}
                                </span>
                            }
                            <img src={`/roulette/${pieces[winTicker - 1].type}.png`} alt=""/>
                        </div>
                        : ''}
                </div>
            </div>

            <Popup visible={adPopup} setVisible={setAdPopup} header={''}>
                {ad && userData.user ?
                    <div>
                        <h2 className={styles.ad_title}>{ ad.i18n[userData.user.selected_language_code].title }</h2>

                        <div className={styles.ad_text}>
                            { ad.i18n[userData.user.selected_language_code].description }
                        </div>


                        <a className={styles.ad_button}
                            href={ ad.link }
                            style={{ backgroundColor: ad.color_bg, color: ad.color_text}}
                        >
                            { ad.i18n[userData.user.selected_language_code].title_button }
                        </a>
                    </div>
                :''}
            </Popup>
        </>
    );
};

export default RouletteComponent;
