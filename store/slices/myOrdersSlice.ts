import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseDataOrders } from '../../apis/types'; // Assuming you have defined the types

interface MyOrdersState {
  orders: ResponseDataOrders[];
}

const initialState: MyOrdersState = {
  orders: [],
};

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<ResponseDataOrders>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = myOrdersSlice.actions;
export const selectMyOrders = (state: { myOrders: MyOrdersState }) => state.myOrders.orders;

export default myOrdersSlice.reducer;
