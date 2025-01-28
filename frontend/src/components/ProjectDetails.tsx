"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetApi } from "@/hooks/useGetApi";
import { IProject } from "@/interfaces/project.interface";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function ProjectDetails({
	projectId,
	project,
	setProject,
}: {
	projectId: string;
	project: IProject | null;
	setProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}) {
	const {
		data: projectData,
		error,
		loading,
	} = useGetApi<IProject>(`/project/${projectId}`);

	useEffect(() => {
		if (projectData) {
			setProject(projectData);
		}
	}, [projectData]);

	if (loading) {
		return (
			<div className="w-2/3 p-6 overflow-y-auto">
				<Skeleton className="h-10 w-1/3 mb-4" />
				<Skeleton className="h-8 w-2/3 mb-6" />
				<Skeleton className="h-8 w-1/2 mb-6" />
				<Skeleton className="h-8 w-2/3 mb-6" />
				<Skeleton className="h-6 w-3/4 mb-4" />
				<div className="space-y-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="border border-primary rounded-xl p-4 space-y-2"
						>
							<Skeleton className="h-6 w-1/4 mb-2" />
							<Skeleton className="h-4 w-1/2 mb-4" />
							<Skeleton className="h-20 w-full" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="w-2/3 p-6 overflow-y-auto">
			<h1 className="text-3xl font-bold mb-4">{project?.name}</h1>
			<p className="text-gray-400 mb-6">{project?.description}</p>
			<h2 className="text-2xl font-semibold mb-4">Pages</h2>
			<Accordion type="multiple" className="w-full">
				{project?.pages.map((page) => (
					<AccordionItem
						key={page.route}
						value={page.route}
						className="mb-4 border border-primary rounded-xl"
					>
						<AccordionTrigger className="p-4 text-sm hover:no-underline">
							<div className="font-semibold mb-2 space-y-2">
								<h2 className="bg-gray-900 text-primary inline-block rounded-md px-4 py-1">
									{page?.route}
								</h2>
								<h4 className="text-gray-400 text-justify font-normal mr-4">
									{page.description}
								</h4>
							</div>
						</AccordionTrigger>
						<AccordionContent className="p-4 text-sm">
							<ReactMarkdown
								components={{
									p: ({ children }) => (
										<p className="text-justify text-gray-400 text-sm">
											{children}
										</p>
									),
									strong: ({ children }) => (
										<strong className="text-primary/40 font-bold">
											{children}
										</strong>
									),
								}}
								className={"prose text-sm text-gray-400"}
							>
								{page.detailedDescription}
							</ReactMarkdown>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{project?.status !== "COMPLETED" && (
				<div className="flex justify-end mt-6">
					<Button>Generate Code</Button>
				</div>
			)}
		</div>
	);
}
