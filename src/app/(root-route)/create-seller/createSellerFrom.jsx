"use client";

import { useEffect, useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import SubmitButton from "@/componants/route/button/submitButton";
import { createSeller } from "@/allActions/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Division } from "@/libs/data";
const DivisionSelector = ({ divisions, onSelectDivision }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      {" "}
      <label className="block text-sm font-medium text-gray-700 py-1">
        {" "}
        My divisions{" "}
      </label>
      <select
        onChange={(e) => onSelectDivision(e.target.value)}
        className="border px-8  py-2 rounded-md items-center cursor-pointer"
      >
        <option value="">Select Division</option>
        {divisions.map((division) => (
          <option key={division.value} value={division.name}>
            {division.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const DistrictSelector = ({ districts, onSelectDistrict }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      <label className="py-1 block text-sm font-medium text-gray-700">
        My district
      </label>
      <select
        onChange={(e) => onSelectDistrict(e.target.value)}
        className="border px-8  py-2 rounded-md items-center cursor-pointer"
      >
        <option value="">Select District</option>
        {districts &&
          districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
      </select>
    </div>
  );
};

const UpazilaSelector = ({ upazilas, onSelectUpazila }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[45%]">
      <label className="py-1 block text-sm font-medium text-gray-700">
        My upazila
      </label>
      <select
        onChange={(e) => onSelectUpazila(e.target.value)}
        className="border px-8  py-2 rounded-md items-center cursor-pointer "
      >
        <option value="" className="pb-2">
          Select Upazila
        </option>
        {upazilas.map((upazila) => (
          <option key={upazila} value={upazila} className="py-2 custom-option">
            {upazila}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};
function CreateSellerFrom() {
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

  const router = useRouter();
  const formRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    name: "",
    email: "",
    phoneNumber: "",
    category: "",
    address: "",
    zipCode: "",
    password: "",
    cpassword: "",
  });
  const [visible, setVisible] = useState(false);

  const handleShowPasswordChange = () => {
    setVisible(!visible);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async () => {
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", user.name);
    newForm.append("userName", user.userName);
    newForm.append("email", user.email);
    newForm.append("password", user.password);
    newForm.append("cpassword", user.cpassword);
    newForm.append("zipCode", user.zipCode);
    newForm.append("phoneNumber", user.phoneNumber);
    newForm.append("category", user.category);
    newForm.append(
      "address",
      JSON.stringify({
        division: selectedDivisionRef.current,
        district: selectedDistrictRef.current,
        upazila: selectedUpazilaRef.current,
        area: user.address,
      })
    );
    try {
      const res = await createSeller(newForm);
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        router.push(
          `/create-seller?&24354g%^%hvbjnk 354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%&email=${user.email}&fdesw32456789%^%354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%nfe3%^%45678&success=success&uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%%&`
        );
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
        formRef.current.reset();
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
  };
  return (
    <form ref={formRef} className="space-y-3" action={handleSubmit}>
      <div className="flex flex-wrap gap-5">
        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="userName"
              required
              value={user.userName}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Shop name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              required
              value={user.name}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone number
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="phoneNumber"
              required
              value={user.phoneNumber}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={user.email}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------------------------------
       */}
      <div className="gap-3 flex flex-wrap">
        <DivisionSelector
          divisions={Division}
          onSelectDivision={handleDivisionChange}
        />
        <br />
        <DistrictSelector
          districts={selectedDivisionData.districts}
          onSelectDistrict={handleDistrictChange}
        />
        <br />

        <UpazilaSelector
          upazilas={selectedDistrictData.upazilas}
          onSelectUpazila={handleUpazilaChange}
        />
        <div className=" w-[98%] md:w-[46%] md:pl-4">
          <label
            htmlFor="address"
            className=" text-sm font-medium text-gray-700"
          >
            Area address
          </label>
          <div className="mt-1">
            <input
              type="address"
              name="address"
              required
              value={user.address}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Which category product you sell
          </label>
          <div className="mt-1">
            <input
              type="category"
              name="category"
              required
              value={user.category}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-[98%]  md:w-[45%]  ">
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
              required
              value={user.zipCode}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <input
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={user.password}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-[98%]  md:w-[45%]  ">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <div className="mt-1 relative">
            <input
              type={visible ? "text" : "password"}
              name="cpassword"
              autoComplete="current-password"
              required
              value={user.cpassword}
              onChange={handelChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={visible}
          onChange={handleShowPasswordChange}
          className="cursor-pointer"
        />
        <p>show password</p>
      </div>

      <div>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <div className="mt-2 flex items-center">
          <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
            {avatar ? (
              <Image
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                width={50}
                height={50}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <RxAvatar className="h-8 w-8" />
            )}
          </span>
          <label
            htmlFor="file-input"
            className="ml-5 flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <span>Upload a file</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <div>
        <SubmitButton name="Create Account" type="loading..." />
      </div>
    </form>
  );
}

export default CreateSellerFrom;
