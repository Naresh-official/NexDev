import { Schema, model, Document } from "mongoose";

interface IProject extends Document {
	name: string;
	description: string;
	pages: {
		name: string;
		description: string;
	}[];
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		pages: [
			{
				name: { type: String, required: true },
				description: { type: String, required: true },
			},
		],
		userId: { type: String, required: true },
	},
	{ timestamps: true }  
);

const Project = model<IProject>("Project", projectSchema);
export default Project;
