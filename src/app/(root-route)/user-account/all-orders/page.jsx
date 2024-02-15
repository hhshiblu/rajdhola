import { getOrders } from "@/allActions/order";
import { OrderDataTable } from "@/componants/users/orderTable";
import SingleOrder from "@/componants/users/singleOrder";
import React from "react";

async function page() {
  const orders = await getOrders();

  return (
    <div className="">
      <h2 className="text-[#195851] font-semibold pb-3">All orders</h2>
      <div className=" bg-white hover:shadow-lg  gap-3"></div>
      <OrderDataTable data={orders} />
    </div>
  );
}

export default page;
