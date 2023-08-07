import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {CartItem} from './../../apis/types'


interface ItemsState {
    items: CartItem[];
}

const initialState: ItemsState= {
    items: [],
  };

const CartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.food_id === action.payload.food_id);
      if (existingItem) {
        existingItem.quantity_bought += 1;
      } else {
        action.payload.quantity_bought = 1;
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item.food_id !== action.payload.food_id);
    },
    decrementItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.food_id === action.payload.food_id);
      if (existingItem) {
        existingItem.quantity_bought = (existingItem.quantity_bought || 0) - 1 > 0 ?(existingItem.quantity_bought || 0) - 1:0;
      } else {
        action.payload.quantity_bought = 1;
        state.items.push(action.payload);
      }
    },
    clearItems: (state) => {
      state.items = initialState.items;
    },
  },
});

export const { addItem, removeItem, decrementItem, clearItems } = CartSlice.actions;
export const selectItems = (state: { cart: ItemsState }) => state.cart.items;

export default  CartSlice.reducer;
