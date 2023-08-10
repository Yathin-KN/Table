import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import DishCard from "./dishCardConatiner";
import DrinkCardContainer from './DrinkCardContainer'
import Cart from './Cart'
import MyOrders from './myOrders'

const Home = () => {
  return (
    <Tabs defaultValue="account" className="w-screen">
      <TabsList className="w-screen gap-2 flex justify-evenly">
        <TabsTrigger value="account">Dishes</TabsTrigger>
        <TabsTrigger value="password">Drinks</TabsTrigger>
        <TabsTrigger value="cart">Cart</TabsTrigger>
        <TabsTrigger value="my orders">My Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <DishCard />
      </TabsContent>
      <TabsContent value="password">
        <DrinkCardContainer/>
      </TabsContent>
      <TabsContent value="cart">
        <Cart />
      </TabsContent>
      <TabsContent value="my orders">
        <MyOrders/>
      </TabsContent>
    </Tabs>
  );
};

export default Home;
