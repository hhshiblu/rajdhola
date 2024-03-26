"use client";
import React from "react";

const DownloadPDFButton = () => {
  const handleDownload = () => {
    const pdfFilePath = "/pdf/h.pdf";
    const link = document.createElement("a");
    link.href = pdfFilePath;
    link.setAttribute("download", "h.pdf");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="border px-3 py-[3px] text-white bg-[#05ada3] rounded-lg"
      >
        Commition
      </button>
    </div>
  );
};

export default DownloadPDFButton;
