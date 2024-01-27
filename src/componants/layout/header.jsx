import "./header.css";
import Search from "./search";
import { getCategory } from "@/allActions/category/category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const dynamic = "force-dynamic";
async function Header() {
  const categories = await getCategory();
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Search user={session && session?.user} categories={categories} />
    </div>
  );
}

export default Header;
