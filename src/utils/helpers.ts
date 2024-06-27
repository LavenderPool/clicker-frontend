export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}