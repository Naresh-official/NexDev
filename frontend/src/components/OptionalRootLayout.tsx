"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopNavBar } from "./TopNavBar";

function OptionalRootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const showSidebarAndTopNav =
		pathname !== "/auth/login" && pathname !== "/auth/signup";
	if (showSidebarAndTopNav) {
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
	return <div className="w-full">{children}</div>;
}

export default OptionalRootLayout;
