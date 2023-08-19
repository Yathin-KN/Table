import { useEffect, useState } from "react";
import fetchdrinks from "../apis/GET/fetchDrinks";
import { DrinksGET } from "./../apis/types";
import DrinkCard from "./DrinkCard";
import { Disclosure, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CallWaiterBtn from "./callWaiterBtn";
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
                          // value={selectedDish}
                          // onChange={(e) => setSelectedDish(e.target.value)}
                          name="search-dishes"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow focus:shadow-none"
                          placeholder="Search for Drinks"
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
        <div className="flex flex-col gap-4 pb-10 bg-gray-50">
          {drinksArr.map((drink) => (
            <DrinkCard
              key={drink._id}
              _id={drink._id}
              drinkCategories={drink.drinkCategories}
              drinkName={drink.drinkName}
              drinkNamePrice={drink.drinkNamePrice}
              drinks_category_id={drink.drinks_category_id}
              drink_id={drink.drink_id}
              __v={drink.__v}
              filenames={drink.filenames}
              description={drink.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkCardContainer;
