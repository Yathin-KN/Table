import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserState} from './../../apis/types'


const isAnyStateEmpty = (userState: UserState): boolean => {
  const { username, phoneNumber, otp, user_id, tableNo } = userState;
  
  if (!username || !phoneNumber || !otp || !user_id || !tableNo) {
    return true; 
  }
  
  return false; 
};

const initialState: UserState = {
  username: "",
  phoneNumber: "",
  otp: "",
  user_id:"",
  tableNo:"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ username: string; phoneNumber: string ; tableNo:string}>
    ) => {
      const { username, phoneNumber , tableNo} = action.payload;
      state.username = username;
      state.phoneNumber = phoneNumber;
      state.tableNo = tableNo;
    },
    setOtp: (state, action: PayloadAction<{ otp: string; user_id: string }>) => {
      const { otp, user_id } = action.payload;
       state.otp=otp;
       state.user_id=user_id;
    },
    resetUserState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserInfo, setOtp } = userSlice.actions;
export default userSlice.reducer;
export {isAnyStateEmpty}
export const selectUserInfo = (state: any) => ({
  user_id: state.auth.user_id || "",
  username: state.auth.username || "",
  tableNo: state.auth.tableNo || "",
  otp: state.auth.otp || "",
  phoneNumber: state.auth.phoneNumber || "",
});
