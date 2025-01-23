import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";

export default function DashboardPage() {
	const user = { name: "John" };
	const projects = [
		{
			id: 1,
			name: "E-commerce Site",
			description: "An online store for selling products",
		},
		{
			id: 2,
			name: "Portfolio Website",
			description: "A personal portfolio to showcase work",
		},
		{
			id: 3,
			name: "Blog Platform",
			description: "A platform for creating and managing blog posts",
		},
		{
			id: 4,
			name: "Social Media App",
			description:
				"A social media platform for connecting with friends and family",
		},
		{
			id: 5,
			name: "Task Management Tool",
			description: "A tool for managing tasks and projects",
		},
		{
			id: 6,
			name: "Weather App",
			description: "A weather app for tracking current weather",
		},
		{
			id: 7,
			name: "To-Do List App",
			description: "A to-do list app for managing daily tasks",
		},
		{
			id: 8,
			name: "Quiz App",
			description: "A quiz app for testing knowledge",
		},
		{
			id: 9,
			name: "Chatbot",
			description: "A chatbot for automating customer support",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">
					Welcome back, {user.name}!
				</h1>
				<Button>Create New Project</Button>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Your Projects</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							name={project.name}
							description={project.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
