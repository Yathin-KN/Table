import { GetOrderResponse } from "./../apis/types"; 
import OrderItem from "./OrderItem"; 
import { Badge } from "@/components/ui/badge";
const OrderDisplay = ({ data }: { data: GetOrderResponse["data"] }) => {
  return (
    <div className="p-4 bg-white">
      {data.map((order) => (
        <>
        <div key={order._id} className="mb-4 p-4 border rounded-lg shadow-md">
          {(order.order_active==="1")? <Badge className="border-red-600 text-red-600 my-1" variant={"outline"}>Rejected</Badge>:null}
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-semibold w-[100%] my-1">{order.Orders_id}</p>
              <p className="text-sm text-gray-800">Date :{order.time1}</p>
              <p className="text-sm text-gray-800">Time :{order.date1}</p>
            </div>
            <div className="text-sm text-gray-500">
              Order Status: <Badge style={order.orderStatus=="0"? {backgroundColor:"#f54842"}: order.orderStatus=="1"? {backgroundColor:"#425af5"}: {backgroundColor:"#34b340"}}>{order.orderStatus=="0" ? "pending" : order.orderStatus=="1" ? "cooking" : "served"}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-md font-semibold mb-2">Drinks</p>
              {order.drinks &&
                order.drinks.map((drink) => (
                  <OrderItem
                    key={drink._id}
                    name={drink.drinkName}
                    quantity={drink.quantity}
                  />
                ))}
            </div>
            <div>
              <p className="text-md font-semibold mb-2">Dishes</p>
              {order.dishes !== undefined
                ? order.dishes.map((dish) => (
                    <OrderItem
                      key={dish._id}
                      name={dish.foodName}
                      quantity={dish.quantity}
                    />
                  ))
                : "none"}
            </div>
          </div>
        </div>
        </>
        
      ))}
    </div>
  );
};

export default OrderDisplay;
