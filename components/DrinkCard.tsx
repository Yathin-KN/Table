import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "./../src/components/ui/badge";
import { DrinksGET } from "./../apis/types"; // Make sure you import the Drinks type
import { addItem, decrementItem } from "./../store/slices/cartDrink";
import { increaseQuantity , selectQuantity , decreaseQuantity} from "./../store/slices/menuSlice";

const DrinkCard: React.FC<DrinksGET> = ({
  drinkName,
  drinkNamePrice,
  drink_id,
  drinkCategories,
  filenames,
  drinks_category_id,
}) => {
  const qty= useSelector(state => selectQuantity(state, drink_id));
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(
      addItem({
        _id: drink_id,
        drinkCategories: drinkCategories,
        drinkName: drinkName,
        drinkNamePrice: drinkNamePrice,
        drinks_category_id: drinks_category_id,
        drink_id: drink_id,
        quantity_bought: 1,
        __v: 0
      })
    );
    dispatch(
      increaseQuantity({
        food_id: drink_id,
      })
    );
    setQuantity((prev:any) => prev + 1);
  };

  const decrement = () => {
    dispatch(
      decrementItem({
        _id: drink_id,
        drinkCategories: drinkCategories,
        drinkName: drinkName,
        drinkNamePrice: drinkNamePrice,
        drinks_category_id: drinks_category_id,
        drink_id: drink_id,
        quantity_bought: 1,
        __v: 0
      })
    );
    dispatch(
      decreaseQuantity({
        food_id: drink_id,
      })
    );
    setQuantity((prev:any) => (prev - 1 > 0 ? prev - 1 : 0));
  };

  return (
    <div className="w-[100%] p-4 rounded-sm grid grid-cols-6 gap-1 border-b-3 border-y-gray-800">
      <div className="col-span-3">
        <Badge className="text-[0.6rem]">{drinkCategories}</Badge>
        <h4 className="font-bold text-blue-950">{drinkName}</h4>
        <h4>{drinkNamePrice}</h4>
        <p className="text-slate-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic labore
          nulla, similique unde beatae tempore adipisci saepe ad suscipite.
        </p>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center py-1">
        <div>
          <img
            src={filenames}
            className="w-[130px] h-[130px] rounded-sm"
            alt="Drink"
          ></img>
        </div>
        <div className="flex relative bottom-[1rem]">
          <button
            className="h-[30px] w-[30px] bg-red-500 text-white cursor-pointer rounded-l-md"
            onClick={increment}
          >
            +
          </button>
          <p className="h-[30px] w-[30px] bg-red-500 text-white flex justify-center items-center">
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

export default DrinkCard;
