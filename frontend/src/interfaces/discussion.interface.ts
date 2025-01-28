import { IMessage } from "./message.interface";

export interface IDiscussion extends Document {
	_id: string;
	projectId: string;
	messages: IMessage[];
	createdAt: Date;
	updatedAt: Date;
}
