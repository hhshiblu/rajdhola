import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CheckOut from "@/componants/checkout";
import Header from "@/componants/layout/header";
import { getServerSession } from "next-auth";

import React from "react";

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>
        <Header />
      </div>
      <br />
      <br />
      <CheckOut user={session.user} />
    </div>
  );
}

export default Page;
