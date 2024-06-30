import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReferralModule} from "../../models/ReferralModule";

interface ReferralState {
    referrals?: ReferralModule[],
    is_loaded: boolean,
    count: number,
    inviteCode?: string
}

const initialState: ReferralState = {
    is_loaded: false,
    count: 0,
}

export const ReferralsSlice = createSlice({
    name: 'referrals',
    initialState,
    reducers: {
        setReferrals(state, action:PayloadAction<ReferralModule[]>){
            state.referrals = action.payload
            state.is_loaded = true
        },
        setReferralsCount(state, action:PayloadAction<number>){
            state.count = action.payload
        },
        setInviteCode(state, action:PayloadAction<string>){
            state.inviteCode = action.payload
        }
    }
})

export default ReferralsSlice.reducer