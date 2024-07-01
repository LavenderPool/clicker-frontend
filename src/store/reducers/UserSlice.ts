import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModule} from "../../models/UserModule";

interface UserState {
    user?: UserModule,
    balance: number,
    click_price?: number,
    is_loaded: boolean,
    energy?: number,
    can_earn?:number,
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
            state.can_earn = data.can_earn
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