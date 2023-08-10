import { GetOrderResponse } from "./../apis/types"; 
import OrderItem from "./OrderItem"; 
import { Badge } from "@/components/ui/badge";
const OrderDisplay = ({ data }: { data: GetOrderResponse["data"] }) => {
  return (
    <div className="p-4 bg-white">
      {data.map((order) => (
        <>
        <div key={order._id} className="mb-4 p-4 border rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-md font-semibold">{order.Orders_id}</p>
              <p className="text-sm text-gray-800">Date :{order.date1}</p>
              <p className="text-sm text-gray-800">Time :{order.time1}</p>
            </div>
            <div className="text-sm text-gray-500">
              Order Status: <Badge style={order.orderStatus=="0"? {backgroundColor:"blue"}: {backgroundColor:"green"}}>{order.orderStatus=="0" ? "cooking" : "served"}</Badge>
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
        <div>Get bill</div>

        </div>
        </>
        
      ))}
    </div>
  );
};

export default OrderDisplay;
