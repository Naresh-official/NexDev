"use client";

import { ProjectDetails } from "@/components/ProjectDetails";
import { MessagePanel } from "@/components/MessagePanel";
import { useState } from "react";
import { IProject } from "@/interfaces/project.interface";
import { useParams } from "next/navigation";

interface ProjectPageProps {
	params: {
		projectId: string;
	};
}

const ProjectPage = () => {
	const { projectId } = useParams();
	const [project, setProject] = useState<IProject | null>(null);

	return (
		<div className="flex h-full overflow-hidden">
			<MessagePanel
				projectId={projectId as string}
				setProject={setProject}
				isCompleted={project?.status === "COMPLETED"}
			/>
			<ProjectDetails
				projectId={projectId as string}
				project={project}
				setProject={setProject}
			/>
		</div>
	);
};

export default ProjectPage;
