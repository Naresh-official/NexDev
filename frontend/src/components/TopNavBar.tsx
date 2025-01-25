"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function TopNavBar() {
	return (
		<header className="bg-background border-b px-6 py-3 flex items-center justify-between">
			<div className="flex items-center">
				<Link href="/dashboard" passHref>
					<h1 className="text-xl font-bold">NexDev</h1>
				</Link>
			</div>
			<div className="flex items-center space-x-4">
				<Button variant="ghost" size="icon">
					<Bell className="h-5 w-5" />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="relative h-8 w-8 rounded-full"
						>
							<Avatar className="h-8 w-8">
								<AvatarImage
									src="/avatars/01.png"
									alt="@username"
								/>
								<AvatarFallback>UN</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-56"
						align="end"
						forceMount
					>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">
									username
								</p>
								<p className="text-xs leading-none text-muted-foreground">
									user@example.com
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Account settings</DropdownMenuItem>
						<DropdownMenuItem>Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
