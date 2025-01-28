import { ApiError } from "./ApiError.js";

export function parseProjectDescription(response: string) {
	const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
	if (!jsonMatch || jsonMatch.length < 2) {
		throw new ApiError(
			"Invalid response format: No JSON block found"
		).status(400);
	}

	let main;
	try {
		main = JSON.parse(jsonMatch[1]);
	} catch {
		try {
			const sanitizedJson = jsonMatch[1]
				.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
				.replace(/'/g, '"');
			main = JSON.parse(sanitizedJson);
		} catch (err: any) {
			throw new ApiError(`Invalid JSON format: ${err.message}`).status(
				400
			);
		}
	}

	if (!main || typeof main !== "object") {
		throw new ApiError(
			"Invalid response structure: Missing expected fields"
		).status(400);
	}
	const { DESCRIPTION = "", MINI_DESCRIPTION = "", PAGES = [] } = main;
	return { DESCRIPTION, MINI_DESCRIPTION, PAGES };
}
