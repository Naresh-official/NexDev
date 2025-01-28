export interface IMessage extends Document {
	_id: string;
	role: "USER" | "ASSISTANT";
	content: string;
	createdAt: Date;
}
