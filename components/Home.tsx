import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import DishCard from './dishCardConatiner';
const Home = () => {
  return (
    <Tabs defaultValue="account" className="w-screen">
      <TabsList className="w-screen gap-2 flex justify-evenly">
        <TabsTrigger value="account">Dishes</TabsTrigger>
        <TabsTrigger value="password">Drinks</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <DishCard/>
      </TabsContent>
      <TabsContent value="password">
        <DishCard/>
      </TabsContent>
    </Tabs>
  );
};

export default Home;
