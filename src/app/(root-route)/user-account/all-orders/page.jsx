import { getOrders } from "@/allActions/order";
import SingleOrder from "@/componants/users/singleOrder";
import React from "react";

async function page() {
  const orders = await getOrders();
  console.log(orders);
  return (
    <div className="">
      <h2 className="text-[#195851] font-semibold pb-3">All orders</h2>
      <div className=" bg-white hover:shadow-lg  gap-3"></div>
      {orders.map((orders, i) => (
        <div key={i}>
          <SingleOrder order={orders} />
        </div>
      ))}
    </div>
  );
}

export default page;
