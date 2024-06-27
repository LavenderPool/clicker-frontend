import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface UserState {
    user?: UserModule,
    is_loaded: boolean,
}

const initialState: UserState = {
    is_loaded: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<UserModule>){
            state.user = action.payload
            state.is_loaded = true
        },
    }
})

export default UserSlice.reducer