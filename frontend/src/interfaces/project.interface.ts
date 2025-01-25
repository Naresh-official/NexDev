export interface IProject extends Document {
	_id: string;
	name: string;
	miniDescription: string;
	description: string;
	pages: {
		route: string;
		description: string;
		detailedDescription: string;
	}[];
	status: "IN_PROGRESS" | "COMPLETED";
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
