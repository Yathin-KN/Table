/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setOtp } from "./../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TEST_URL } from "./../URL";
import fetchAllTables from "./../apis/GET/fetchAllTables";
import fetchMemberInfo from "./../apis/GET/fetchMemberInfo";
import { Table } from "./../apis/types";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    tableNo: "",
  });
  const tableNoRef = useRef<HTMLSelectElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState({
    name: "",
    memberId: "",
  });
  const [tables, setTables] = useState<Table[]>([]);
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
      const response = await fetch(`${TEST_URL}/api/client/createCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
        navigate("/verify");
      } else {
        console.error("Error sending data.");
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberInfo = async () => {
    try {
      const resp = await fetchMemberInfo(formData.phoneNo);
      console.log(resp);
      setMemberData({
        name: resp[0].name,
        memberId: resp[0].membership_id,
      });
      console.log({
        name: resp[0].name,
        memberId: resp[0].membership_id,
      });
    } catch {}
  };
  useEffect(() => {
    if (formData.phoneNo.length == 10) {
      getMemberInfo();
    }
  }, [formData.phoneNo]);

  const getTables = async () => {
    try {
      const Tables = await fetchAllTables();
      setTables(Tables);
    } catch (err) {
      console.log(err);
    }
  };

  const handelChangeTable = () => {
    const selectedTableNo = tableNoRef.current?.value;
    setFormData((prev) => ({
      ...prev,
      tableNo: selectedTableNo || "",
    }));
  };
  useEffect(() => {
    getTables();
  }, []);
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
                placeholder="Enter your phone number"
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
                  readOnly
                  value={memberData.name}
                  placeholder="Enter member name"
                  className="text-gray-700 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="member-id" className="font-bold text-gray-700">
                Member id
              </label>
              <div className="mt-1">
                <input
                  id="member-id"
                  type="text"
                  name="member-id"
                  required
                  readOnly
                  value={memberData.memberId}
                  placeholder="Enter member id"
                  className="text-gray-700 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="id" className="font-bold text-gray-700">
                Table no
              </label>
              <select
                id="table_no"
                name="table_no"
                className="mt-1 block w-full bg-slate-100 text-gray-700 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                onChange={handelChangeTable}
                ref={tableNoRef}
              >
                {tables.map((table) => {
                  if (table.active === "true") {
                    return <option key={table.tableNo}>{table.tableNo}</option>;
                  }
                })}
              </select>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md font-bold border border-transparent bg-blue-600 py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? "Submitted" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
