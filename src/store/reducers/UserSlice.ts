import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModule, UserStartModule} from "../../models/UserModule";

interface UserState {
    user?: UserModule,
    user_start?: UserStartModule
    balance: number,
    usdt: number,
    click_price: number,
    is_loaded: boolean,
    energy: number,
    hours: number,
    invite_code: string,
    age_feature: boolean,
    first_energy_change: boolean,
    roulette: {
        collected?: RouletteCollected,
        balance: number,
        price: number,
        prizes?: RoulettePrizes,
        floats: number[],
        ad_watched: boolean,
    },
    shop: {
        mega_click: boolean,
        mega_click_status: boolean,
        mega_click_price: number,
    }
}

interface RouletteCollected {
   timestamp: number,
   count: number,
   bought: number,
}
export type PrizeTypes = "token" | "usdt" | "spin" | "ad"
interface Prize {
    value: string;
    type: PrizeTypes;
}

interface RoulettePrizes {
    [key: number]: Prize;
}

const initialState: UserState = {
    is_loaded: false,
    balance: 0,
    usdt: 0,
    user: undefined,
    click_price: 0,
    energy: 0,
    hours: 0,
    invite_code: '',
    age_feature: false,
    shop: {
        mega_click: false,
        mega_click_status: false,
        mega_click_price: 9999,
    },
    roulette: {
        collected: {
            timestamp: Math.floor(Date.now()/1000),
            count: 3,
            bought: 3,
        },
        balance: 0,
        price: 0,
        floats: [
            0
        ],
        ad_watched: true,
    },
    first_energy_change: true,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<UserState>){
            const data = action.payload
            state.user = data.user
            state.balance = data.balance
            state.usdt = data.usdt
            state.click_price = data.click_price
            state.energy = data.energy
            state.hours = data.hours
            state.invite_code = data.invite_code
            state.user_start = data.user_start
            state.age_feature = data.age_feature
            state.roulette = data.roulette
            state.shop = data.shop
        },
        setHours(state, action:PayloadAction<number>){
          state.hours = action.payload
        },
        incrementUsdt(state, action:PayloadAction<number>){
            const add = parseInt(action.payload.toString())
            state.usdt += add
        },
        decrementUsdt(state, action:PayloadAction<number>){
          state.usdt -= action.payload
        },
        setClickPrice(state, action:PayloadAction<number>){
            state.click_price = action.payload
        },
        setIsLoadedTrue(state){
          state.is_loaded = true
        },
        addClickToBalance(state){
          state.balance += state.click_price
        },
        removeClickFromBalance(state){
            state.balance -= state.click_price
        },
        setEnergy(state, action:PayloadAction<number>){
            state.energy = action.payload
        },
        incrementEnergy(state, action:PayloadAction<number>){
            if(state.first_energy_change){
                state.first_energy_change = false
            }else{
                state.energy = state.energy + action.payload
            }
        },
        incrementSpins(state, action:PayloadAction<number>){
            const add = parseInt(action.payload.toString())
            state.roulette.balance += add
        },
        incrementCollectCount(state, action:PayloadAction<number>){
            if(state.roulette.collected){
                const add = parseInt(action.payload.toString())
                state.roulette.collected.count += add;
            }
        },
        decrementSpin(state){
            state.roulette.balance -=1
        },
        addRouletteCollected(state, action: PayloadAction<RouletteCollected>){
          state.roulette.collected = action.payload
        },
        editPublicName(state, action:PayloadAction<string>){
            if(state.user){
                state.user.public_name = action.payload
            }
        },
        editLanguageCode(state, action:PayloadAction<string>){
            if(state.user){
                state.user.selected_language_code = action.payload
            }
        },
        decrementBalance(state, action:PayloadAction<number>){
            state.balance -= action.payload
        },
        incrementBalance(state, action:PayloadAction<number | string>){
            const add = parseInt(action.payload.toString())
            state.balance += add
        },
        statusMegaClick(state, action:PayloadAction<boolean>){
            state.shop.mega_click_status = action.payload
        },
        buyMegaClick(state){
            state.shop.mega_click = true
            state.shop.mega_click_status = true
        },
        incrementDailySpinBought(state){
            if(state.roulette.collected){
                state.roulette.collected.bought += 1;
            }
        },
        setRouletteCollect(state, action:PayloadAction<RouletteCollected>){
            state.roulette.collected = action.payload
        },
        setAdWatchedTrue(state){
            state.roulette.ad_watched = true;
        }
    }
})

export default UserSlice.reducer