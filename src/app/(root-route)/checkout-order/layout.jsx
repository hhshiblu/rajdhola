import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      <br />
      <br />
      {children}
      <br />
      <Footer />
    </div>
  );
}

export default layout;
