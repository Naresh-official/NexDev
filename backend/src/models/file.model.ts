import { Schema, model, Document } from "mongoose";

export interface IFile extends Document {
	projectId: string;
	filePath: string;
	fileName: string;
	content: string;
	fileType: string;
	createdAt: Date;
	updatedAt: Date;
}

const fileSchema = new Schema<IFile>(
	{
		projectId: { type: String, required: true, ref: "Project" },
		filePath: { type: String, required: true },
		fileName: { type: String, required: true },
		content: { type: String, required: true },
		fileType: { type: String, required: true },
	},
	{ timestamps: true }
);

const File = model<IFile>("File", fileSchema);
export default File;
