import { useState } from "react";
// import { Button } from "./../src/components/ui/button";
import { Badge } from "./../src/components/ui/badge";
export const DishCard = ({key,name,price}):any => {
  const [quantity,setQuantity] =useState(0);
  const tag="Bestseller"
  const increment=()=>{
    setQuantity((prev)=>prev+1);
  }
  const decrement=()=>{
    setQuantity((prev)=>(prev-1>0)?prev-1:0);
  }
  return (
    <div className="w-[100%] p-4 rounded-sm border-1 grid grid-cols-6 gap-1">
      <div className="col-span-3">
        <Badge className="text-[0.6rem]">{tag}</Badge>
        <h4 className="font-bold text-blue-950">{name}</h4>
        <h4>{price}</h4>
        <p className="text-slate-500 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic labore nulla, similique unde beatae tempore adipisci saepe ad suscipite.
        </p>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center py-1">
        <div>
            <img src="https://funmili.s3.amazonaws.com/5cfe4ff8742027abc13c331836048164" className="w-[130px] h-[130px] rounded-sm"></img>
        </div>
        <div className="flex relative bottom-[1rem]">
            <button className="h-[30px] w-[30px] bg-red-500 text-white cursor-pointer rounded-l-md" onClick={increment}>
                +
            </button>
            <p className="h-[30px] w-[30px] bg-red-500  text-white flex justify-center items-center">
                {quantity}
            </p>
            <button className="h-[30px] w-[30px] bg-red-500 text-white cursor-pointer rounded-r-md" onClick={decrement}>
                -
            </button>
        </div>
      </div>
    </div>
  );
};
export default DishCard;
