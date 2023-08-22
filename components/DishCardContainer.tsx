/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { Dish } from "apis/types";
import fetchDishes from "../apis/GET/fetchDishes";
import fetchDishCategories from "../apis/GET/fetchDishCategories";
import { Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CallWaiterBtn from "./callWaiterBtn";
import SkelitonLoad from "./SkelitonLoad";
import { FoodCategory } from "./../apis/types";
import TypeBadge from "./TypeBadge"
import { ToastContainer } from "react-toastify";
const types=["0","1","2"]
const DishCardContainer: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDish, setSelectedDish] = useState("");
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTypes,setSelectedTypes]=useState<any>({
    "0":"0",
    "1":"0",
    "2":"0",
  })

  useEffect(()=>{
   setSelectedTypes({
    "0":"0",
    "1":"0",
    "2":"0",
  })
  },[])
  
  const handleTypeClick=(type:any)=>{
     setSelectedTypes((prev:any)=>{
       return {
        ...prev,
        [type]:prev[type]=="0"?"1":"0"
       }
     })
  }
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const getData = async () => {
    try {
      const dishArr = await fetchDishes();
      setDishes(dishArr);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const CategoryArr = await fetchDishCategories();
      setCategories([...CategoryArr, { food_Category: "All" }]);
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

  const customFunc=(type:string)=>{
      if(selectedTypes["0"]==="0" && selectedTypes["1"]==="0" && selectedTypes["2"]==="0" ) return true;
      return selectedTypes[type]==="1"
  }
  const filteredDishes = dishes.filter((dish) => {
    const dishNameMatches = dish.foodName
      .toLowerCase()
      .includes(selectedDish.toLowerCase());
    const typeMatches =
      customFunc(dish.type) ;
    const categoryMatches =
      selectedCategory === "All" || selectedCategory === dish.foodCategories;
    return dishNameMatches && typeMatches && categoryMatches;
  });

  return (
    <div className="w-full pb-4 h-screen">
      <ToastContainer toastClassName={() => 
        "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
      }/>
      <div className="flex flex-col gap-4 bg-gray-50">
        <Disclosure
          as="nav"
          className="bg-white sticky top-[52px] z-50 shadow-nav"
        >
          {({ open }) => (
            <>
              <div className="mx-1 max-w-7xl pr-2 sm:px-4">
                <div className="flex h-14 justify-end w-full">
                  <div className="flex items-center px-2 w-full">
                    <div className="w-full">
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
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm focus:shadow-none"
                          placeholder="Search for Dishes"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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
                enterFrom="transform scale-90 opacity-0"
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
                      href="/ordercheckout"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      Order Checkout
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    >
                      <CallWaiterBtn />
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
            className="sm:text-sm block w-[90%] p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 mx-3"
          >
            {categories.map((category, index) => (
              <option
                key={index}
                value={category.food_Category}
                className="bg-gray-50 text-gray-800"
              >
                {category.food_Category}
              </option>
            ))}
          </select>
        </div>
        <div className="px-2">
          {
            types.map((typeCode)=>{
            return <TypeBadge statusCode={typeCode} onClick={handleTypeClick} selected={selectedTypes[typeCode]==="1"}/>
            })
          }
        </div>
        <div className="flex flex-col gap-4 pb-10 bg-gray-50">
          {isLoading ? (
            <div>
              <SkelitonLoad />
            </div>
          ) : filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <div key={dish._id}>
                <DishCard
                  key={dish._id}
                  foodName={dish.foodName}
                  foodPrice={dish.foodPrice}
                  foodCategories={dish.foodCategories}
                  type={dish.type}
                  food_category_id={dish.food_category_id}
                  filenames={dish.filenames}
                  food_id={dish.food_id}
                  description={dish.description}
                />
              </div>
            ))
          ) : (
            selectedDish !== "" && (
              <div className="">
                <div className="text-center">{selectedDish}: Not Found</div>
                <button
                  onClick={() => setSelectedDish("")}
                  className="bg-gray-300 rounded px-2 py-1 flex mx-auto mt-2 hover:bg-slate-200"
                >
                  Clear
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCardContainer;
