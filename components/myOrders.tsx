import { useSelector } from "react-redux";
import { selectUserInfo } from './../store/slices/authSlice'
import fetchMyOrder from './../apis/GET/fetchMyOrders'
import {GetOrderResponse} from './../apis/types'
import { useEffect, useState } from "react";
import OrderDisplay from './OrderDisplay'
const MyOrders=() => {
  const [order,setOrder]=useState<GetOrderResponse | null>(null)
  const {user_id} = useSelector(selectUserInfo)
  const getOrder = async () => {
    try {
      const orderGET = await fetchMyOrder(user_id);
      setOrder(orderGET);
      console.log(orderGET)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
     getOrder();
  },[])
  return (
    order && <OrderDisplay data={order.data} />
  )
}

export default MyOrders;
