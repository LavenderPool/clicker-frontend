import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface WalletState {
    balance: number,
    balance_is_loaded: boolean
}

const initialState: WalletState = {
    balance: 0,
    balance_is_loaded: false
}

export const WalletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setBalance(state, action:PayloadAction<number>){
            state.balance = action.payload
            state.balance_is_loaded = true
        },
        decrementBalance(state, action:PayloadAction<number>){
            state.balance -= action.payload
        }
    }
})

export default WalletSlice.reducer