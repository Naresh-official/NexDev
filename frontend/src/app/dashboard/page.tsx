import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardProjects from "@/components/DashboardProjects";

export default function DashboardPage() {
	const user = { name: "John" };

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">
					Welcome back, {user.name}!
				</h1>
				<Link href="/project/new" passHref>
					<Button>Create New Project</Button>
				</Link>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Your Projects</h2>
				<DashboardProjects />
			</div>
		</div>
	);
}
