import { GoogleGenerativeAI } from "@google/generative-ai";
import { projectDescriptionPrompt } from "../utils/prompts/projectDescriptionPrompt";

export default async function generateProjectDescription(description: string) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash-exp",
		systemInstruction: projectDescriptionPrompt as string,
	});

	const result = await model.generateContent(description);

	return result.response.text();
}
