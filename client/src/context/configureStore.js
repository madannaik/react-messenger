import {configureStore,combineReducers} from '@reduxjs/toolkit';
import { currentChatReducer } from './currentchatuser';
import {reducers} from './login';

const comReduc = combineReducers({
    logindetails: reducers,
    currentchatstate:currentChatReducer,
})
export const store = configureStore({
    reducer:comReduc
})
