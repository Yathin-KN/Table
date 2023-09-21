import "react-toastify/dist/ReactToastify.css";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./../src/components/ui/tabs";
import Ordercheckout from "./OrderCheckout";
const MainOrderCheckOut = () => {
  return (
    <>
      <Tabs defaultValue="food_bill" className="w-full h-[50%]">
        <TabsList className="w-full gap-2 flex justify-evenly">
          <TabsTrigger value="food_bill">Food Bill</TabsTrigger>
          <TabsTrigger value="drink_bill">Drink Bill</TabsTrigger>
        </TabsList>
        <TabsContent value="food_bill">
          <Ordercheckout type="food_bill" />
        </TabsContent>
        <TabsContent value="drink_bill">
          <Ordercheckout type="drink_bill" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MainOrderCheckOut;
