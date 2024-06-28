import {InitDataParsed} from "@tma.js/sdk-react";

export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}

export const setDecimalBalance = (balance: number) => {
    return (balance / 1000000).toFixed(6);
}

export const getShareUrl = (initData: InitDataParsed|undefined) => {
    return `${import.meta.env.VITE_TELEGRAM_LINK}?start=${ initData && initData.user ? initData.user.id : ''}`
}