/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setOtp } from "./../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
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
        const { otp, user_id, tableNo } = responseData;
        console.log(responseData);
        const { name, phoneNo } = formData;
        dispatch(
          setUserInfo({
            username: name,
            phoneNumber: phoneNo,
            tableNo: tableNo,
          })
        );
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
    <div className="p-4 bg-blue-50 h-screen">
      <ToastContainer />
      <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 px-2">
        Login to F and B System
      </h2>
      <div className="mt-4 mx-auto w-full max-w-md px-4 mb-10">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="font-bold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="text-gray-700 mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="font-bold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="text-gray-700 mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="name" className="font-bold text-gray-700">
                Member Name
              </label>
              <div className="mt-1">
                <input
                  id="member-name"
                  type="text"
                  name="member-name"
                  required
                  placeholder="John Doe"
                  className="text-gray-700 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="id" className="font-bold text-gray-700">
                Membership ID
              </label>
              <select
                id="membership-id"
                name="membership-id"
                className="mt-1 block w-full bg-slate-100 text-gray-700 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option>1000</option>
                <option>1001</option>
                <option>1002</option>
              </select>
            </div>
            <div>
              <label htmlFor="table-number" className="font-bold text-gray-700">
                Table Number
              </label>
              <input
                type="text"
                name="tableNo"
                value={formData.tableNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md font-bold border border-transparent bg-blue-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? "Fetching OTP" : "Get OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
