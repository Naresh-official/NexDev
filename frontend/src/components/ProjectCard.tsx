import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
	_id: string;
	name: string;
	description: string;
	status: string;
}

export function ProjectCard({
	_id,
	name,
	description,
	status,
}: ProjectCardProps) {
	return (
		<Card className="hover:scale-[1.01] w-full transition-all duration-300 flex flex-col justify-between h-72">
			<CardHeader>
				<CardTitle className="text-xl capitalize">{name}</CardTitle>
				<CardDescription className="text-sm">
					{description.trim()}
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex flex-col gap-2">
				<p className="self-start flex items-center gap-1 truncate text-sm">
					<span className="font-bold text-primary-foreground">
						Status :
					</span>
					<span
						className={`${
							status == "IN_PROGRESS"
								? "text-primary"
								: "text-green-600"
						} flex items-center`}
					>
						{status == "IN_PROGRESS" ? "In Progress" : "Completed"}
						{status !== "IN_PROGRESS" && (
							<CircleCheckBig className="ml-2 w-4 h-4" />
						)}
					</span>
				</p>
				<Link href={`/project/${_id}`} className="w-full">
					<Button variant="secondary" className="w-full">
						View Details
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
