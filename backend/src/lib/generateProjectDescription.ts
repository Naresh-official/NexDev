import { GoogleGenerativeAI } from "@google/generative-ai";
import { projectDescriptionPrompt } from "../utils/prompts/projectDescriptionPrompt.js";
import mongoose from "mongoose";
import Discussion, {
	IPopulatedDiscussion,
} from "../models/discussion.model.js";
import { IMessage } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";

export default async function generateProjectDescription(
	description: string,
	discussionId: mongoose.Types.ObjectId | null = null
) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction: projectDescriptionPrompt as string,
	});

	if (discussionId) {
		const discussion: IPopulatedDiscussion | null =
			await Discussion.findById(discussionId)
				.populate<{
					messages: IMessage[];
				}>("messages")
				.sort({ createdAt: -1 });

		if (!discussion || discussion?.messages?.length === 0) {
			throw new ApiError("Discussion not found").status(404);
		}

		const chat = model.startChat({
			history: discussion.messages.map((message) => ({
				role: message.role === "USER" ? "user" : "model",
				parts: [
					{
						text: message.content,
					},
				],
			})),
			generationConfig: {
				maxOutputTokens: 8000,
			},
		});

		let result = await chat.sendMessage(description);
		return result.response.text();
	}

	const result = await model.generateContent(description);

	return result.response.text();
}
