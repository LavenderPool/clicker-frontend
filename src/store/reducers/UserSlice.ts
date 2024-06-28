import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user?: UserModule,
    balance: number
    is_loaded: boolean,
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
            state.is_loaded = true
        },
        incrementClick(state, action:PayloadAction<number>){
            state.balance += action.payload;
        }
    }
})

export default UserSlice.reducer