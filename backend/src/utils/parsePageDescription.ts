export function parseProjectDescription(response: string) {
	const main = JSON.parse(response.split("```json")?.[1].split("```")[0]);
	const { PAGES } = main;
	console.log(PAGES);
	return { PAGES };
}
