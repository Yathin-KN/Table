import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import fetchRejectedItems from "./../apis/GET/fetchRejectedItems";
import { AlertTriangle } from "lucide-react";
const Rejected = ({ order_id }: { order_id: string }) => {
  const [rejected, setRejected] = useState<any>({});
  const getData = async () => {
    try {
      const resp = await fetchRejectedItems(order_id);
      setRejected(resp[0]);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("hello");
    getData();
  }, []);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <AlertTriangle className="text-red-600" />
        </DialogTrigger>
        <DialogContent className="border-2 w-[80%] mx-auto rounded-md">
          <DialogHeader>
            <DialogTitle className="text-red-400">These Items were rejected !</DialogTitle>
            {rejected && <DialogDescription>
              <div className="p-4 bg-white rounded-lg max-w-md mx-auto text-start text-gray-900">
                <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                <div className="mb-4">
                  <p className="font-semibold">Order ID:</p>
                  <p>{rejected?._id}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">User ID:</p>
                  <p>{rejected?.user_id}</p>
                </div>
                 <div className="mb-4">
                  <p className="font-semibold">Dishes:</p>
                  <ul className="list-disc ml-6">
                    {(rejected.dishes!==undefined )&&rejected.dishes.map((dish:any) => (
                      <li key={dish._id}>
                        {dish.quantity} x {dish.foodName}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Drinks:</p>
                  <ul className="list-disc ml-6">
                    {(rejected.drinks!==undefined )&&rejected.drinks.map((drink:any) => (
                      <li key={drink._id}>
                        {drink.quantity} x {drink.drinkName}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Rejected Items ID:</p>
                  <p>{rejected?.rejectedItems_id}</p>
                </div>
              </div>
            </DialogDescription>}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rejected;
