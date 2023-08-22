import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartDishItem } from '../../apis/types';

interface ItemsState {
  items: CartDishItem[];
}

const initialState: ItemsState = {
  items: [],
};

const CartDishSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartDishItem>) => {
      const existingItem = state.items.find(item => item.food_id === action.payload.food_id);
      if (existingItem) {
        existingItem.quantity_bought += 1;
      } else {
        action.payload.quantity_bought = 1;
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartDishItem>) => {
      state.items = state.items.filter(item => item.food_id !== action.payload.food_id);
    },
    decrementItem: (state, action: PayloadAction<CartDishItem>) => {
      const existingItem = state.items.find(item => item.food_id === action.payload.food_id);
      if (existingItem) {
        existingItem.quantity_bought = (existingItem.quantity_bought || 0) - 1 > 0 ? (existingItem.quantity_bought || 0) - 1 : 0;
        if (existingItem.quantity_bought <= 0) {
          state.items = state.items.filter(item => item.food_id !== action.payload.food_id);
        }

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

export const { addItem, removeItem, decrementItem, clearItems } = CartDishSlice.actions;

export const selectDishItems = (state: { cartDish: ItemsState }) => state.cartDish.items;

export const selectDishItemsWithLength = createSelector(
  selectDishItems,
  (items) => items
);

export const DishCartNo = createSelector(
  selectDishItemsWithLength,
  (items) => items.length
);

export default CartDishSlice.reducer;
