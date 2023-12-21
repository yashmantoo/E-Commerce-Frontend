import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from './userRedux'
import cartReducer from './cart'

const rootReducer = combineReducers({user: userReducer, cart: cartReducer})

export const store = configureStore({
    reducer: rootReducer
})

