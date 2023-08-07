import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    tableNo: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch("https://l4ts4vhb71.execute-api.us-east-1.amazonaws.com/api/client/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Error sending data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
      navigate('/app');
    }
  };

  return (
    <div className="p-4">
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
          {isLoading?"fetching opt":"get otp"}
        </button>
      </form>
    </div>
  );
};

export default Login;
