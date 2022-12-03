import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './slice';

export const createStore = configureStore({
    reducer: {
        cart: storeReducer
    }
})