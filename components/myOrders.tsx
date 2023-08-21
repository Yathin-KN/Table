import { useSelector } from "react-redux";
import { selectUserInfo } from "./../store/slices/authSlice";
import fetchMyOrder from "./../apis/GET/fetchMyOrders";
import { GetOrderResponse } from "./../apis/types";
import { useEffect, useState } from "react";
import OrderDisplay from "./OrderDisplay";
import EmptyCart from "./EmptyCart";

const MyOrders = () => {
  const [order, setOrder] = useState<GetOrderResponse | null>(null);
  const { user_id } = useSelector(selectUserInfo);
  const [error, setError] = useState(false);

  const getOrder = async () => {
    try {
      const orderGET = await fetchMyOrder(user_id);
      setOrder(orderGET);
      console.log(orderGET);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full p-3 h-screen bg-gray-50">
      {error ? (
        <div className="flex flex-col gap-4">
          <EmptyCart />
          <div className="flex justify-center">
            <button onClick={getOrder}>Retry</button>
          </div>
        </div>
      ) : order && order.success ? (
        <OrderDisplay data={order.data} />
      ) : (
        <div className="pt-2 sticky top-10 z-50">
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
