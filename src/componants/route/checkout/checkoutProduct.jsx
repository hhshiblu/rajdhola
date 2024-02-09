import DotsLoading from "@/componants/loader/dotsLoading";
import React, { useRef } from "react";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";

function CartData({ popup }) {
  const coponref = useRef();
  const checkout = JSON.parse(secureLocalStorage.getItem("p")) || [];
  let shipping = checkout.shipping;
  const handleSubmit = () => {
    const couponCode = coponref.current.value;

    // Assuming you are using some library for toasts (like react-toastify)
    toast.error(`${couponCode}, Invalid coupon code !`, {
      duration: 3000,
      cancel: {
        label: "cancel",
      },
    });

    // Reset the value of the input field
    coponref.current.value = "";
  };

  return (
    <div className="w-full bg-[#fff] rounded-md p-4 ">
      <div className="flex justify-between">
        <h3 className="text-[15px] font-[400] text-[#000000a4] ">Subtotal:</h3>
        {!popup ? (
          <h5 className="text-[14px] font-[400]">৳ {checkout.price}</h5>
        ) : (
          <DotsLoading />
        )}
      </div>
      <br />
      <div className="flex justify-between mt-[-4px]">
        <h3 className="text-[15px] font-[400] text-[#000000a4]">Shipping:</h3>
        {shipping && (
          <>
            {!popup ? (
              <h5 className="text-[14px] font-[400]">
                {" "}
                ৳ {shipping.toFixed(2)}
              </h5>
            ) : (
              <DotsLoading />
            )}
          </>
        )}
      </div>
      <br />
      <div className="flex justify-between border-b mt-[-4px] pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[14px] font-[400]">0.00</h5>
      </div>
      <div className="flex justify-between items-center pt-1">
        <div></div>
        <h5 className="text-[14px] font-[400] text-end pt-1">
          {!popup ? (
            <>৳{(checkout.price + shipping).toFixed(2)}</>
          ) : (
            <DotsLoading />
          )}
        </h5>
      </div>

      <br />
      <form action={handleSubmit}>
        <input
          ref={coponref}
          type="text"
          className={`w-full border p-1 rounded-[4px] text-[13px] 800px:text-[16px] h-[35px] pl-2`}
          placeholder="Coupoun code"
          required
        />
        <input
          className={`w-full h-[35px] m-auto  border-[#195851] border-[2px] text-center text-[#195851] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
}

export default CartData;
