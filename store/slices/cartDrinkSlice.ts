import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {CartDrink} from '../../apis/types'


interface ItemsState {
    items: CartDrink[];
}

const initialState: ItemsState={
    items: [],
  };

const CartDishSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartDrink>) => {
      const existingItem = state.items.find(item => item.drink_id === action.payload.drink_id);
      if (existingItem) {
        existingItem.quantity_bought += 1;
      } else {
        action.payload.quantity_bought = 1;
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartDrink>) => {
      state.items = state.items.filter(item => item.drink_id !== action.payload.drink_id);
    },
    decrementItem: (state, action: PayloadAction<CartDrink>) => {
      const existingItem = state.items.find(item => item.drink_id === action.payload.drink_id);
      if (existingItem) {
        existingItem.quantity_bought = (existingItem.quantity_bought || 0) - 1 > 0 ?(existingItem.quantity_bought || 0) - 1:0;
        if (existingItem.quantity_bought <= 0) {
          state.items = state.items.filter(item => item.drink_id !== action.payload.drink_id);
        }
      } else {
        action.payload.quantity_bought = 1;
        state.items.push(action.payload);
      }
    },
    clearItems: (state) => {
      state.items = initialState.items;
    },
    removeItemsByDrinkIds: (state, action: PayloadAction<string[]>) => {
      console.log(action.payload)
      state.items = state.items.filter(item => !action.payload.includes(item.drink_id));
    },
  },
});

export const { addItem, removeItem, decrementItem, clearItems, removeItemsByDrinkIds } = CartDishSlice.actions;
export const selectDrinkItems = (state: { cartDrink: ItemsState }) => state.cartDrink.items;
export const selectDrinkItemsWithLength = (state: { cartDrink: ItemsState }) =>
  state.cartDrink.items;

export const DrinkCartNo = createSelector(
  selectDrinkItemsWithLength,
  (items) => items.length
);
export default  CartDishSlice.reducer;
