/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { selectUserInfo } from "./../store/slices/authSlice";
import fetchMyOrder from "./../apis/GET/fetchMyOrders";
import { GetOrderResponse } from "./../apis/types";
import { useEffect, useState } from "react";
import OrderDisplay from "./OrderDisplay";
import EmptyCart from "./EmptyCart";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import {selectJoineeInfo} from "./../store/slices/authSlice"

function CheckoutBtn() {

  return (
    <div className="pt-10 fixed z-60 bottom-10 right-10">
      <a
        className="group flex items-center justify-between gap-4 rounded-lg border border-red-600 bg-red-600 px-3 py-1 transition-colors hover:bg-transparent focus:outline-none focus:ring w-36"
        href="/ordercheckout"
      >
        <span className="font-semibold text-white transition-colors group-hover:text-red-600 group-active:text-red-500 text-md">
          Checkout
        </span>
        <span className="shrink-0 rounded-full border border-current bg-white p-1.5 text-red-600 group-active:text-red-500">
          <svg
            className="h-3 w-3 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}

const MyOrders = () => {
  const [order, setOrder] = useState<GetOrderResponse | null>(null);
  const { user_id } = useSelector(selectUserInfo);
  const [error, setError] = useState(false);
  const [, setLoading] = useState(true);
  const isJoinee=useSelector(selectJoineeInfo)
  
  const getOrder = async () => {
    setLoading(true);
    try {
      const orderGET = await fetchMyOrder(user_id);
      setOrder(orderGET);
      console.log(orderGET);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const [isRotated, setIsRotated] = useState(false);
  const recheckOrders = () => {
    setIsRotated(!isRotated);
    getOrder();
    setTimeout(() => {
      setIsRotated(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen bg-gray-50">
      <div className="my-2 z-50">
        <div
          className={`rotate-icon ${
            isRotated ? "rotated" : ""
          } fixed right-4 bg-gray-500 text-white font-bold p-[2px] rounded-full`}
          onClick={recheckOrders}
        >
          <RefreshIcon className="!text-[2rem]" />
        </div>
      </div>
      {error ? (
        <div className="flex flex-col gap-4">
          <EmptyCart />
          <div className="flex justify-center">
            <button
              className="rounded-lg px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300 font-semibold"
              onClick={getOrder}
            >
              Retry
            </button>
          </div>
        </div>
      ) : order && order.success ? (
        <div className="">
          <OrderDisplay data={order.data} />
          {!isJoinee && <CheckoutBtn />}
        </div>
      ) : (
        <div className="pt-2">
          <EmptyCart />
          {!isJoinee && <CheckoutBtn />}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
