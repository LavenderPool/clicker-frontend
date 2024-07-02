import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModule} from "../../models/UserModule";

interface UserState {
    user?: UserModule,
    balance: number,
    click_price?: number,
    is_loaded: boolean,
    energy?: number,
    hours?: number,
}

const initialState: UserState = {
    is_loaded: false,
    balance: 0,
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
          state.can_earn -=state.click_price
        },
        removeClickFromBalance(state){
            state.balance -= state.click_price
        },
        setEnergy(state, action:PayloadAction<number>){
            state.energy = action.payload
        },
        incrementEnergy(state, action:PayloadAction){
            state.energy = parseFloat(state.energy) + parseFloat(action.payload)
        },
        editPublicName(state, action:PayloadAction<string>){
            state.user.public_name = action.payload
        },
        decrementBalance(state, action:PayloadAction<number>){
            const balances = document.getElementById('balance-decrement');
            balances.classList.remove('balance-anim')
            state.balance -= action.payload
            setTimeout(() => {
                balances.classList.add('balance-anim')
            }, 100)
        }
    }
})

export default UserSlice.reducer