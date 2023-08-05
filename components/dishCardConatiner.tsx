import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import axios from "axios";

const DishCardContainer = () => {
  const [data, setData] = useState([
    {
      filenames:
        "https://funmili.s3.amazonaws.com/635b5e65303da64c63189f5a86b314eb",
      foodCategories: "Italian",
      foodName: "Pasta",
      foodPrice: "600",
      food_id: "7b26d8b5-f9cb-4bfc-ab2f-a5bb8da22769",
      __v: 0,
      _id: "64ce37c357649a78fa8c67c6",
    },
  ]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/getDish/Italian"
      );
      // console.log(response.data);
      setData(response.data.dishes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(()=>{
  //   fetchData();
  // },[data])
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-3 justify-items-center">
      {data.map((dish) => {
        console.log(dish);
        return <DishCard key={dish._id} name={dish.foodName} price={dish.foodPrice}/>;
      })}
    </div>
  );
};

export default DishCardContainer;
