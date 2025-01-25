"use client";

import { useGetApi } from "@/hooks/useGetApi";
import { IProject } from "@/interfaces/project.interface";
import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardProjects() {
	const {
		data: projects,
		error,
		loading,
	} = useGetApi<IProject[]>("/project");

	if (!loading && error) {
		return (
			<div className="flex justify-center items-center h-96 max-w-3xl mx-auto">
				<h1 className="text-2xl text-red-600 font-mono">
					<span className="font-bold">Error : </span>
					{error}
				</h1>
			</div>
		);
	}

	if (!loading && !projects?.length) {
		return (
			<div className="flex justify-center items-center max-h-96 max-w-3xl mx-auto">
				<h1 className="text-3xl mt-40 font-medium text-gray-600">
					No projects found
				</h1>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className="border bg-card rounded-xl h-72 w-full flex flex-col justify-between p-6"
					>
						<div className="space-y-3">
							<Skeleton className="h-7 w-3/4" />
							<Skeleton className="h-28 w-full" />
						</div>
						<Skeleton className="h-9 w-full" />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{projects &&
				projects?.map((project) => (
					<ProjectCard
						key={project._id}
						_id={project._id}
						name={project.name}
						description={project.miniDescription}
						status={project.status}
					/>
				))}
		</div>
	);
}

export default DashboardProjects;
