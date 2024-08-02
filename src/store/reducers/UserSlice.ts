import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModule, UserStartModule} from "../../models/UserModule";

interface UserState {
    user?: UserModule,
    user_start?: UserStartModule
    balance: number,
    click_price: number,
    is_loaded: boolean,
    energy: number,
    hours: number,
    invite_code: string,
    age_feature: boolean,


    first_energy_change: boolean
}

const initialState: UserState = {
    is_loaded: false,
    balance: 0,
    user: undefined,
    click_price: 0,
    energy: 0,
    hours: 0,
    invite_code: '',
    age_feature: false,
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
            state.click_price = data.click_price
            state.energy = data.energy
            state.hours = data.hours
            state.invite_code = data.invite_code
            state.user_start = data.user_start
            state.age_feature = data.age_feature
        },
        setHours(state, action:PayloadAction<number>){
          state.hours = action.payload
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
            //@ts-ignore
            if(state.first_energy_change){
                state.first_energy_change = false
            }else{
                state.energy = parseFloat(state.energy) + parseFloat(action.payload)
            }
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
        }
    }
})

export default UserSlice.reducer