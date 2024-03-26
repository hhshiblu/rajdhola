"use client";
import Image from "next/image";
import SellerHeader from "@/componants/layout/sellerHeader";
import Footer from "@/componants/layout/footer";
import SellerForm from "@/components/seller/sellerForm";
import Sellerverify from "@/components/seller/sellerverify";
import RajdholaComission from "@/componants/route/faqtype/rajdholaComission";
const ShopCreate = ({ searchParams }) => {
  return (
    <>
      <SellerHeader />
      {searchParams.identity ? (
        <div className="min-h-[80vh] flex justify-center  items-center w-full">
          <Sellerverify searchParams={searchParams} />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-wrap items-center py-12 bg-[#05ada3] ">
            <div className="md:w-[45%] w-[100%] mx-auto 600px:mr-auto pb-7 pl-2 ">
              <h1 className="lg:text-[36px] md:text-[28px] text-[25px] text-[#000000] font-[700] ">
                Become a Rajdhola seller
              </h1>
              <p className="text-[16px] md:text-[17px] lg:text-[21px] font-Roboto pl-2 text-black">
                {" "}
                Start your selling journey on Rajdhola and become part of our
                seller community
              </p>
              <div className="flex pl-8 pt-8">
                <h2 className="bg-[#195851] rounded-2xl py-[7px] px-5 text-white font-[500] cursor-pointer">
                  Start Selling
                </h2>
              </div>
            </div>
            <div className=" w-full md:w-[45%] mx-auto px-1">
              <div className="flex justify-center items-center  ">
                <div className="bg-white   p-8 rounded-lg hover:shadow-xl ">
                  <h1 className="md:text-2xl text-[22px] font-[600] text-center font-Roboto ">
                    Create an Account
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-gray-700 font-Roboto font-[500]">
                    Greetings! Your product has a vast audience on Rajdhola
                    eagerly anticipating their purchase.
                  </p>
                  <SellerForm />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 600px:w-11/12 mx-auto py-8">
            <div className="w-[90%] 600px:w-[44%] md:w-[23%] bg-white shadow-md mx-auto p-4 rounded-md   text-cente">
              <Image
                src="/users_revamp.svg"
                alt="user icon- rajdhola.com"
                width={50}
                height={80}
                className="mx-auto pb-1"
              />
              <h2>More than 500 thousand rajdhola happy customers.</h2>
            </div>
            <div className="w-[90%] 600px:w-[44%] md:w-[23%] bg-white shadow-md mx-auto p-4 rounded-md   text-cente">
              <Image
                src="/low_cost.svg"
                alt="user icon- rajdhola.com"
                width={50}
                height={80}
                className="mx-auto pb-1"
              />
              <h2>Cost-effective business operations.</h2>
            </div>
            <div className="w-[90%] 600px:w-[44%] md:w-[23%] bg-white shadow-md mx-auto p-4 rounded-md   text-cente">
              <Image
                src="/seller_suppport.svg"
                alt="user icon- rajdhola.com"
                width={50}
                height={80}
                className="mx-auto pb-1"
              />
              <h2>
                Access seller services with just one click, available 24/7.
              </h2>
            </div>
            <div className="w-[90%] 600px:w-[44%] md:w-[23%] bg-white shadow-md mx-auto p-4 rounded-md   text-cente">
              <Image
                src="/shopping_beg.svg"
                alt="user icon- rajdhola.com"
                width={50}
                height={80}
                className="mx-auto pb-1"
              />

              <h2>Unlock access to The Big Billion Days and beyond. </h2>
            </div>
          </div>
          <div className="600px:w-[90%] mx-auto py-12">
            <h2 className="font-semibold 600px:text-[36px] text-[24px]  text-[#195851]  pl-4 600px:pl-0 ">
              Why Sell on Rajdhola ?
            </h2>
            <div className="flex items-center flex-wrap 600px:gap-2 p-3 ">
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-5 mx-auto">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Reach
                </h2>
                <p className="text-[13px] pl-[6px]">
                  Millions of customers on Rajdhola, Bangladesh&apos;s most
                  visited shopping destination
                </p>
              </div>
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-5  mx-auto ">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Free Registration
                </h2>
                <p className="text-[13px]  pl-[6px]">
                  Account registration & listing items for sale is free
                </p>
              </div>
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-5  mx-auto  ">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Reliable Shipping
                </h2>
                <p className="text-[13px]  pl-[6px]">
                  Fast, reliable and hassle free delivery .
                </p>
              </div>
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-5  mx-auto ">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Timely Payments
                </h2>
                <p className="text-[13px]  pl-[6px]">
                  Funds are safely deposited directly to your bank account on a
                  weekly basis
                </p>
              </div>
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-7  mx-auto">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Marketing Tools
                </h2>
                <p className="text-[13px]  pl-[6px]">
                  Find new customers & grow more with advertising and our whole
                  range of marketing tools
                </p>
              </div>
              <div className="w-[98%]  600px:w-[43%] md:w-[32%] md:p-3 p-7  mx-auto">
                <h2 className="text-[19px]  600px:text-2xl font-semibold pb-2">
                  Support&Training
                </h2>
                <p className="text-[13px]  pl-[6px]">
                  Learn all about ecommerce for free and get help with seller
                  support
                </p>
              </div>
            </div>
          </div>
          <div className="600px:w-[90%] mx-auto py-12">
            <h2 className="font-semibold 600px:text-[36px] text-[24px]  text-[#195851]  pl-4 600px:pl-0 ">
              Simple steps to sell on Rajdhola
            </h2>
            <div className="flex items-center gap-4 md:gap-0 mx-auto pt-8 flex-wrap">
              <div className="w-[93%] 600px:w-[88%] md:w-[40%] !mx-auto ">
                <Image
                  src="/seller_account.jpg"
                  alt=""
                  width={450}
                  height={400}
                  className="pb-2 mx-auto rounded-md"
                />
                <Image
                  src="/seller_signUp.jpg"
                  alt=""
                  width={450}
                  height={400}
                  className="mx-auto rounded-md"
                />
              </div>
              <div className="w-[95%] md:w-[55%] gap-12 flex flex-col">
                <div className="flex items-center">
                  <Image
                    src="/signup_icon.svg"
                    alt="sign_up-icon-rajdhola.com"
                    width={90}
                    height={80}
                  />
                  <div>
                    <h2 className="text-[22px] font-semibold text-[#195851]">
                      Free sign up
                    </h2>
                    <p>
                      Sign up now for free and unlock endless possibilities!
                      provide your current address for communication.Share your
                      residential address with us.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/bank_account.png"
                    alt=""
                    width={40}
                    height={80}
                    className="ml-[35px]"
                  />
                  <div className="pl-4">
                    <h2 className="text-[22px] font-semibold text-[#195851] ">
                      Add Bank Information
                    </h2>
                    <p>
                      To complete your account setup, kindly add your bank
                      account details, ensuring a seamless transaction
                      experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/upload_icon.png"
                    alt=""
                    width={73}
                    height={80}
                    className="pl-8"
                  />
                  <div className="pl-[19px]">
                    <h2 className="text-[22px] font-semibold text-[#195851] ">
                      Upload product
                    </h2>
                    <p>
                      Congratulations on successfully creating your account!
                      Start selling now by effortlessly uploading your products
                      and reaching a wider audience.
                    </p>
                  </div>
                </div>

                <h1 className="pl-4">
                  Congratulations! Your account is officially active, marking
                  the beginning of your exciting journey as a seller on our
                  platform. Unleash your creativity by presenting your products,
                  connect with the dynamic Rajdhola team, and watch your
                  business flourish in the vast opportunities our platform
                  provides. Your success story awaits – seize it now!
                </h1>
              </div>
            </div>
          </div>
          <>
            <RajdholaComission />
          </>
        </>
      )}

      <Footer />
    </>
  );
};

export default ShopCreate;
