"use client";
import React, { useRef, useState } from "react";
import SubmitButton from "../route/button/submitButton";
import {
  District,
  DivisionS,
  DivisionSelector,
  Upazila,
} from "@/libs/division";
import { Division, addressTypeData } from "@/libs/data";
import { addAddress } from "@/allActions/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddAddress({ searchParams, setOpen }) {
  const router = useRouter();
  const selectedDivisionRef = useRef("");
  const selectedDistrictRef = useRef("");
  const selectedUpazilaRef = useRef("");

  const [selectedDivisionData, setSelectedDivisionData] = useState({
    districts: [],
  });
  const [selectedDistrictData, setSelectedDistrictData] = useState({
    upazilas: [],
  });
  const handleDivisionChange = (value) => {
    selectedDivisionRef.current = value;
    const divisionData = Division.find(
      (division) => division.name === value
    ) || { districts: [] };
    setSelectedDivisionData(divisionData);
    selectedDistrictRef.current = "";
    setSelectedDistrictData({ upazilas: [] });
    selectedUpazilaRef.current = "";
  };
  const handleDistrictChange = (value) => {
    selectedDistrictRef.current = value;
    const districtData = selectedDivisionData.districts.find(
      (district) => district.name === value
    ) || { upazilas: [] };
    setSelectedDistrictData(districtData);
    selectedUpazilaRef.current = "";
  };
  const handleUpazilaChange = (value) => {
    selectedUpazilaRef.current = value;
  };
  const [addressType, setAddressType] = useState("");
  const [user, setUser] = useState({
    name: "",
    number: "",
    zipCode: "",
    area: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    const { name, number, zipCode, area } = user;
    if (
      !name ||
      !number ||
      !zipCode ||
      !area ||
      !addressType ||
      !selectedDivisionRef.current ||
      !selectedDistrictRef.current ||
      !selectedUpazilaRef.current
    ) {
      toast.error("All fields are required", {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    } else {
      const newForm = new FormData();

      newForm.append(
        "address",
        JSON.stringify({
          name: user.name,
          number: user.number,
          zipCode: user.zipCode,
          addressType: addressType,
          division: selectedDivisionRef.current,
          district: selectedDistrictRef.current,
          upazila: selectedUpazilaRef.current,
          area: user.area,
        })
      );

      try {
        const res = await addAddress(newForm);
        if (res.error) {
          toast.error(res.error, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
        if (res.success == true) {
          if (searchParams.check_out) {
            router.push("/confirm-orders");
          }
          setOpen(false);
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      } catch (error) {
        if (error) {
          toast.error(error, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      }
    }
  };
  return (
    <form className="space-y-1" action={handleSubmit}>
      <div className="flex flex-wrap pt-2 gap-5">
        <div className="w-full  lg:w-[48%]   ">
          <label
            htmlFor="userName"
            className="block text-[13px] font-medium text-gray-700"
          >
            Full name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              required
              value={user.name}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-[98%]  lg:w-[48%]  ">
          <label
            htmlFor="number"
            className="block text-[13px] font-medium text-gray-700"
          >
            Phone number
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="number"
              value={user.number}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------
       */}
      <div className=" gap-1 md:gap-3 justify-start flex flex-wrap">
        <DivisionS
          divisions={Division}
          onSelectDivision={handleDivisionChange}
        />
        <br />
        <District
          districts={selectedDivisionData.districts}
          onSelectDistrict={handleDistrictChange}
        />
        <br />

        <Upazila
          upazilas={selectedDistrictData.upazilas}
          onSelectUpazila={handleUpazilaChange}
        />
        <div className=" w-[98%] lg:w-[48%] ">
          <label
            htmlFor="address"
            className=" text-[13px] font-medium text-gray-700"
          >
            Area address
          </label>
          <div className="mt-1">
            <input
              type="address"
              name="area"
              value={user.area}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <div className="w-[98%]  lg:w-[48%] mx-auto   ">
          <label className="block text-[13px] font-medium text-gray-700 pb-2">
            Address Type
          </label>
          <select
            name="addressType"
            id=""
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
            className="w-[95%] border h-[34px] rounded-[5px] text-[14px] cursor-pointer pl-3"
          >
            <option value="" className="block text-[13px] border pb-2">
              Choose your Address Type
            </option>
            {addressTypeData &&
              addressTypeData.map((item) => (
                <option
                  className="block pb-2"
                  key={item.name}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-[98%]  lg:w-[48%] mx-auto ">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip Code
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="zipCode"
              value={user.zipCode}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <SubmitButton name="Add address" type="loading..." />
      </div>
    </form>
  );
}

export default AddAddress;
