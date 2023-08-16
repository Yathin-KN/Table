/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import { Loader2 } from "lucide-react";
import verifyOtp from "../apis/POST/verifyOtp";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Verify = () => {
  const { user_id } = useSelector(selectUserInfo);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setOtp(event.target.value);
  };

  const verify = async () => {
    console.log("hello");
    try {
      setIsLoading(true);
      const response: any = await verifyOtp({ user_id, otp });
      console.log(response);

      if (response.status === 200) {
        navigate("/app");
      } else {
        console.log(response.response.data.message);
        toast.error(`${response.response.data.message}`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    verify();
    console.log("hello");
  };

  return (
    <div className="max-w-xl mx-auto h-screen bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-200 p-4">
      <ToastContainer />
      <div className="text-2xl font-bold py-8 text-center">
        Get your OTP from the nearest waiter . . . !
      </div>
      <Input
        onChange={handleChange}
        value={otp}
        className="text-xl py-4"
      ></Input>
      <Button
        className="rounded-lg my-4 border-2 text-md bg-blue-600 font-semibold justify-center w-full"
        onClick={handleClick}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Verify
      </Button>
    </div>
  );
};

export default Verify;
