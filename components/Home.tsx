import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import DishCardContainer from "./DishCardContainer";
import DrinkCardContainer from "./DrinkCardContainer";
import Cart from "./Cart";
import MyOrders from "./myOrders";
import { memo } from "react";

const Home = () => {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex">
      <Tabs defaultValue="dishes" className="w-full">
        <div className="sticky top-0 bg-white z-50 pb-1">
          <TabsList className="w-full gap-2 flex justify-evenly">
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="myorders">My Orders</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="dishes">
          <DishCardContainer />
        </TabsContent>
        <TabsContent value="drinks">
          <DrinkCardContainer />
        </TabsContent>
        <TabsContent value="cart">
          <Cart />
        </TabsContent>
        <TabsContent value="myorders">
          <MyOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default memo(Home);
