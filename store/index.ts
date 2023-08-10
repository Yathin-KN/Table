import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slices/cartDishSlice';
import cartDrinkReducer from './slices/cartDrink';
import menuReducer from './slices/menuSlice'
import authReducer from './slices/authSlice';
import myOrdersReducer from './slices/myOrdersSlice'
const store=configureStore({
    reducer:{
        cartDish:cartReducer,
        cartDrink:cartDrinkReducer,
        myOrders:myOrdersReducer,
        menu:menuReducer,
        auth:authReducer,
    }
});

export default store;
