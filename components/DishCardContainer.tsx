/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "apis/types";
import fetchDishes from "../apis/GET/fetchDishes";
// import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
    <div className="w-full pb-4 h-screen">
      <div className="flex flex-col gap-4">
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-2 max-w-7xl px-2 sm:px-4 lg:px-8">
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
                          id="search"
                          name="search"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Search"
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

              <Disclosure.Panel className="mx-2">
                <div className="space-y-1 pt-2 pb-3">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block border-l-4 border-blue-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700"
                  >
                    Home
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    Order Checkout
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <div className="flex gap-2">
                      Call Waiter
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
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
            </>
          )}
        </Disclosure>
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
            <div>
              {selectedOption === "All" || selectedOption === dish.type ? (
                selectedCategory === "select" ||
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
