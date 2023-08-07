import React from "react";
import { CartItem } from "./../apis/types";
import {
  TableCell,
  TableRow,
} from "./../src/components/ui/table";

const CartCard: React.FC<CartItem> = ({
  foodName,
  foodPrice,
  quantity_bought,
}) => {
    const amount=parseInt(foodPrice)*quantity_bought;
  return (
    <TableRow>
    <TableCell className="font-medium">{foodName}</TableCell>
    <TableCell>{foodPrice}</TableCell>
    <TableCell>{quantity_bought}</TableCell>
    <TableCell className="text-right">{amount}</TableCell>
  </TableRow>
  );
};

export default CartCard;
