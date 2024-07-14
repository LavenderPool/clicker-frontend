import toast from "react-hot-toast";

export const getUserAvatar = (telegram_id: number) => {
    return `${import.meta.env.VITE_BACKEND_URL}/storage/avatars/${telegram_id}.jpg`
}

export const setEnergyDecimal = (energy: number) => {
    return Math.floor(energy * 100) / 100;
}

export const setDecimalBalance = (balance: number | string) => {
    balance = parseInt(balance)
    const result = balance / 100;
    const fixedResult = Math.floor(result * 10) / 10;
    return fixedResult % 1 === 0 ? `${fixedResult}.0` : fixedResult.toString();
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

export const sendSuccessMessage = (message: string) => {
    toast.success(message, {
        duration: 2000,
        className: "black_toast",
        position: "bottom-center",
        id: message,
    })
}
export const calculateEnergyRatio = (energy:number, hoursPerDay:number) => {
    if (energy <= 0) {
        return "0m";
    }

    let minutesPerHour = 60;
    let totalMinutesPerDay = hoursPerDay * minutesPerHour;
    let minutes = Math.floor(totalMinutesPerDay * (energy / 200));
    let hours = Math.floor(minutes / minutesPerHour);
    minutes %= minutesPerHour;

    if (hours === 0) {
        return `${minutes}m`;
    } else if(hours > 0 && minutes >0) {
        return `${hours}h ${minutes}m`;
    }else{
        return `${hours}h`;

    }
}
