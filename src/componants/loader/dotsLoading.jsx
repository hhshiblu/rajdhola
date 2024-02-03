import React from "react";

function DotsLoading() {
  return (
    <div class="flex space-x-2 justify-center items-center ">
      <span class="sr-only">Loading...</span>
      <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce  [animation-delay:-0.3s]"></div>
      <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
}

export default DotsLoading;
