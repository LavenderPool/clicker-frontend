import {InitDataParsed} from "@tma.js/sdk-react";
import toast, {useToasterStore} from "react-hot-toast";

export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}

export const setDecimalBalance = (balance: number) => {
    return (balance / 100).toFixed(1);
}

export const getShareUrl = (code: string) => {
    return `${import.meta.env.VITE_TELEGRAM_LINK}?start=r_${code}`
}

export const sendErrorMessage = (message: string) => {

    toast.error(message, {
        duration: 2000,
        className: "black_toast",
        position: "bottom-center",
        id: message,
    })

}