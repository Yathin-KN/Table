import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartDishSlice";
import cartDrinkReducer from "./slices/cartDrink";
import menuReducer from "./slices/menuSlice";
import authReducer from "./slices/authSlice";
import myOrdersReducer from "./slices/myOrdersSlice";
import {  persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
let rootReducer = combineReducers({
  cartDish: cartReducer,
  cartDrink: cartDrinkReducer,
  myOrders: myOrdersReducer,
  menu: menuReducer,
  auth: authReducer,
});

let persistConfig={
    key:'root',
    storage,
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
