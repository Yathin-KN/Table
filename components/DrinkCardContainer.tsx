import { useEffect, useState } from "react";
import fetchdrinks from "../apis/GET/fetchDrinks";
import { Drinks } from "apis/types";
import DrinkCard from './DrinkCard';
const DrinkCardContainer = () => {
  const [drinksArr, setDrinks] = useState<Drinks[]>([]);
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
        <DrinkCard  _id={drink._id}
          drinkCategories={drink.drinkCategories}
          drinkName={drink.drinkName}
          drinkPrice={drink.drinkNamePrice}
          drinks_category_id={drink.drinks_category_id}
          drink_id={drink.drink_id}
          quantity_brought={1} drinkNamePrice={""} foodName={""} foodPrice={""} food_id={""} foodCategories={""} type={""}/>
      ))}
    </div>
  );
};

export default DrinkCardContainer;
