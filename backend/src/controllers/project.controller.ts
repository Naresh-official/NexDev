import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import Project, { IProject } from "../models/project.model.js";
import generateProjectDescription from "../lib/generateProjectDescription.js";
import { parseProjectDescription } from "../utils/parseProjectDescription.js";

export const createProject = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, description } = req.body;

		const aiResponse = await generateProjectDescription(description);
		const { DESCRIPTION, MINI_DESCRIPTION, PAGES } =
			parseProjectDescription(aiResponse);

		const project: IProject = new Project({
			name,
			miniDescription: MINI_DESCRIPTION,
			description: DESCRIPTION,
			userId: req.user?.id,
		});

		PAGES.forEach((page: { ROUTE: string; PAGE_DESCRIPTION: string }) => {
			project.pages.push({
				route: page.ROUTE,
				description: page.PAGE_DESCRIPTION,
				detailedDescription: "",
			});
		});

		await project.save();

		res.sendResponse({
			statusCode: 201,
			success: true,
			message: "Project created successfully",
			data: project,
		});
	}
);

export const getAllProjects = asyncHandler(
	async (req: Request, res: Response) => {
		const projects = await Project.find({
			userId: req.user?.id,
		}).sort({ createdAt: -1 });
		res.sendResponse({
			statusCode: 200,
			success: true,
			message: "Projects fetched successfully",
			data: projects,
		});
	}
);

export const getProjectDetails = asyncHandler(
	async (req: Request, res: Response) => {
		const project = await Project.findById(req.params.id);
		res.sendResponse({
			statusCode: 200,
			success: true,
			message: "Project fetched successfully",
			data: project,
		});
	}
);
