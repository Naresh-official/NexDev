import { NewProjectForm } from "@/components/NewProjectForm";

export default function NewProjectPage() {
	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="text-3xl font-bold mb-2">Create a New Project</h1>
			<p className="text-secondary-foreground mb-8">
				Enter the details below to generate your Next.js project using
				NexDev.
			</p>
			<NewProjectForm />
		</div>
	);
}
