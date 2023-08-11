/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Badge } from "./../src/components/ui/badge";
import { DishProps } from "apis/types";
import { useDispatch } from "react-redux/es/exports";
import { addItem, decrementItem } from "../store/slices/cartDishSlice";
import {
  increaseQuantity,
  selectQuantity,
  decreaseQuantity,
} from "./../store/slices/menuSlice";
import { useSelector } from "react-redux/es/exports";
const DishCard: React.FC<DishProps> = ({
  foodName,
  foodPrice,
  type,
  foodCategories,
  food_id,
  filenames,
}) => {
  const qty = useSelector((state) => selectQuantity(state, food_id));
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(
      addItem({
        _id: foodName,
        foodCategories: foodCategories,
        foodName: foodName,
        foodPrice: foodPrice,
        food_category_id: foodCategories,
        food_id: food_id,
        type: type,
        quantity_bought: 1,
      })
    );
    dispatch(
      increaseQuantity({
        food_id: food_id,
      })
    );
    setQuantity((prev: any) => prev + 1);
  };
  const decrement = () => {
    dispatch(
      decrementItem({
        _id: foodName,
        foodCategories: foodCategories,
        foodName: foodName,
        foodPrice: foodPrice,
        food_category_id: foodCategories,
        food_id: food_id,
        type: type,
        quantity_bought: 1,
      })
    );
    dispatch(
      decreaseQuantity({
        food_id: food_id,
      })
    );
    setQuantity((prev: any) => (prev - 1 > 0 ? prev - 1 : 0));
  };

  // const getItem=()=>{
  //   const qty= useSelector(state => selectQuantity(state, food_id));
  //   setQuantity(qty);
  // }

  return (
    <div className="p-4 rounded-md grid grid-cols-6 bg-white shadow-md mx-2">
      <div className="col-span-3">
        <Badge className="text-xs" variant={"outline"}>
          {foodCategories}
        </Badge>
        <h4 className="font-bold text-blue-950 capitalize">{foodName}</h4>
        <h4 className="text-sm"> &#8377; {foodPrice}</h4>
        <p className="text-slate-700 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic labore
          nulla, similique unde beatae tempore adipisci saepe ad suscipite.
        </p>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center py-1">
        <div>
          <img src={filenames} className="w-[120px] h-[120px] rounded-md object-cover aspect-square"></img>
        </div>
        <div className="flex relative bottom-[1rem]">
          <button
            className="h-[30px] w-[30px] bg-red-500 text-white cursor-pointer rounded-l-md"
            onClick={increment}
          >
            +
          </button>
          <p className="h-[30px] w-[30px] bg-red-500  text-white flex justify-center items-center">
            {quantity}
          </p>
          <button
            className="h-[30px] w-[30px] bg-red-500 text-white cursor-pointer rounded-r-md"
            onClick={decrement}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
export default DishCard;
