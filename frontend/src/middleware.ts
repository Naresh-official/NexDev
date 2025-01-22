import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/auth/login", "/auth/signup", "/"];
const EXISTING_ROUTES = ["/dashboard", "/profile", "/settings"];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (pathname === "/") {
		return NextResponse.next();
	}

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!token) {
		if (PUBLIC_ROUTES.includes(pathname)) {
			return NextResponse.next();
		} else {
			// Check if the route exists in the project
			if (!EXISTING_ROUTES.includes(pathname)) {
				return NextResponse.redirect(new URL("/", req.url)); // TODO: Redirect to 404 page
			}

			const url = req.nextUrl.clone();
			url.pathname = "/auth/login";
			url.searchParams.set("redirectUrl", pathname);
			return NextResponse.redirect(url);
		}
	}

	// User is logged in and trying to access /auth routes
	if (pathname.startsWith("/auth")) {
		const url = req.nextUrl.clone();
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|_next/data|favicon.ico|service-worker.js|api).*)",
	],
};
