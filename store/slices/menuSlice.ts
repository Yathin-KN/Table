import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodQty } from "./../../apis/types";

const initialState: Record<string, FoodQty> = {}; // Using an object to store items

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<{ food_id: string }>) => {
      const { food_id } = action.payload;
      if (!state[food_id]) {
        state[food_id] = { quantity_bought: 1 };
      } else {
        state[food_id].quantity_bought += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ food_id: string }>) => {
      const { food_id } = action.payload;
      if (state[food_id] && state[food_id].quantity_bought > 0) {
        state[food_id].quantity_bought -= 1;
      }
    },
    resetCartItems: (state) => {
      Object.keys(state).forEach((food_id) => {
        state[food_id].quantity_bought = 0;
      });
    },
  },
});

export const { increaseQuantity, decreaseQuantity, resetCartItems } =
  menuSlice.actions;

export const selectQuantity = (state: any, food_id: any) =>
  state.menu[food_id] ? state.menu[food_id].quantity_bought : 0;

export default menuSlice.reducer;
