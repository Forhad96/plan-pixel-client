import { AuthContext } from "@/Providers/AuthProviders";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

//payment getWay images
import sslcommarz from "@/assets/Payment/sslcommarz.png";

const PaymentInfo = ({ planName }) => {
  const router = useRouter();
  const xios = useAxios();
  const { user } = useContext(AuthContext);
  const [payOption, setPayOption] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payInfo = {
        name: user?.displayName,
        email: user?.email,
        planName,
        currency: "BDT",
      };
      if (payOption === "sslcommarz") {
        console.log("sslcommaarz");

        const res = await xios.post("/sslPayment", payInfo);
        router.push(res.data.url);
        console.log(res.data.url);
      } else if (payOption === "stripe") {
        router.push(`/pricing/stripe/${planName}`);
      } else {
        toast.error("please select payment option");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePay = async () => {
  //   try {
  //     const payInfo = {
  //       name: user?.displayName,
  //       email: user?.email,
  //       planName,
  //       currency: "BDT",
  //     };

  //     const res = await xios.post("/sslPayment", payInfo);
  //     router.push(res.data.url);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      {/* <button
        onClick={handlePay}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        ssl
      </button> */}

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div>
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Please Select your prefer payment options
          </h3>
          <>
            <ul className="grid w-full gap-6 md:grid-cols-3">
              <li>
                <input
                  type="radio"
                  id="sslcommarz"
                  name="paymentOption"
                  defaultValue="sslcommarz"
                  className="hidden peer"
                  onChange={(e) => setPayOption(e.target.value)}
                  required=""
                />
                <label
                  htmlFor="sslcommarz"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">SSL</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="stripe"
                  name="paymentOption"
                  defaultValue="stripe"
                  onChange={(e) => setPayOption(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="stripe"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Stripe</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <button onClick={handleUddoktaPay}>uddokataPay</button>
            </ul>
          </>
        </div>
        <div className="border hover:border-green-600 my-5">
          <div className="group relative cursor-pointer py-2">
            <div className="flex items-center justify-between space-x-5 bg-white px-4">
              <a
                className="menu-hover my-2 py-2 text-base font-medium lg:mx-4"
                onclick=""
              >
                Currency
              </a>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </div>
            <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
              <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                BDT
              </a>
              <a className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                USD
              </a>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled
            defaultValue={user?.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="name@flowbite.com"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default PaymentInfo;
