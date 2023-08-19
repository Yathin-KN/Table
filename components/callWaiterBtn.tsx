import React from "react";
import { useSelector } from "react-redux/es/exports";
import { selectUserInfo } from "./../store/slices/authSlice";
import callWaiter from "../apis/POST/callWaiter";
import { BellIcon } from "@heroicons/react/24/outline";
export const CallWaiterBtn: React.FC = () => {
  const info = useSelector(selectUserInfo);
  const handleClick = async () => {
    try {
      const resp = await callWaiter(info);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex gap-2 font-bold" onClick={handleClick}>
        Call Waiter
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </div>
    </>
  );
};
export default CallWaiterBtn;
