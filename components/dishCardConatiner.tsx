import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "apis/types";
import fetchDishes from "../apis/GET/fetchDishes";
import { Input } from "@/components/ui/input";
import {BiSearchAlt} from "react-icons/bi"

const categories = ["select", "Italian", "a2", "Fast food"];
const DishCardContainer: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const getData = async () => {
    try {
      const dishArr = await fetchDishes();
      setDishes(dishArr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-4">
      <div className="border-black w-full flex justify-start items-center">
      <Input
        type="text"
        value={selectedDish}
        onChange={(e) => setSelectedDish(e.target.value)}
        placeholder="Search for dishes"
        className="py-3 px-2 w-[75%] my-2 mx-3 h-[3rem] rounded-lg bg-gray-200 border-none text-sm"
      />
      <BiSearchAlt className="text-md bg-orange-500 text-white h-8 w-8 rounded-lg p-[0.5rem] box-content"/>
      </div>
      
      <div className="w-full">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-[90%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:none focus:ring-blue-200 mx-3 border-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category} className="border-none bg-gray-100">
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mx-3 flex gap-4">
        <div className="flex items-center mb-2 flex-row text-sm">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="0"
              checked={selectedOption === "0"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Veg
          </label>
        </div>
        <div className="flex items-center mb-2 text-sm">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="1"
              checked={selectedOption === "1"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Non Veg
          </label>
        </div>
        <div className="flex items-center mb-2 text-sm">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="2"
              checked={selectedOption === "2"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Egg
          </label>
        </div>
      </div>

      {dishes.map((dish) =>
        dish.foodName.toLowerCase().includes(selectedDish.toLowerCase()) ? (
          <>
            <>
              {selectedOption === "All" || selectedOption === dish.type ? (
                selectedCategory === "select" ||
                selectedCategory === dish.foodCategories ? (
                  <DishCard
                    key={dish._id}
                    foodName={dish.foodName}
                    foodPrice={dish.foodPrice}
                    foodCategories={dish.foodCategories}
                    type={dish.type}
                    food_category_id={dish.food_category_id}
                    filenames={dish.filenames}
                    food_id={dish.food_id}
                  />
                ) : null
              ) : null}
            </>
          </>
        ) : null
      )}
    </div>
  );
};

export default DishCardContainer;
