import { getUser } from "@/allActions/auth/auth";
import CheckOut from "@/componants/checkout";

import React from "react";

async function Page() {
  const user = await getUser();

  return (
    <div>
      <CheckOut user={user} />
    </div>
  );
}

export default Page;
