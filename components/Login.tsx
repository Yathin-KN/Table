import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setOtp } from "./../store/slices/authSlice";
import { ToastContainer , toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    tableNo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
const notify = () => toast("Wow so easy!");
  
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/createCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { otp , user_id , tableNo} = responseData;
        console.log(responseData);
        const { name, phoneNo } = formData;
        dispatch(setUserInfo({ username: name, phoneNumber: phoneNo , tableNo:tableNo}));
        dispatch(setOtp({ otp: otp, user_id: user_id }));
        console.log("Data sent successfully!");
      navigate("/app");
      } else {
        console.error("Error sending data.");
      }
    } catch (error) {
      notify();
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[url('./../assets/bg-1.jpg')]">
       <ToastContainer />
      <h2 className="text-blue-900 font-bold">Enter Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-2 rounded-md w-full py-2 px-3 my-3"
        />
        <label>
          <h2 className="text-blue-900 font-bold">Phone number</h2>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
            className="border-2 rounded-sm w-full py-2 px-3 my-3"
          />
        </label>
        <label>
          <h2 className="text-blue-900 font-bold">Table number</h2>
          <input
            type="text"
            name="tableNo"
            value={formData.tableNo}
            onChange={handleChange}
            required
            className="border-2 rounded-sm w-full py-2 px-3 my-3"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {isLoading ? "fetching otp" : "get otp"}
        </button>
      </form>
    </div>
  );
};

export default Login;
