/* eslint-disable @typescript-eslint/no-unused-vars */
import Home from "./../components/Home";
import Login from "../components/Login";
import Error from "../components/Error";
import Verify from "../components/Verify";
import Jointable from "../components/Jointable";
import Start from "../components/Start";
import { BrowserRouter, Route, Routes} from "react-router-dom"; // Added `Navigate` from `react-router-dom`
import Ordercheckout from "../components/OrderCheckout";

function App() {

  return (
    <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<Home />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/jointable" element={<Jointable />} />
              <Route path="/food_bill_view" element={<Ordercheckout type="food_bill"/>} />
              <Route path="/drink_bill_view" element={<Ordercheckout type="drink_bill"/>} />
             
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;