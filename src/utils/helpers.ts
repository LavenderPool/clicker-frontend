import {InitDataParsed} from "@tma.js/sdk-react";
import toast, {useToasterStore} from "react-hot-toast";

export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}

export const setDecimalBalance = (balance: number) => {
    const result = balance / 100;
    const fixedResult = Math.floor(result * 10) / 10;
    return fixedResult % 1 === 0 ? `${fixedResult}.0` : fixedResult.toString();
}

export const getShareUrl = (code: string) => {
    return `${import.meta.env.VITE_TELEGRAM_LINK}?start=r_${code}`
}

export const howMuchCanEarn = (energy:number, click_price: number) => {
    return setDecimalBalance(Math.floor(energy) * click_price)
}

export const sendErrorMessage = (message: string) => {

    toast.error(message, {
        duration: 2000,
        className: "black_toast",
        position: "bottom-center",
        id: message,
    })

}

export const sendSuccessMessage = (message: string) => {

    toast.success(message, {
        duration: 2000,
        className: "black_toast",
        position: "bottom-center",
        id: message,
    })

}