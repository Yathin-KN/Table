import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice';
import menuReducer from './slices/menuSlice'
const store=configureStore({
    reducer:{
        cart:cartReducer,
        menu:menuReducer,
    }
});

export default store;
