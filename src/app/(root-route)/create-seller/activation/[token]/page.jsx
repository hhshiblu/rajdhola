import { activationSeller } from "@/allActions/auth/auth";
import Link from "next/link";

async function Page({ params }) {
  let error = false;
  let errormessage = "";
  let successMessage = "";
  try {
    const res = await activationSeller(params.token);

    if (res.success === true) {
      error = false;
      successMessage = res.message;
    }
    if (res.success === false) {
      error = true;
      errormessage = res.error;
    }
  } catch (error) {
    error = true;
    errormessage = error;
  }

  return (
    <div className="flex justify-center items-center bg-slate-50  relative">
      <>
        {error ? (
          <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col justify-center items-center">
              <h2 className="lg:text-[20px] text-[17px] font-[600] ">
                Oops! Looks like you arrived a bit late.
              </h2>
              <p className="text-[#DF2E38] font-[600] text-[17px]">
                Your link has expired.
              </p>
              <h4 className="pt-6 text-[#1A5D1A] text-[15px]">
                Please go back and try again...
              </h4>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[100vh] justify-center items-center">
            <div className="border-[2px] border-white p-3 shadow-2xl ">
              <h2 className=" font-Roboto font-semibold text-lg py-2">
                Congratulations 🎉!
              </h2>
              <h3 className="font-normal">
                Your account has been created. Activation will take 1-24 hours.
                Thanks for joining us! 🌟
              </h3>

              <h5 className="text-[#1A5D1A] text-center text-sm pb-4 pt-2">
                {" "}
                Click here to go home.
              </h5>
              <div className="flex justify-center items-center">
                <Link
                  href="https://rajdhola.com"
                  className="bg-[#2ABBA7] border text-center rounded-md px-2 py-1  text-white font-semibold"
                >
                  Click me
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
      <div
        className="absolute top-4 !r-2  rounded-md px-4  duration-500"
        style={{
          height: successMessage || errormessage ? "auto" : "0px",
          background: errormessage ? "#FF8080" : "#99BC85",
        }}
      >
        {successMessage ? <p>{successMessage}</p> : <p>{errormessage}</p>}
      </div>
    </div>
  );
}

export default Page;
