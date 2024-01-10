// "use client";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import Photocard from "./photocard";
// import SubmitButton from "@/componants/route/button/submitButton";
// import { useState } from "react";
// import { CreateProducts } from "@/allActions/products";

// function Page() {
//   const [images, setImages] = useState([]);
//   const handleImageChange = (e) => {
//     const files = e.target.files[0];
//     // const newFiles = [...files].filter((file) => {
//     //   if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
//     //     return file;
//     //   }
//     // });
//     setImages((prev) => [files, ...prev]);
//   };
//   const HandelSubmit = async () => {
//     if (images.length > 5) return alert("upload up to 5 image files");

//     const newForm = new FormData();

//     images.forEach((image) => {
//       newForm.append("images", image);
//     });

//     await CreateProducts(newForm)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div>
//       <form action={HandelSubmit}>
//         <div>
//           <label className="pb-2">
//             Upload Images <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             name=""
//             id="upload"
//             className="hidden"
//             multiple
//             onChange={handleImageChange}
//           />
//           <div className="w-full flex items-center flex-wrap">
//             <label htmlFor="upload">
//               <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
//             </label>
//             {images &&
//               images.map((files, index) => (
//                 <Photocard
//                   key={index}
//                   url={URL.createObjectURL(files)}
//                   onClick={() => handelDeleteFile(index)}
//                 />
//               ))}
//           </div>
//           <br />
//         </div>
//         <div>
//           <SubmitButton name="submit" type="loading" />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Page;

"use client";

import { UploadForm } from "./form";

export default function Page() {
  return (
    <>
      <h1>Upload Files to S3 Bucket</h1>
      <UploadForm />
    </>
  );
}
