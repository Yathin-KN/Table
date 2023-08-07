import { useSelector } from "react-redux";
import { selectItems } from "./../store/slices/cartSlice";
import { useState } from "react";
import CartCard from "./CartCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./../src/components/ui/table";
const Cart = () => {
  const cartItems = useSelector(selectItems);
  const [items, setItems] = useState(cartItems);
  // console.log(cartItems)
  return (
    <Table>
      <TableCaption>Your Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Dish</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          return (
            <CartCard
              key={item._id}
              foodName={item.foodName}
              foodPrice={item.foodPrice}
              quantity_bought={item.quantity_bought}
              food_id={item.food_id} _id={""} foodCategories={""} food_category_id={""} type={""}            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Cart;
