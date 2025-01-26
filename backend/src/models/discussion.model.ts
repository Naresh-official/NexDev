import mongoose, { Schema, model, Document } from "mongoose";
import { IMessage } from "./message.model.js";

export interface IDiscussion extends Document {
	_id: mongoose.Types.ObjectId;
	projectId: string;
	messages: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IPopulatedDiscussion extends Document {
	_id: mongoose.Types.ObjectId;
	projectId: string;
	messages: IMessage[];
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
