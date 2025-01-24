import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
	name: string;
	miniDescription: string;
	description: string;
	pages: {
		route: string;
		description: string;
	}[];
	status: "IN_PROGRESS" | "COMPLETED";
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
	{
		name: { type: String, required: true },
		miniDescription: { type: String, required: true },
		description: { type: String, required: true },
		pages: [
			{
				route: { type: String, required: true },
				description: { type: String, required: true },
			},
		],
		status: {
			type: String,
			enum: ["IN_PROGRESS", "COMPLETED"],
			default: "IN_PROGRESS",
		},
		userId: { type: String, required: true },
	},
	{ timestamps: true }
);

const Project = model<IProject>("Project", projectSchema);
export default Project;
