import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
	role: "USER" | "ASSISTANT";
	content: string;
	timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
	role: { type: String, enum: ["USER", "ASSISTANT"], required: true },
	content: { type: String, required: true },
	timestamp: { type: Date, required: true },
});

const Message = model<IMessage>("Message", messageSchema);
export default Message;
