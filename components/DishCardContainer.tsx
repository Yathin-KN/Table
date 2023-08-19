/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "apis/types";
import fetchDishes from "../apis/GET/fetchDishes";
import fetchDishCategories from "../apis/GET/fetchDishCategories";
import { Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon,  XMarkIcon } from "@heroicons/react/24/outline";
import CallWaiterBtn from "./callWaiterBtn"
import { FoodCategory } from "./../apis/types";
const DishCardContainer: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const getCategories = async () => {
    try {
      const CategoryArr = await fetchDishCategories();
      setCategories([...CategoryArr,{"food_Category":"All"}])
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full pb-4 h-screen">
      <div className="flex flex-col gap-4">
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-1 max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex items-center px-2 w-full">
                    <div className="w-full max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search-dishes"
                          value={selectedDish}
                          onChange={(e) => setSelectedDish(e.target.value)}
                          name="search-dishes"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow focus:shadow-none"
                          placeholder="Search for Dishes"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="" static>
                  <div className="space-y-1 pt-2 pb-3">
                    <Disclosure.Button
                      as="a"
                      href="/app"
                      className="block border-l-4 border-blue-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700"
                    >
                      Home
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/order"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      Order Checkout
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      <CallWaiterBtn/>
                        
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      Feedback
                    </Disclosure.Button>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <div className="w-full">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="sm:text-sm block w-[90%] p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 mx-3"
          >
            {categories.map((category, index) => (
              <option key={index} value={category.food_Category} className="bg-gray-50">
                {category.food_Category}
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
            <div key={dish._id}>
              {selectedOption === "All" || selectedOption === dish.type ? (
                selectedCategory === "All" ||
                selectedCategory === dish.foodCategories ? (
                  <div>
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
                  </div>
                ) : null
              ) : null}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default DishCardContainer;
