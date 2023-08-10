import { useSelector } from "react-redux";
import { selectMyOrders } from "./../store/slices/myOrdersSlice";
import { ResponseDataOrders } from "apis/types";
import Bill from './Bill';
const MyOrders=() => {
  const orders =useSelector(selectMyOrders);
  orders.map((order:ResponseDataOrders)=>{
    console.log(order)
  })
  return (
    <div>
        {
          orders.map((order:any)=>{
            return <Bill  
              Orders_id={order.result.Orders_id} tableNo={order.result.tableNo} active={order.result.active} user_id={order.result.user_id} orderStatus={order.result.orderStatus} drinks={order.result.drinks} dishes={order.result.dishes} _id={order.result._id} time1={order.result.time1} date1={order.result.date1} __v={0}  />
          })
        }
    </div>
  )
}

export default MyOrders;
