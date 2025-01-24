import mongoose, { Schema, model, Document } from "mongoose";

export interface IDiscussion extends Document {
	projectId: string;
	messages: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const discussionSchema = new Schema<IDiscussion>(
	{
		projectId: { type: String, required: true, ref: "Project" },
		messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
	},
	{ timestamps: true }
);

const Discussion = model<IDiscussion>("Discussion", discussionSchema);
export default Discussion;
