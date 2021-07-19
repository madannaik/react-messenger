import {configureStore} from '@reduxjs/toolkit';
import {reducers} from './login';

export const store = configureStore({
    reducer: reducers
})
