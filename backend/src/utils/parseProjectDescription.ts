export function parseProjectDescription(response: string) {
	const main = response.split("```json")?.[1].split("```")[0];
	const {
		DESCRIPTION = "",
		MINI_DESCRIPTION = "",
		PAGES = [],
	} = JSON.parse(main);

	return { DESCRIPTION, MINI_DESCRIPTION, PAGES };
}
