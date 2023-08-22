/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DonateLogo from "../src/assets/donate.jpg";
import fetchBillByOtp from "./../apis/GET/fetchBillByOtp";
import createBill from "./../apis/GET/createBill";
import { BillDetails } from "apis/types";
import { useDispatch, useSelector } from "react-redux";
import {
  MemberInfo,
  resetUserState,
  selectUserInfo,
} from "./../store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface TableRowProps {
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface TableFooterRowProps {
  title: string;
  amount: number;
  isBold?: boolean;
}
function TableRow({ name, price, quantity, amount }: TableRowProps) {
  return (
    <tr className="border-b border-slate-200">
      <td className="py-4 px-3 text-sm">
        <div className="font-medium text-slate-700">{name}</div>
      </td>
      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500">
        &#8377; {price}
      </td>
      <td className="py-3 px-2 text-sm text-center text-slate-500">
        X {quantity}
      </td>
      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500">
        &#8377; {amount}
      </td>
    </tr>
  );
}

function TableFooterRow({ title, amount, isBold }: TableFooterRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className={`pt-4 pl-4 pr-3 text-sm ${
          isBold ? "font-semibold" : "font-light"
        } text-left text-slate-500`}
      >
        {title}
      </th>
      <td
        className={`pt-4 pl-3 pr-4 text-sm text-right text-slate-500 ${
          isBold ? "font-semibold" : "font-light"
        } `}
      >
        &#8377; {amount.toFixed(2)}
      </td>
    </tr>
  );
}

const Ordercheckout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(true);
  };

  const { otp, user_id } = useSelector(selectUserInfo);
  const { membership_id } = useSelector(MemberInfo);
  const [billDetails, setBillDetailes] = useState<BillDetails>();
  const [donationAmount, setDonationAmount] = useState("0");
  const [checkOut, setCheckOut] = useState(false);
  
  const fetchBill = async () => {
    try {
      const resp = await fetchBillByOtp(otp);
      console.log(resp);
      setBillDetailes(resp);
    } catch (err:any) {
      console.log(err);
      toast.error(`${err.toString()}`, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  useEffect(() => {
    fetchBill();
  }, []);

  const handleChange = (event: any) => {
    const amt = event.target.value;
    setDonationAmount(amt);
  };
  const cancelButtonRef = useRef(null);

  const create = async () => {
    try {
      const resp = await createBill(user_id, donationAmount, membership_id);
      console.log(resp.status);
      setCheckOut(true);
      dispatch(resetUserState());
      console.log("hii");
      toast.success(`successfully checkedout !!!`, {
        position: "top-center",
        autoClose: 1500,
      });
    } catch (err:any) {
      toast.error(`${err.message.toString()}`, {
        position: "top-center",
        autoClose: 1500,
      });
      console.log(err);
    }
  };
  const handleCheckout = () => {
    create();
    setOpen(false);
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-50 py-12 px-2 max-w-xl mx-auto">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-md mx-auto w-full max-w-lg rounded-md">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold text-2xl items-center justify-center text-center">
              <p className="">Order Checkout!</p>
              <ToastContainer
                toastClassName={() =>
                  " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
                }
              />
            </div>
            <div className="flex flex-col text-md font-medium text-gray-700 text-center">
              <p>
                On Clicking Checkout you will be ending the session and will be
                redirected to the payment page.
              </p>
              {checkOut ? (
                <p className="font-bold text-green-500">
                  Successfully checked out !!!!
                </p>
              ) : null}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-slate-800">
                      Description
                    </th>
                    <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-800">
                      Price
                    </th>
                    <th className="py-3 px-2 text-right text-sm font-semibold text-slate-800">
                      Quantity
                    </th>
                    <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-800">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billDetails?.DishItems.map((dishItem, index) => (
                    <TableRow
                      key={index}
                      name={dishItem.name}
                      price={dishItem.price}
                      quantity={dishItem.quantity}
                      amount={dishItem.amount}
                    />
                  ))}
                  {billDetails?.DrinkItems.map((drinkItem, index) => (
                    <TableRow
                      key={index}
                      name={drinkItem.name}
                      price={drinkItem.price}
                      quantity={drinkItem.quantity}
                      amount={drinkItem.amount}
                    />
                  ))}
                </tbody>
              </table>
              {billDetails && (
                <table className="min-w-full divide-y divide-slate-500">
                  <tbody>
                    <TableFooterRow
                      title="Subtotal"
                      amount={billDetails.dishTotal + billDetails.drinkTotal}
                    />
                    <TableFooterRow title="Discount" amount={0} />
                    <TableFooterRow
                      title="Tax"
                      amount={billDetails.cgst + billDetails.sgst}
                    />
                    <TableFooterRow
                      title="Total"
                      amount={billDetails.grandTotal}
                      isBold
                    />
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <a
                href="app"
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-md shadow-sm"
              >
                Back to Menu
              </a>
              {!checkOut && (
                <button
                  onClick={handleClick}
                  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-green-700 border-none text-white text-md shadow-sm"
                >
                  Confirm Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-md shadow">
                      <img src={DonateLogo} alt="donate" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Be the Change: Support a Malnutrition-Free India!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 text-justify">
                          Want to make your meal even more meaningful? Join us
                          in our mission to create a malnutrition-free India.
                          With a small contribution, you can make a big
                          difference in someone's life. Together, let's build a
                          future where no one goes to bed hungry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
                    <label
                      htmlFor="donation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter donation amount:
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          &#8377;
                        </span>
                      </div>
                      <input
                        type="number"
                        name="donation"
                        id="donation"
                        onChange={handleChange}
                        value={donationAmount}
                        className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleCheckout}
                      ref={cancelButtonRef}
                    >
                      Donate amount
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Ordercheckout;
