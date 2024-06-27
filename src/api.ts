import axios from 'axios';
import {retrieveLaunchParams} from "@tma.js/sdk-react";
const { initDataRaw } = retrieveLaunchParams();

const $api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
})

$api.interceptors.request.use(async config => {

    if (config.headers)
        config.headers.Authorization = initDataRaw

    return config
})
export default $api;