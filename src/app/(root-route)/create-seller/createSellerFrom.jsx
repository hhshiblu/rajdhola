"use client";

import { useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import SubmitButton from "@/componants/route/button/submitButton";
import { createSeller } from "@/allActions/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateSellerFrom() {
  const router = useRouter();
  const formRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
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
    newForm.append("email", user.email);
    newForm.append("password", user.password);
    newForm.append("cpassword", user.cpassword);
    newForm.append("zipCode", user.zipCode);
    newForm.append("address", user.address);
    newForm.append("phoneNumber", user.phoneNumber);
    newForm.append("category", user.category);
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
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Shop Name
        </label>
        <div className="mt-1">
          <input
            type="name"
            name="name"
            required
            value={user.name}
            onChange={handelChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
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

      <div>
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

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
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

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          which category product you sell
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

      <div>
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

      <div>
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
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
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
