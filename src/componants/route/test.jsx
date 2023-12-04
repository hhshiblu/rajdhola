import { Suspense } from "react";
import Search from "../layout/search";
import Cate from "../cate";

function Test() {
  return (
    <div>
      <Search>
        <Suspense fallback={true}>
          <Cate />
        </Suspense>
      </Search>
    </div>
  );
}

export default Test;
