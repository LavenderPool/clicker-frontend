import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModule} from "../../models/UserModule";

interface UserState {
    user?: UserModule,
    balance: number,
    click_price: number,
    is_loaded: boolean,
    energy: number,
    hours: number,
}

const initialState: UserState = {
    is_loaded: false,
    balance: 0,
    user: undefined,
    click_price: 0,
    energy: 0,
    hours: 0
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
            state.energy = parseFloat(state.energy) + parseFloat(action.payload)
        },
        editPublicName(state, action:PayloadAction<string>){
            if(state.user){
                state.user.public_name = action.payload
            }
        },
        decrementBalance(state, action:PayloadAction<number>){
            const balance = document.getElementById('balance-decrement');
            if(balance){
                balance.classList.remove('balance-anim')
                state.balance -= action.payload
                setTimeout(() => {
                    balance.classList.add('balance-anim')
                }, 100)
            }
        },
        incrementBalance(state, action:PayloadAction<number>){
            state.balance += action.payload
        }
    }
})

export default UserSlice.reducer