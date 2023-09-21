/* eslint-disable @typescript-eslint/no-unused-vars */
import Home from "./../components/Home";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Error from "../components/Error";
import Verify from "../components/Verify";
import Jointable from "../components/Jointable";
import Start from "../components/Start";
import MainOrderCheckout from "../components/MainOrderCheckout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Added `Navigate` from `react-router-dom`
import { selectJoineeInfo } from "./../store/slices/authSlice";

function App() {
  const isJoinee = useSelector(selectJoineeInfo);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/jointable" element={<Jointable />} />
          {!isJoinee ? (
            <Route path="/ordercheckout" element={<MainOrderCheckout />} />
          ) : (
            <Route path="/ordercheckout" element={<Navigate to="/app" />} />
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
