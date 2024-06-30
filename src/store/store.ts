import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import UserReducer from './reducers/UserSlice'
import ReferralsReducer from './reducers/ReferralsSlice'
import BoostersReducer from './reducers/BoostersSlice'

const rootReducer = combineReducers({
    UserReducer,
    ReferralsReducer,
    BoostersReducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
