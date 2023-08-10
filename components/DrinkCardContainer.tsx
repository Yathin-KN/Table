import { useEffect, useState } from "react";
import fetchdrinks from "../apis/GET/fetchDrinks";
import { DrinksGET } from "./../apis/types";
import DrinkCard from "./DrinkCard";
const DrinkCardContainer = () => {
  const [drinksArr, setDrinks] = useState<DrinksGET[]>([]);
  const getData = async () => {
    try {
      const drinks = await fetchdrinks();
      setDrinks(drinks);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {drinksArr.map((drink) => (
        <DrinkCard
          _id={drink._id}
          drinkCategories={drink.drinkCategories}
          drinkName={drink.drinkName}
          drinkNamePrice={drink.drinkNamePrice}
          drinks_category_id={drink.drinks_category_id}
          drink_id={drink.drink_id}
          __v={drink.__v}
          filenames={drink.filenames}
        />
      ))}
    </div>
  );
};

export default DrinkCardContainer;
