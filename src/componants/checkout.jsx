"use client";
import { Division } from "@/libs/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Checkout = ({ user }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [division, setdivision] = useState("");
  const [district, setdistrict] = useState("");
  const [userInfo, setUserInfo] = useState(true);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const shipping = 3 * 74;
  const totalProduct_price = localStorage.getItem("cartItems").redu;
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
      let userId = user._id;
      const paymentInfo = {
        status: "unpaid",
        info: "Cash on delivey",
      };

      const cart = products.map((product) => ({
        product: product.product._id,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
      }));

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
          <div className="w-full 800px:w-[95%] bg-white rounded-lg p-3 pb-8 min-h-[319px] flex flex-col items-">
            <h5 className="text-[16px] text-center font-[500] pb-2">
              Shipping Address
            </h5>
            <hr className="py-1" />
            {user.addresses.length > 0 ? (
              <div>
                {" "}
                <div className="flex justify-between md:justify-normal ">
                  <h5
                    className="text-[16px] font-[500] pb-2 cursor-pointer inline-block md:pr-20 "
                    onClick={() => setUserInfo(userInfo)}
                  >
                    Choose your address
                  </h5>
                  <h5
                    className="!bg-[#00453e] p-1 text-sm text-white rounded-md  mt-1 cursor-pointer"
                    // onClick={HandelNavigate}
                  >
                    {" "}
                    Add address
                  </h5>
                </div>
                {user &&
                  user.addresses.map((item, index) => (
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
              <div className="mt-[86px] flex justify-center text-sm cursor-pointer">
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
          <CartData
            // handleSubmit={handleSubmit}
            shipping={shipping}
            // price={price}
            // totalPrice={totalPrice}
          />
        </div>
      </div>

      <br />
      <div className="bg-white mt-5 800px:mt-6  w-[90%] 1000px:w-[80%]  p-4">
        <h1 className="text-[17px] pb-2 font-[500]">Payment Info</h1>
        <hr /> <hr />
        <div className="flex flex-row pt-3">
          <input
            type="checkbox"
            className="mr-3"
            checked={true}
            onChange={() => checkCustomRoutes()}
          />
          <h2>Cash on delivery</h2>
        </div>
      </div>

      <div
        className={` !bg-[#D61355] !h-[40px] w-[150px] 800px:w-[280px] `}
        onClick={create_order}
      >
        <h5 className="text-white">Confirm Order</h5>
      </div>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  price,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-4 ">
      <div className="flex justify-between">
        <h3 className="text-[15px] font-[400] text-[#000000a4] ">Subtotal:</h3>
        <h5 className="text-[16px] font-[600]">৳ {price}</h5>
      </div>
      <br />
      <div className="flex justify-between mt-[-4px]">
        <h3 className="text-[15px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[14px] font-[400]"> ৳ {shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b mt-[-4px] pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[400]">
          {/* - {discountPercentenge ? "৳" + discountPercentenge.toString() : null} */}
          0.00
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-1">
        ৳{/* {totalPrice} */}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`w-full border p-1 rounded-[4px] text-[13px] 800px:text-[16px] h-[35px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[35px] m-auto border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
