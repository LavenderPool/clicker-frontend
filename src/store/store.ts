import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import WalletReducer from './reducers/WalletSlice'

const rootReducer = combineReducers({
    WalletReducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
