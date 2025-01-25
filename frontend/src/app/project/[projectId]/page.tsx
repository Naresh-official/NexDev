import { ProjectDetails } from "@/components/ProjectDetails";
import { MessagePanel } from "@/components/MessagePanel";

interface ProjectPageProps {
	params: {
		projectId: string;
	};
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
	const { projectId } = await params;

	return (
		<div className="flex h-full overflow-hidden">
			<MessagePanel projectId={projectId} />
			<ProjectDetails projectId={projectId} />
		</div>
	);
};

export default ProjectPage;
