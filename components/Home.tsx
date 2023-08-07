import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import DishCard from "./dishCardConatiner";
import Cart from './Cart'
const Home = () => {
  return (
    <Tabs defaultValue="account" className="w-screen">
      <TabsList className="w-screen gap-2 flex justify-evenly">
        <TabsTrigger value="account">Dishes</TabsTrigger>
        <TabsTrigger value="password">Drinks</TabsTrigger>
        <TabsTrigger value="cart">Cart</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <DishCard />
      </TabsContent>
      <TabsContent value="password">
        <DishCard />
      </TabsContent>
      <TabsContent value="cart">
        <Cart />
      </TabsContent>
    </Tabs>
  );
};

export default Home;
