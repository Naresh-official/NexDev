import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import Project, { IProject } from "../models/project.model.js";
import { generatePageDescription } from "../lib/generatePageDescription.js";
import { parsePageDescription } from "../utils/parsePageDescription.js";
import { ApiError } from "../utils/ApiError.js";
import Message, { IMessage } from "../models/message.model.js";
import Discussion, {
	IDiscussion,
	IPopulatedDiscussion,
} from "../models/discussion.model.js";
import generateProjectDescription from "../lib/generateProjectDescription.js";
import { parseProjectDescription } from "../utils/parseProjectDescription.js";

export const createDiscussion = asyncHandler(
	async (req: Request, res: Response) => {
		const { projectId } = req.body;
		const project: IProject | null = await Project.findById(projectId);

		if (project?.pages?.length === 0) {
			throw new ApiError("Project has no pages").status(400);
		}

		project?.pages.forEach((page) => {
			if (page?.detailedDescription?.trim().length > 0) {
				throw new ApiError("Discussion already exists").status(400);
			}
		});

		const discussion: IDiscussion = new Discussion({
			projectId,
			messages: [],
		});

		const aiPrompt = {
			DESCRIPTION: project?.description,
			PAGES: project?.pages.map((page) => ({
				ROUTE: page?.route,
				PAGE_DESCRIPTION: page?.description,
			})),
		};

		const promptMessage: IMessage = new Message({
			role: "USER",
			content:
				"```json" +
				JSON.stringify({
					DESCRIPTION: project?.description,
					MINI_DESCRIPTION: project?.miniDescription,
					PAGES: project?.pages.map((page) => ({
						ROUTE: page?.route,
						PAGE_DESCRIPTION: page?.description,
					})),
				}) +
				"```",
			createdAt: new Date(),
		});

		const aiResponse = await generatePageDescription(
			JSON.stringify(aiPrompt)
		);

		const { PAGES } = parsePageDescription(aiResponse);

		project?.pages.forEach((page, index) => {
			page.detailedDescription = PAGES[index]?.PAGE_DESCRIPTION;
		});

		discussion.messages.push(promptMessage._id);
		await promptMessage.save();
		await discussion.save();
		await project?.save();

		res.sendResponse({
			success: true,
			message: "Success",
			data: project,
			error: null,
		});
	}
);

export const sendMessageToAi = asyncHandler(
	async (req: Request, res: Response) => {
		const { projectId, message } = req.body;
		const project: IProject | null = await Project.findById(projectId);

		if (!project) {
			throw new ApiError("Project not found").status(404);
		}
		if (project?.pages?.length === 0) {
			throw new ApiError("Project has no pages").status(400);
		}

		const discussion: IDiscussion | null = await Discussion.findOne({
			projectId,
		});

		if (!discussion) {
			throw new ApiError("Discussion not found").status(404);
		}

		const aiMessage: IMessage = await Message.create({
			role: "USER",
			content: message,
			createdAt: new Date(),
		});

		const aiResponse = await generateProjectDescription(
			message,
			discussion._id
		);
		const { DESCRIPTION, MINI_DESCRIPTION, PAGES } =
			parseProjectDescription(aiResponse);

		project.description = DESCRIPTION;
		project.miniDescription = MINI_DESCRIPTION;
		project.pages = [];
		PAGES.forEach((page: { ROUTE: string; PAGE_DESCRIPTION: string }) => {
			project.pages.push({
				route: page.ROUTE,
				description: page.PAGE_DESCRIPTION,
				detailedDescription: "",
			});
		});

		const aiResponseMessage: IMessage = await Message.create({
			role: "ASSISTANT",
			content: aiResponse,
			createdAt: new Date(),
		});

		const aiPageResponse = await generatePageDescription(
			JSON.stringify({
				DESCRIPTION,
				PAGES,
			})
		);

		const { PAGES: NEW_PAGES } = parsePageDescription(aiPageResponse);
		project.pages.forEach((page, index) => {
			page.detailedDescription = NEW_PAGES[index]?.PAGE_DESCRIPTION;
		});

		discussion.messages.push(aiMessage._id, aiResponseMessage._id);

		await discussion.save();
		await project.save();

		res.sendResponse({
			success: true,
			message: "Success",
			data: { project, message: aiResponseMessage },
			error: null,
		});
	}
);

export const getDiscussion = asyncHandler(
	async (req: Request, res: Response) => {
		const discussion: IPopulatedDiscussion | null =
			await Discussion.findOne({
				projectId: req.params.id,
			}).populate<{
				messages: IMessage[];
			}>({
				path: "messages",
				model: "Message",
			});

		if (!discussion) {
			throw new ApiError("Discussion not found").status(400);
		}
		res.sendResponse({
			success: true,
			message: "Success",
			data: discussion,
			error: null,
		});
	}
);
