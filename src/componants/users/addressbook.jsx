"use client";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import AddAddress from "./addAddress";
import { deleteAddress } from "@/allActions/auth/auth";
import { toast } from "sonner";

function AddressBook({ user, searchParams }) {
  const [expandedAddresses, setExpandedAddresses] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleAddress = (index) => {
    setExpandedAddresses((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const deleteAddressHandler = async (address) => {
    try {
      const res = await deleteAddress(address.addressType);

      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    } catch (error) {}
  };
  const AddressEdit = () => {
    toast.success("Expect site updates soon", {
      duration: 3000,
      cancel: {
        label: "cancel",
      },
    });
  };
  return (
    <>
      <div className="flex justify-end items-center pb-8">
        <h2
          className=" pr-3 pb-2 font-medium cursor-pointer text-gray-800"
          onClick={() => setOpen(!open)}
        >
          + Add address
        </h2>
      </div>
      {!open ? (
        <div className="flex flex-wrap gap-1 mx-auto ">
          {user?.addresses?.map((address, i) => (
            <div
              className="flex flex-col w-[98%] lg:w-[45%] relative mx-auto hover:shadow-lg bg-white p-4 rounded-md"
              key={i}
            >
              <div className="flex justify-between pb-3 overflow-hidden ">
                <button className="border border-cyan-800 rounded-lg px-2 py-[2px] text-[13px] ">
                  {address.addressType}
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => toggleAddress(i)}
                >
                  <BsThreeDots />
                </button>

                <div
                  className=" bg-white shadow-2xl absolute  overflow-hidden h-[60px] right-6 top-9 px-8  rounded-md  duration-200 "
                  style={{
                    height: expandedAddresses[i] ? "60px" : "0px",
                    transition: "height 0.3s ease",
                  }}
                >
                  <h2
                    className="border-b-cyan-700 pb-[2px] pt-2 cursor-pointer text-[14px] text-gray-700"
                    onClick={AddressEdit}
                  >
                    Edit
                  </h2>
                  <hr />
                  <hr />
                  <h2
                    className=" cursor-pointer text-[14px] text-gray-700 pt-[2px]"
                    onClick={() => deleteAddressHandler(address)}
                  >
                    Delete
                  </h2>
                </div>
              </div>
              <div className="pl-3">
                <h2 className="text-gray-600 text-[13px] ">{address.name}</h2>
                <h2 className="text-gray-600 text-[13px] ">
                  {address.number} , {address.altNumber}
                </h2>
                <h2 className="text-gray-600 text-[13px] ">
                  zipCode : {address.zipCode}
                </h2>
                <h2 className="text-gray-600 text-[13px] ">{address.email}</h2>
                <h2 className="text-gray-600 text-[13px] ">
                  {address.area} , {address.upazila}
                </h2>

                <h2 className="text-gray-600 text-[13px] ">
                  {address.district} , {address.division}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="justify-center w-full md:w-[100%] lg:w-[80%] bg-white py-8 shadow-2xl rounded-lg hover:shadow-inner px-8 mx-auto overflow-hidden ">
          <div className="text-center pb-2 border-b-2">Add address</div>
          <AddAddress
            searchParams={searchParams}
            setOpen={setOpen}
            open={open}
          />
        </div>
      )}
    </>
  );
}

export default AddressBook;
