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
import altImage from "./../src/assets/altimages/dish_alt.png";
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

  return (
    <div className="p-4 rounded-md grid grid-cols-6 bg-white shadow-md mx-3">
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
          {filenames ? (
            <img
              src={filenames}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square"
              alt="Dish"
            />
          ) : (
            <img
              src={altImage}
              className="w-[120px] h-[120px] rounded-md object-cover aspect-square"
              alt="Alternative Dish"
            />
          )}
        </div>
        <div className="flex relative bottom-[0.8rem]">
          {quantity === 0 ? (
            <button
              className="h-[30px] w-[70px] bg-white text-addg font-bold cursor-pointer rounded-md shadow-md"
              onClick={increment}
            >
              ADD
            </button>
          ) : (
            <div className="shadow-md flex rounded-md">
              <button
                className="h-[30px] w-[30px] bg-white text-addg cursor-pointer rounded-l-md font-bold"
                onClick={decrement}
              >
                -
              </button>
              <p className="h-[30px] w-[30px] bg-white text-addg flex justify-center items-center font-bold">
                {quantity}
              </p>
              <button
                className="h-[30px] w-[30px] bg-white text-addg cursor-pointer rounded-r-md font-bold"
                onClick={increment}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DishCard;
