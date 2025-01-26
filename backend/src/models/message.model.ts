import mongoose from "mongoose";
import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
	_id: mongoose.Types.ObjectId;
	role: "USER" | "ASSISTANT";
	content: string;
	createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
	role: { type: String, enum: ["USER", "ASSISTANT"], required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now() },
});

const Message = model<IMessage>("Message", messageSchema);
export default Message;
