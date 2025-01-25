"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
	{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Settings", href: "/settings", icon: Settings },
	{ title: "Logout", href: "/api/auth/signout", icon: LogOut },
];

export function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className="bg-card border-r w-64 h-screen">
			<div className="p-4">
				<h1 className="font-bold text-2xl">NexDev</h1>
			</div>
			<nav className="p-4">
				{navItems.map((item) => (
					<Link key={item.href} href={item.href} passHref>
						<Button
							variant={
								pathname === item.href ? "secondary" : "ghost"
							}
							className="w-full justify-start my-1"
						>
							<item.icon className="mr-2 h-4 w-4" />
							{item.title}
						</Button>
					</Link>
				))}
			</nav>
		</aside>
	);
}
