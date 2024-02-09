import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request });
  const userProtectedRoutes = [
    "/cart-products",
    "/confirm-orders",
    "/user-account",
    "/user-account/profile",
    "/user-account//address-book",
    "/user-account/all-orders",
    "/user-account/refund-orders",
  ];
  if (!token && userProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route",
        request.url
      )
    );
  }
  const tokengivenRoutes = ["/login", "/signup-account"];
  if (token && tokengivenRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
