import { GetOrderResponse } from "./../apis/types";
import OrderItem from "./OrderItem";
import { Badge } from "@/components/ui/badge";
import CustomBadge from "./Badge"
const OrderDisplay = ({ data }: { data: GetOrderResponse["data"] }) => {
  return (
    <div className="p-4 bg-white">
      {data.map((order) => (
        <>
          <div key={order._id} className="mb-4 p-4 border rounded-lg shadow-md">
            {order.order_active === "1" ? (
              <Badge
                className="border-red-600 text-red-600 my-1"
                variant={"outline"}
              >
                Rejected
              </Badge>
            ) : null}
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-semibold w-[100%] my-1">
                  {order.Orders_id}
                </p>
                <p className="text-sm text-gray-800">Date :{order.time1}</p>
                <p className="text-sm text-gray-800">Time :{order.date1}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {order.drinks?.length!==0 && <div>
                <div className="flex justify-between"> 
                <p className="text-md font-semibold mb-2">Drinks</p>
                <div className="text-sm text-gray-500">
                <CustomBadge statusCode={`${order.drinkOrderStatus}`} />
              </div>
                </div>
                {order.drinks &&
                  order.drinks.map((drink) => (
                    <OrderItem
                      key={drink._id}
                      name={drink.drinkName}
                      quantity={drink.quantity}
                      active={drink.drink_item_active}
                    />
                  ))}
              </div>}
              {order.dishes?.length!==0 && <div>
               <div className="flex justify-between"> 
                <p className="text-md font-semibold mb-2">Dishes</p>
                <div className="text-sm text-gray-500">
                <CustomBadge statusCode={`${order.foodOrderStatus}`} />
              </div>
               </div>
                {order.dishes !== undefined
                  ? order.dishes.map((dish) => (
                      <OrderItem
                        key={dish._id}
                        name={dish.foodName}
                        quantity={dish.quantity}
                        active={dish.dish_item_active}
                      />
                    ))
                  : "none"}
              </div>}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default OrderDisplay;
