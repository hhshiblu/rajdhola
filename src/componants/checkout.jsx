"use client";
import { Division } from "@/libs/data";
import Link from "next/link";
import "@/componants/animationcss/success.css";
import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import CartData from "./route/checkout/checkoutProduct";
import { toast } from "sonner";
import { createOrder } from "@/allActions/order";
import { FaArrowRight } from "react-icons/fa6";

const Checkout = ({ user }) => {
  const [name, setName] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const [number, setNumber] = useState("");
  const [division, setdivision] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [area, setArea] = useState("");
  const [upazila, setUpazilla] = useState("");
  const [district, setdistrict] = useState("");
  const [userInfo, setUserInfo] = useState(true);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (
      !secureLocalStorage.getItem("c") &&
      !popup &&
      !secureLocalStorage.getItem("b")
    ) {
      window.location.href = "/";
    }
    if (popup) {
      const timeoutId = setTimeout(() => {
        window.location.href = "/";
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [popup]);

  const redirectHome = () => {
    window.location.href = "/";
  };
  const create_order = async () => {
    try {
      setLoading(true);
      if (user?.addresses === undefined) {
        setLoading(false);
        toast.error("please provide your address.", {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      } else {
        const shippingAddress = {
          name: name,
          number: number,
          address: address,
          district: district,
          zipCode: zipCode,
          division: Division[division]?.name,
        };
        let userId = user?._id;
        const paymentInfo = {
          status: "unpaid",
          info: "Cash on delivey",
        };

        const orderData = {
          cart,
          shippingAddress,
          userId,
          paymentInfo,
        };
        const res = await createOrder(orderData);
        if (res.success == true) {
          setPopup(true);

          secureLocalStorage.removeItem("c");

          secureLocalStorage.removeItem("p");

          setLoading(false);
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "Cancel",
            },
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };
  const handleAddressSelection = (selectedAddress, index) => {
    setAddress(selectedAddress.address);
    setZipCode(selectedAddress.zipCode);
    setdivision(selectedAddress.division);
    setdistrict(selectedAddress.district);
    setAltNumber(selectedAddress.altNumber);
    setUpazilla(selectedAddress.upazila);
    setArea(selectedAddress.area);
    setName(selectedAddress.name);
    setNumber(selectedAddress.number);
    setSelectedAddressIndex(index);
  };
  useEffect(() => {
    setSelectedAddressIndex(0);
    if (userInfo && user && user?.addresses?.length > 0) {
      handleAddressSelection(user?.addresses[0], 0);
    }
  }, [userInfo, user]);

  return (
    <>
      <div className="w-full z-30 pt-16   flex flex-col items-center py-2">
        <div className="w-[90%] 1000px:w-[80%] block 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <div className="w-full 800px:w-[95%] bg-white rounded-lg p-3 pb-8  flex flex-col items-center">
              <h5 className="text-[16px] text-center font-[500] pb-2">
                Shipping Address
              </h5>
              <hr className="py-1" />
              {user?.addresses?.length > 0 ? (
                <div>
                  {" "}
                  <div className="flex justify-between md:justify-normal ">
                    <h5
                      className="text-[16px] font-[500] pb-2 cursor-pointer inline-block md:pr-20 "
                      onClick={() => setUserInfo(userInfo)}
                    >
                      Choose your address
                    </h5>
                    <Link href="/">
                      <div className="flex gap-1">
                        <HiPlus size={20} />
                        <h5 className="text-sm cursor-pointer"> Add address</h5>
                      </div>
                    </Link>
                  </div>
                  {user &&
                    user?.addresses?.map((item, index) => (
                      <div className="w-full flex mt-1" key={index}>
                        <input
                          type="checkbox"
                          name="addressType"
                          className="mr-3 cursor-pointer"
                          value={item.addressType}
                          checked={index === selectedAddressIndex}
                          onChange={() => handleAddressSelection(item, index)}
                        />
                        <h2
                          onClick={() => handleAddressSelection(item, index)}
                          className="cursor-pointer"
                        >
                          {item.addressType}
                        </h2>
                      </div>
                    ))}
                  <div className="border-gray-400  mt-4 border text-[1px] text-[#343333]  border-dashed p-3 rounded-md text-sm md:text-[17px] 800px:max-w-[90%] w-[85%] mx-auto flex-grow ">
                    <p className="text-[15px] ">{name}</p>
                    <h1 className="text-[14px] ">
                      {" "}
                      {number} , {altNumber}
                    </h1>

                    <p className="text-[15px] ">
                      {" "}
                      {area} , {upazila}
                    </p>

                    <p className="text-[15px] ">
                      {district} , {division}
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" flex justify-center text-sm cursor-pointer">
                  <Link href="/user-account/address-book?check_out=true">
                    <div className="w-80 h-20 border-dashed border-2 border-gray-400 text-center flex justify-center items-center">
                      <h1> Add your address</h1>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData popup={popup} />
          </div>
        </div>

        <br />
        <div className="bg-white mt-5 800px:mt-6  w-[90%] 1000px:w-[80%]  p-4 ">
          <h1 className="text-[17px] pb-2 font-[500]">Payment Info</h1>
          <hr /> <hr />
          <div className="flex flex-row pt-3 items-center">
            <input
              type="checkbox"
              className="mr-3 w-[20px] h-[20px]"
              defaultChecked
            />
            <h2>Cash on delivery</h2>
          </div>
        </div>

        <div>
          <button
            className={`bg-[#195851] py-2 text-white text-center px-12  mt-4 rounded-md`}
            onClick={create_order}
          >
            {isLoading ? "Loading..." : "Create Order"}
          </button>
        </div>
      </div>

      {popup && (
        <div className="w-full h-screen  overflow-hidden fixed top-0 left-0 z-[999] bg-[#000000d0] flex items-center justify-center ">
          <div className="justify-center w-[98%] 600px:w-[50%] bg-white py-20 shadow-2xl rounded-lg hover:shadow-inner">
            <svg
              className="checkmark w-[100px] h-[100px] 600px:w-[130px]  600px:h-[130px] shadow-lg  "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <div className="flex flex-col justify-center text-center">
              <h2 className="pt-4 text-[#195851] font-Roboto font-semibold text-lg ">
                Your Order create Succesfully !{" "}
              </h2>

              <h3
                className="pt-4 flex flex-1 items-center justify-center cursor-pointer hover:text-red-700 gap-3 text-[#00453e] font-Roboto font-semibold text-lg"
                onClick={redirectHome}
              >
                Continue Shopping
                <FaArrowRight />
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
