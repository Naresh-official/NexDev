"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopNavBar } from "./TopNavBar";

function OptionalRootLayout({ children }: { children: React.ReactNode }) {
	const pathToShowSidebar = ["/dashboard", "/settings"];
	const pathToHideNavbar = [
		"/auth/login",
		"/auth/signup",
		"/",
		"/auth/logout",
		"/not-found",
	];
	const pathname = usePathname().split("?")[0];
	const showSidebar = pathToShowSidebar.includes(pathname);
	const showNavbar = !pathToHideNavbar.includes(pathname);
	if (showSidebar && showNavbar) {
		return (
			<div className="flex h-full w-full">
				<Sidebar />
				<div className="flex-1">
					<TopNavBar />
					<main className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
						{children}
					</main>
				</div>
			</div>
		);
	}

	if (showSidebar && !showNavbar) {
		return (
			<div className="flex h-full w-full">
				<Sidebar />
				<div className="flex-1">
					<main className="p-6 h-screen overflow-y-auto">
						{children}
					</main>
				</div>
			</div>
		);
	}

	if (!showSidebar && showNavbar) {
		return (
			<div className="h-screen w-full">
				<TopNavBar />
				<main className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
					{children}
				</main>
			</div>
		);
	}

	if (!showSidebar && !showNavbar) {
		return <main className="h-screen overflow-y-auto">{children}</main>;
	}
}

export default OptionalRootLayout;
