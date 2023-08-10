import { useDispatch, useSelector } from "react-redux";
import { selectDishItems } from "../store/slices/cartDishSlice";
import { selectDrinkItems } from "../store/slices/cartDrink";
import { selectUserInfo } from "../store/slices/authSlice";
import { addOrder } from "./../store/slices/myOrdersSlice";
import { Orders, OrderDish, OrderDrink , ResponseDataOrders} from "./../apis/types";
import CartCard from "./CartCard";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./../src/components/ui/table";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
const Cart = () => {
  const dishItems = useSelector(selectDishItems);
  const drinkItems = useSelector(selectDrinkItems);
  const {tableNo, user_id}= useSelector(selectUserInfo);

  const dispatch=useDispatch();
  const handleClick = () => {
    const orderDishes: OrderDish[] = dishItems.map((item) => ({
      foodName: item.foodName,
      food_id: item.food_id,
      quantity: item.quantity_bought.toString(),
    }));

    const orderDrinks: OrderDrink[] = drinkItems.map((item) => ({
      drinkName: item.drinkName,
      quantity: item.quantity_bought.toString(),
      drink_id: item.drink_id,
    }));

    const order: Orders = {
      tableNo: tableNo,
      user_id: user_id,
      drinks: orderDrinks.length > 0 ? orderDrinks : undefined,
      dishes: orderDishes.length > 0 ? orderDishes : undefined,
    };
    

    const placeOrder=async (data: Orders)=>{
      try {
        const response: AxiosResponse<ResponseDataOrders> = await axios.post(
          'https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/setOrders',
          data
        );
        dispatch(addOrder(response.data))
      } catch (error) {
        console.error('Error:', error);
      }
    }
    placeOrder(order);
  }
  
    
  return (
    <>
      <div className="text-xl font-bold text-gray-800">
        Dishes
      </div>
      <Table className="my-4 bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Dish</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dishItems.map((item) => {
            return (
              <CartCard
                key={item._id}
                foodName={item.foodName}
                foodPrice={item.foodPrice}
                quantity_bought={item.quantity_bought}
                food_id={item.food_id}
                _id={""}
                foodCategories={""}
                food_category_id={""}
                type={""}
              />
            );
          })}
        </TableBody>
      </Table>
      <div className="text-xl font-bold text-gray-800 mt-4">
        Drinks
      </div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Dish</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drinkItems.map((item) => {
            return (
              <TableRow>
              <TableCell className="font-medium">{item.drinkName}</TableCell>
              <TableCell>{item.drinkNamePrice}</TableCell>
              <TableCell>{item.quantity_bought}</TableCell>
              <TableCell className="text-right">{item.quantity_bought * parseInt(item.drinkNamePrice)}</TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="m-4 float-right">
        <Button onClick={handleClick}>Generate Bill</Button>
      </div>
    </>
  );
};

export default Cart;
