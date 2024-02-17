"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "@/allActions/product/product";

import {
  modifyProductQuantity,
  removeProductFromCart,
} from "@/redux/action/cart";
import Link from "next/link";
import CartpageLoading from "@/componants/loader/cartpageLoading";
import DotsLoading from "@/componants/loader/dotsLoading";
import Image from "next/image";
import secureLocalStorage from "react-secure-storage";
import CartProduct from "./singleCartProduct";

function Cartpage({ searchParams }) {
  const id = searchParams.id;
  const paramsColor = searchParams.color;
  const paramsSize = searchParams.size;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fetchedProductsData, setFetchedProductsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCartLoad, setCartLoad] = useState(true);

  useEffect(() => {
    const fetchProductsForCart = async () => {
      if (!isCartLoad) {
        return false;
      }
      const fetchedProducts = [];
      const fetchProductAndAddToCart = async (item) => {
        try {
          setLoading(true);
          const product = await getproduct(item.productId);
          if (product) {
            fetchedProducts.push({
              product: product,
              quantity: item.quantity,
              color: item.color,
              size: item.size,
            });
          }

          setCartLoad(false);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      await Promise.all(cart.map(fetchProductAndAddToCart));

      setFetchedProductsData(fetchedProducts);

      setLoading(false);
    };

    fetchProductsForCart();
  }, [cart, isCartLoad]);

  useEffect(() => {
    let newTotalPrice = 0;

    for (const item of cart) {
      const productData = fetchedProductsData.find(
        (data) => data?.product.product?._id === item.productId
      );

      if (productData) {
        const priceToUse =
          productData.product.product?.discountPrice ||
          productData.product.product?.originalPrice;

        newTotalPrice += priceToUse * item.quantity;
      }
    }

    setTotalPrice(newTotalPrice);
  }, [cart, fetchedProductsData]);

  const quantityChangeHandler = (data, quantity) => {
    dispatch(modifyProductQuantity(data, quantity));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeProductFromCart(data));
    document.getElementById("cart_" + data).style.display = "none";
  };
  const shipping = cart.length > 0 && cart.length * 70;

  return (
    <div>
      <div className="h-full md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px) m-auto mb-4]   my-5 mb-8">
        {cart &&
          cart?.length > 0 &&
          secureLocalStorage.setItem(
            "p",
            JSON.stringify({ price: totalPrice, shipping: shipping })
          )}
        {cart && cart?.length === 0 ? (
          <div className="flex flex-col 600px:w-11/12 w-[98%] bg-white drop-shadow-lg items-center justify-center rounded-md border   border-dashed  min-h-[400px] mx-auto ">
            <Image
              src="/cart_empty_icon.svg"
              alt="cart_logo"
              height={100}
              width={100}
              className="w-[250px] h-auto"
            />
            <h2 className="pt-4 text-[20px] font-Roboto font-mediumn text-gray-600">
              {" "}
              Order cart is empty !!
            </h2>
          </div>
        ) : (
          <div className="pt-5  max-w-[91%] mx-auto">
            <div className="flex px-2 flex-col gap-4 lg:gap-6 lg:flex-row">
              <div className="w-full   p-5 bg-white rounded shadow lg:w-[68%]  min-h-[240px]">
                <div>
                  <p className="font-medium m-auto text-gray-700 pb-3">
                    My shopping bag
                  </p>
                  <div className="overflow-hidden border rounded"></div>

                  <ul className="flex flex-col gap-6  pt-6">
                    {isLoading ? (
                      <CartpageLoading length={cart.length} />
                    ) : (
                      <>
                        {fetchedProductsData?.map((productData, index) => (
                          <CartProduct
                            key={index}
                            data={productData?.product?.product}
                            color={productData.color}
                            size={productData.size}
                            quantity={productData.quantity}
                            quantityChangeHandler={quantityChangeHandler}
                            removeFromCartHandler={removeFromCartHandler}
                            loading={isLoading}
                          />
                        ))}
                        <div className="pt-4 text-[#114f1be9] text-[13px]">
                          <h5>Delivery expected in 3 to 7 days ! </h5>
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="w-full  flex justify-end lg:w-4/12 max-h-[300px]">
                <div className="relative  flex w-full 600px:w-[350px] flex-col gap-4 p-4 bg-white rounded shadow-md ">
                  <h2 className="">summery</h2>
                  <div className="overflow-hidden border rounded"></div>
                  <div className="flex justify-between">
                    <p className="text-[15px] font-[400] text-[#000000a4]">
                      Product price :
                    </p>
                    <h3 className="text-[14px] font-[400]">
                      {isLoading ? (
                        <DotsLoading />
                      ) : (
                        `৳ ${totalPrice.toFixed(2)}`
                      )}
                    </h3>
                  </div>

                  <div className="flex justify-between mt-[-4px]">
                    <h3 className="text-[15px] font-[400] text-[#000000a4]">
                      Shipping :
                    </h3>
                    <h5 className="text-[14px] font-[400]">
                      {" "}
                      {isLoading ? <DotsLoading /> : `৳ ${shipping.toFixed(2)}`}
                    </h5>
                  </div>
                  <br />
                  <div className="overflow-hidden border rounded"></div>
                  <div className="flex justify-between mt-[-4px]">
                    <h3 className="text-[15px] font-[400] text-[#000000a4]">
                      Total price :
                    </h3>
                    <h5 className="text-[14px] font-[400]">
                      {" "}
                      {isLoading ? (
                        <DotsLoading />
                      ) : (
                        `৳ ${(shipping + totalPrice).toFixed(2)}`
                      )}
                    </h5>
                  </div>

                  <Link href="/confirm-orders?cart_product=true">
                    <h2 className="bg-[#195851] py-[6px] px-2 text-center text-white font-medium rounded-md ">
                      {" "}
                      Checkout
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cartpage;
