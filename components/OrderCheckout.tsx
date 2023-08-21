import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DonateLogo from "../src/assets/donate.jpg";

const Ordercheckout = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const cancelButtonRef = useRef(null);
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-50 py-12 px-2 max-w-xl mx-auto">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-md mx-auto w-full max-w-lg rounded-md">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col space-y-2">
            <div className="font-semibold text-2xl items-center justify-center text-center">
              <p className="">Order Checkout!</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-500 text-center">
              <p>
                On Clicking Checkout you will be ending the session and will be
                redirected to the payment page.
              </p>
            </div>
            <table className="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-slate-700">
                      Birayani (Chicken)
                    </div>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    &#8377; 1000.00
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-slate-700">
                      Coca Cola (300ml)
                    </div>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    &#8377; 100.00
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                  >
                    Subtotal
                  </th>
                  <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    &#8377; 0.00
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                  >
                    Discount
                  </th>
                  <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    &#8377; 0.00
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                  >
                    Tax
                  </th>
                  <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    &#8377; 0.00
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-4 pl-4 pr-3 text-sm font-semibold text-left text-slate-800"
                  >
                    Total
                  </th>
                  <td className="pt-4 pl-3 pr-4 text-sm font-semibold text-right text-slate-800 sm:pr-6 md:pr-0">
                    &#8377; 0.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <div className="flex flex-col space-y-4">
              <a
                href="/app"
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-md shadow-sm"
              >
                Back to Menu
              </a>
              <button
                onClick={handleClick}
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-green-700 border-none text-white text-md shadow-sm"
              >
                Checkout
              </button>
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
                    <div className="mt-1">
                      <input
                        type="number"
                        name="donation"
                        id="donation"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Donate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
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
