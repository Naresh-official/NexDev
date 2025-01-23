import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
	name: string;
	description: string;
}

export function ProjectCard({ name, description }: ProjectCardProps) {
	return (
		<Card className="hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between h-56">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="w-full">
				<p>
					<span className="font-bold text-primary-foreground">
						Status:
					</span>{" "}
					In progress
				</p>
			</CardContent>
			<CardFooter>
				<Button variant="secondary" className="w-full">
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
}
