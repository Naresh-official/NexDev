import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import Project, { IProject } from "../models/project.model.js";
import { generatePageDescription } from "../lib/generatePageDescription.js";
import { parseProjectDescription } from "../utils/parseProjectDescription.js";
import { ApiError } from "../utils/ApiError.js";

export const createDiscussion = asyncHandler(
	async (req: Request, res: Response) => {
		const { projectId } = req.body;
		const project: IProject | null = await Project.findById(projectId);

		if (project?.pages?.length === 0) {
			throw new ApiError("Project has no pages").status(400);
		}

		project?.pages.forEach((page) => {
			if (page?.detailedDescription.trim().length > 0) {
				throw new ApiError("Discussion already exists").status(400);
			}
		});

		const aiPrompt = {
			DESCRIPTION: project?.description,
			PAGES: project?.pages.map((page) => ({
				ROUTE: page?.route,
				PAGE_DESCRIPTION: page?.description,
			})),
		};

		const aiResponse = await generatePageDescription(
			JSON.stringify(aiPrompt)
		);

		const { PAGES } = parseProjectDescription(aiResponse);

		project?.pages.forEach((page, index) => {
			page.detailedDescription = PAGES[index]?.PAGE_DESCRIPTION;
		});

		await project?.save();

		res.sendResponse({
			success: true,
			message: "Success",
			data: project,
			error: null,
		});
	}
);
