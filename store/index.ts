import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartDishSlice";
import cartDrinkReducer from "./slices/cartDrinkSlice";
import menuReducer from "./slices/menuSlice";
import authReducer from "./slices/authSlice";
import {  persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
let rootReducer = combineReducers({
  cartDish: cartReducer,
  cartDrink: cartDrinkReducer,
  menu: menuReducer,
  auth: authReducer,
});

let persistConfig={
    key:'root',
    storage,
    timeout:100,
}

let persistedReducer=persistReducer(persistConfig,rootReducer);

const store = configureStore({
   reducer:persistedReducer,
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: false,
   }),
   
});

const persistor = persistStore(store);

export const clearPersistedState = () => {
  persistor.purge();
};

export default store;
