import axios from 'axios';
import {retrieveLaunchParams} from "@tma.js/sdk-react";
const { initDataRaw } = retrieveLaunchParams();

const $api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
})

//@ts-ignore
$api.interceptors.request.use(async config => {

    if (config.headers){
        config.headers.Authorization = initDataRaw

        const timezoneOffsetMinutes = new Date().getTimezoneOffset();
        const offsetHours = -timezoneOffsetMinutes / 60;
        const roundedOffset = Math.round(offsetHours);
        const clampedOffset = Math.max(-11, Math.min(14, roundedOffset));
        config.headers['Timezone'] = clampedOffset;

        return config
    }

})
export default $api;