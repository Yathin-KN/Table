/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "apis/types";
import fetchDishes from "../apis/GET/fetchDishes";
// import { Input } from "@/components/ui/input";
// import { BiSearchAlt } from "react-icons/bi";

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
    <div className="w-full pb-4">
      <div className="flex flex-col gap-4">
        <div className="relative mt-1 rounded-md shadow-sm mx-3">
          <input
            type="text"
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
            name="search-dishes"
            id="search-dishes"
            placeholder="Search for Dishes"
            className="block w-full bg-gray-100 rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* <div className="relative mt-1 rounded-md shadow-sm">
          <Input
            type="text"
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
            placeholder="Search for Dishes"
            className="block py-3 px-2 w-[75%] my-2 mx-3 h-[2.5rem] rounded-md bg-gray-200 border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <QuestionMarkCircleIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div> */}

        <div className="w-full">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="sm:text-sm block w-[90%] p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 mx-3"
          >
            {categories.map((category, index) => (
              <option key={index} value={category} className="bg-gray-50">
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default DishCardContainer;
