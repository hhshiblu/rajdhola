"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

// const inter = Inter({ subsets: ['latin'] })

const mainMenu = [
  {
    id: 1,
    icon: "zp zp-home",
    label: "Home",
    link: "/",
  },
  {
    id: 2,
    icon: "zp zp-info",
    label: "Persional Info",
    link: "/seller_dashboard/persional-info",
  },
  {
    id: 3,
    icon: "zp zp-credit-card",
    label: "Payments",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "Account Balance",
        link: "/seller_dashboard/payments/balance",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Payments Histories",
        link: "/seller_dashboard/payments/histories",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Payments Settings",
        link: "/seller_dashboard/payments/settings",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Withdrawal",
        link: "/seller_dashboard/payments/withdrawal",
      },
    ],
  },
  {
    id: 4,
    icon: "zp zp-private-connectivity",
    label: "Access Permission",
    link: "/seller_dashboard/access-permission",
  },
];

function RootLayout({ children }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileNavClick, setMobileNavClick] = useState(false);
  const [userData, setAuthenticUser] = useState(null);
  const [isAuthentic, setAuthentic] = useState(true);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubArrow, setActiveSubArrow] = useState(false);

  const toggleSubMenu = (id) => {
    if (activeSubMenu === id) {
      setActiveSubArrow(false);
      setActiveSubMenu(null);
    } else {
      if (!activeSubArrow) {
        setActiveSubMenu(id);
      }
      if (id === 3) {
        setActiveSubArrow(true);
      }
      if (mobileNavClick && mobileNav) {
        if (id !== 3) {
          setMobileNav(false);
        }
      }
    }
  };

  const clickSubMenu = (id) => {
    if (mobileNavClick && mobileNav) {
      setMobileNav(false);
    }
  };

  const NavigationMenu = () => {
    setMobileNavClick(true);
    setMobileNav(!mobileNav);
    if (mobileNav) {
    } else {
    }
  };

  const ProfileMenu = () => {
    if (notificationMenu) {
      setNotificationMenu(false);
    }
    setProfileMenu(!profileMenu);
  };

  const NotificationDropdown = () => {
    if (profileMenu) {
      setProfileMenu(false);
    }
    setNotificationMenu(!notificationMenu);
  };

  return (
    <html lang="en">
      <body>
        {isAuthentic ? (
          <>
            <header className="bg-[#00453e] flex items-center w-full text-neutral-950 shadow-lg border border-gray-300	">
              {/* <i
                className={
                  " " +
                  (mobileNavClick
                    ? mobileNav
                      ? "zp zp-arrow-back text-2xl px-4 block md:hidden cursor-pointer"
                      : "zp zp-menu text-2xl px-4 block md:hidden cursor-pointer"
                    : "")
                }
                onClick={() => NavigationMenu()}
              ></i> */}
              <h2
                onClick={() => NavigationMenu()}
                className="zp zp-arrow-back text-2xl px-4 block md:hidden cursor-pointer"
              >
                toggle
              </h2>
              <h2>sjfja</h2>
              {/* <Image

                className="w-9 h-9 mx-4 rounded-full my-3.5 cursor-pointer"
                onClick={ProfileMenu}
                src="https://lh3.googleusercontent.com/a/ACg8ocL4ioY5yHg1l43UIHDEZW4yB9TGWocuth2t-3rn7Wwq1w=s96-c-rg-br100"
                width={9}
                height={9}
              ></Image> */}
              <div className="ml-auto	">
                <ul className="flex items-center">
                  {authLoading ? (
                    <>
                      <li>
                        <div className="cursor-pointer mr-2 flex h-9 w-9 rounded-full bg-gray-300 items-center relative">
                          <div className="bg-gray-300 text-xl mx-auto"></div>
                        </div>
                      </li>
                      <li>
                        <div className="w-9 h-9 mx-4 rounded-full my-3.5 bg-gray-300"></div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <div
                          className="cursor-pointer mr-2 flex h-9 w-9 rounded-full bg-gray-300 items-center relative"
                          onClick={NotificationDropdown}
                        >
                          <i className="zp zp-notifications text-xl mx-auto"></i>
                          {/* <span className='h-5 w-5 bg-red-500 rounded-full top-[-3px] right-[-3px] absolute flex items-center justify-center text-gray-100'>2</span> */}
                        </div>
                      </li>
                      <li>
                        {/* <Image
                          className="w-9 h-9 mx-4 rounded-full my-3.5 cursor-pointer"
                          onClick={ProfileMenu}
                          src="https://lh3.googleusercontent.com/a/ACg8ocL4ioY5yHg1l43UIHDEZW4yB9TGWocuth2t-3rn7Wwq1w=s96-c-rg-br100"
                          width={9}
                          height={9}
                        ></Image> */}
                        <h2>ahasdfa</h2>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </header>
            <div
              className="absolute right-4  bg-[#195851] pt-4 z-50 shadow-lg w-72 rounded-b"
              style={{ display: profileMenu ? "block" : "none" }}
            >
              <div className="flex">
                <div className="border-b pb-3 px-5 w-full">
                  <h2 className="font-bold">
                    {userData?.fname + " " + userData?.lname}
                  </h2>
                  <span>@username</span>
                </div>
              </div>
              <ul className="">
                <li>
                  <Link
                    href="../../account-settings"
                    className="px-5 py-3 block hover:bg-slate-300 rounded"
                  >
                    <i className="zp zp-manage-accounts mr-3"></i>Account
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="px-5 py-3 block hover:bg-slate-300 rounded"
                  >
                    <i className="zp zp-logout mr-3"></i>Sign Out
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="absolute right-4 bg-white pt-4 z-50 shadow-lg w-full max-w-sm rounded-b"
              style={{ display: notificationMenu ? "block" : "none" }}
            >
              <div className="flex h-56 items-center">
                <i className="zp zp-notifications mx-auto h-28 w-28 rounded-full text-center flex items-center justify-center text-4xl bg-slate-200 text-slate-500 right-20"></i>
              </div>
            </div>
            <nav
              className="w-72  bg-[#195851] fixed h-full shadow-lg duration-[0.3s] ml-[-315px] md:ml-0 z-50"
              style={{
                marginLeft: mobileNavClick ? (mobileNav ? "0" : "-315px") : "",
              }}
            >
              <ul>
                {mainMenu.map((item) => (
                  <li key={item.id} className="hover:bg-gray-300 my-2">
                    <Link
                      className="px-4	py-2.5 flex text-sm	font-semibold items-center text-slate-600"
                      href={item.link || "#"}
                      onClick={() => toggleSubMenu(item.id)}
                    >
                      {/* <i
                        className={
                          item.icon +
                          " h-6 w-6 text-center bg-blue-100 text-gray-400 rounded mr-2.5 flex items-center justify-center"
                        }
                      ></i> */}
                      {/* <h2 className="h-6 w-6 text-center bg-blue-100 text-gray-400 rounded mr-2.5 flex items-center justify-center">
                        toggle
                      </h2> */}
                      <span>{item.label}</span>
                      {item.label == "Payments" ? (
                        <i
                          className={
                            activeSubArrow
                              ? "zp zp-expand-less ml-auto font-bold text-sm"
                              : "zp zp-expand-more ml-auto font-bold text-sm"
                          }
                        ></i>
                      ) : (
                        ""
                      )}
                    </Link>
                    {item.subMenuItems && activeSubMenu === item.id && (
                      <ul>
                        {item.subMenuItems.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              className="mx-2.5 text-sm	font-medium py-2.5 block text-slate-600"
                              href={subItem.link || "#"}
                              onClick={() => clickSubMenu(item.id)}
                            >
                              <i className={subItem.icon + " pl-1.5 pr-3"}></i>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <div className="sk-loading day flex">
            <div className="grid  place-items-center ml-auto mr-auto h-72 w-72 relative self-center">
              <div className="circle-anim"></div>
              <div className="sky-with-kite relative rounded-full bg-white w-64 h-64 overflow-hidden">
                <div className="sky">
                  <div className="sun"></div>
                  <div id="cloud" className="cloud-1"></div>
                  <div id="cloud" className="cloud-2"></div>
                  <div id="cloud" className="cloud-3"></div>
                </div>
                <div className="kite"></div>
              </div>
            </div>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
