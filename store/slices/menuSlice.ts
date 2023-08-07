import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodQty } from "./../../apis/types";

const initialState: Record<string, FoodQty> = {}; // Using an object to store items

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateItem: (state, action: PayloadAction<FoodQty>) => {
      const { food_id, quantity_bought } = action.payload;
      state[food_id] = { ...state[food_id], quantity_bought };
    },
    increaseQuantity: (state, action) => {
      const { food_id } = action.payload;
      if (state[food_id] !== undefined) {
        state[food_id].quantity_bought += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { food_id } = action.payload;
      if (state[food_id] !== undefined && state[food_id].quantity_bought > 0) {
        state[food_id].quantity_bought -= 1;
      }
    },
  },
});

export const { updateItem, increaseQuantity, decreaseQuantity } = menuSlice.actions;
export default menuSlice.reducer;
