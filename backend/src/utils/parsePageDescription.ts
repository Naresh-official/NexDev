import { ApiError } from "./ApiError.js";

export function parsePageDescription(response: string) {
	const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);

	if (!jsonMatch || jsonMatch.length < 2) {
		throw new ApiError(
			"Invalid response format: No JSON block found"
		).status(400);
	}

	let jsonString = jsonMatch[1].trim();
	jsonString = jsonString.replace(/[\x00-\x1F\x7F]/g, "");

	try {
		const main = JSON.parse(jsonString);

		if (!main || !main.PAGES) {
			throw new ApiError(
				"Invalid response structure: Missing PAGES field"
			).status(400);
		}

		return { PAGES: main.PAGES };
	} catch (error) {
		throw new ApiError("Failed to parse JSON").status(400);
	}
}
