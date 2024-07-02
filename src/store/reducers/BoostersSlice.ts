import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BoosterNames, BoosterPrices, BoosterState} from "../../models/BoosterModule";

interface SetBoostersPayload {
    power: number;
    time: number;
}

const initialState: BoosterState = {
    is_loaded: false,
    power: 0,
    time: 0
}

export const BoostersSlice = createSlice({
    name: 'boosters',
    initialState,
    reducers: {
        setBoosters(state, action: PayloadAction<SetBoostersPayload>) {
            state.power = action.payload.power;
            state.time = action.payload.time;
        },
        setPrices(state, action:PayloadAction<BoosterPrices>){
            state.prices = action.payload
            state.is_loaded = true
        },
        upgradeLvl(state, action:PayloadAction<BoosterNames>){
            state[action.payload] += 1
        }
    }
})

export default BoostersSlice.reducer