export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}

export const setDecimalBalance = (balance: number) => {
    return (balance / 1000000).toFixed(6);
}