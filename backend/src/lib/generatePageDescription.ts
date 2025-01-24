import { GoogleGenerativeAI } from "@google/generative-ai";
import { enhancePageDescriptionPrompt } from "../utils/prompts/enhancePageDescriptionPrompt.js";

export async function generatePageDescription(description: string) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction: enhancePageDescriptionPrompt as string,
	});
	const chat = model.startChat();

	let result = await chat.sendMessage(description);
	return result.response.text();
}
