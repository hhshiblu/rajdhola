"use client";
import { React, useState } from "react";
import "@/componants/animate.css";
import { RxAvatar } from "react-icons/rx";

import Image from "next/image";
import Link from "next/link";
import SubmitButton from "@/componants/route/button/submitButton";
import { createSeller } from "@/allActions/auth/auth";

const ShopCreate = () => {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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
    const res = await createSeller(newForm);
    alert(res);
  };

  return (
    <>
      <div className="loginbackground box-background--white padding-top--64">
        <div
          className="loginbackground-gridContainer "
          style={{
            backgroundImage:
              "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
            display: "-ms-grid",
            display: "grid",
            msGridColumns:
              "[start] 1fr [left-gutter] (86.6px)[16] [left-gutter] 1fr [end]",
            gridTemplateColumns:
              "[start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end]",
            msGridRows:
              "[top] 1fr [top-gutter] (64px)[8] [bottom-gutter] 1fr [bottom]",
            gridTemplateRows:
              "[top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom]",
            justifyContent: "center",
            margin: "0 -2%",
            transform: "rotate(-12deg) skew(-12deg)",
          }}
        >
          <div
            className="box-root flex-flex"
            style={{ gridArea: "top / start / 8 / end" }}
          >
            <div
              className="box-root"
              style={{
                backgroundImage:
                  "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                flexGrow: 1,
              }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "4 / 2 / auto / 5" }}
          >
            <div
              className="box-root box-divider--light-all-2 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "6 / start / auto / 2" }}
          >
            <div
              className="box-root box-background--gray100 animationLeftRight"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "2 / start / auto / 4" }}
          >
            <div
              className="box-root  box-background--gray100 animationLeftRight "
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "7/ start / auto / 4" }}
          >
            <div
              className="box-root box-background--blue animationLeftRight"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "8 / 4 / auto / 6" }}
          >
            <div
              className="box-root  box-background--cyan200 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "9 / 13 / auto / 20" }}
          >
            <div
              className="box-root box-background--blue800 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "2/ 15 / auto / end" }}
          >
            <div
              className="box-root box-background--cyan200 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>

          <div
            className="box-root flex-flex "
            style={{ gridArea: "4/ 17 / auto / 20" }}
          >
            <div
              className="box-root  box-background--cyan200 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "5 / 14 / auto / 17" }}
          >
            <div
              className="box-root box-background--blue800 animationRightLeft tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          style={{ zIndex: "1" }}
        >
          <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
            Register as a seller
          </h2>
        </div>
        <div
          className="mt-8 sm:mx-auto sm:w-full  sm:max-w-[35rem] px-4"
          style={{ zIndex: "1" }}
        >
          <div className="bg-white py-8 px-4  sm:rounded-lg sm:px-10 shadow-2xl">
            <form className="space-y-3" action={handleSubmit}>
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    className="ml-5 flex items-center justify-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
                <SubmitButton name="Signup" type="loading..." />
              </div>
              <div
                className="flex justify-center text-center font-semibold pt-8 text-gray-600 gap-4 w-full mx-auto text-[14px]"
                style={{ zIndex: "inherit" }}
              >
                <span>
                  <Link href="#">© Rajdhola</Link>
                </span>
                <span>
                  <Link href="#">Contact</Link>
                </span>
                <span>
                  <Link href="#">Privacy & terms</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreate;
