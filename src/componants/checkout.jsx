"use client";
import { Division } from "@/libs/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import CartData from "./route/checkout/checkoutProduct";

const Checkout = ({ user }) => {
  const [name, setName] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const [number, setNumber] = useState("");
  const [division, setdivision] = useState("");
  const [district, setdistrict] = useState("");
  const [userInfo, setUserInfo] = useState(true);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const create_order = async () => {
    try {
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
      console.log(orderData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const handleAddressSelection = (selectedAddress, index) => {
    setAddress(selectedAddress.address);
    setZipCode(selectedAddress.zipCode);
    setdivision(selectedAddress.division);
    setdistrict(selectedAddress.district);
    setName(selectedAddress.name);
    setNumber(selectedAddress.number);
    setSelectedAddressIndex(index);
  };
  useEffect(() => {
    setSelectedAddressIndex(0);
    if (userInfo && user && user.addresses.length > 0) {
      handleAddressSelection(user.addresses[0], 0);
    }
  }, [userInfo, user]);

  return (
    <div className="w-full flex flex-col items-center py-2">
      <div className="w-[90%] 1000px:w-[80%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <div className="w-full 800px:w-[95%] bg-white rounded-lg p-3 pb-8  flex flex-col items-center">
            <h5 className="text-[16px] text-center font-[500] pb-2">
              Shipping Address
            </h5>
            <hr className="py-1" />
            {user?.addresses.length > 0 ? (
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
                  user?.addresses.map((item, index) => (
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
                <div className="border-gray-400 mt-4 border  border-dashed p-3 rounded-md text-sm md:text-[17px] 800px:max-w-[70%] w-[80%] mx-auto flex-grow ">
                  <div className="">
                    <p>{name}</p>
                  </div>
                  <p> {number}</p>

                  <div className="py-1">
                    <p> {address}</p>
                  </div>
                  <div className="flex">
                    <p>
                      {district} , {Division[division]?.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex justify-center text-sm cursor-pointer">
                <Link href="/">
                  <div className="w-80 h-20 border-dashed border-2 border-gray-400 text-center flex justify-center items-center">
                    <h1> Add your address</h1>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData />
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
            checked={true}
            defaultChecked
            readOnly
          />
          <h2>Cash on delivery</h2>
        </div>
      </div>

      <div
        className={` bg-[#195851] py-2   px-12 cursor-pointer mt-4 rounded-md`}
        onClick={create_order}
      >
        <h5 className="text-white text-centers">Confirm Order</h5>
      </div>
    </div>
  );
};

export default Checkout;
