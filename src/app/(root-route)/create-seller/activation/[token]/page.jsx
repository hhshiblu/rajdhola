"use client";
import { activationSeller } from "@/allActions/auth/auth";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Page({ params }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleActivation() {
      try {
        await activationSeller(params.token);
      } catch (error) {
        setError(true);
      }
    }

    handleActivation();
  }, [params.token]);

  return (
    <div>
      {!error ? (
        <div>
          <p>Your account has been created successfully!</p>
          <Link href="http://localhost:3000/login"> click to log in</Link>
        </div>
      ) : (
        <p>Your token has expired . </p>
      )}
    </div>
  );
}

export default Page;
