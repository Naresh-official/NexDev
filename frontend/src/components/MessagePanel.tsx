import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetApi } from "@/hooks/useGetApi";
import { usePatchApi } from "@/hooks/usePatchApi";
import { IDiscussion } from "@/interfaces/discussion.interface";
import { getRelativeTime, getResponseTime } from "@/util/getRelativeTime";
import { IoLogoWebComponent } from "react-icons/io5";
import { IProject } from "@/interfaces/project.interface";
import { IMessage } from "@/interfaces/message.interface";
import { Skeleton } from "@/components/ui/skeleton";

export function MessagePanel({
	projectId,
	setProject,
	isCompleted,
}: {
	projectId: string;
	setProject: React.Dispatch<React.SetStateAction<IProject | null>>;
	isCompleted: boolean;
}) {
	const {
		data: discussion,
		error,
		loading,
	} = useGetApi<IDiscussion>(`/discussion/${projectId}`);

	const {
		data: responseData,
		patchData,
		loading: posting,
	} = usePatchApi<
		{
			projectId: string;
			message: string;
		},
		{
			project: IProject;
			message: IMessage;
		}
	>();

	const [messages, setMessages] = useState(discussion?.messages || []);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (discussion?.messages) {
			setMessages(discussion.messages);
		}
	}, [discussion]);

	useEffect(() => {
		if (responseData?.message) {
			setProject(responseData.project);
			setMessages((prev) => [...prev, responseData.message]);
		}
	}, [responseData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const tempMessage = {
			_id: crypto.randomUUID() as string,
			role: "USER",
			content: input,
			createdAt: new Date(),
		} as IMessage;
		setMessages((prev) => [...prev, tempMessage]);
		await patchData(`/discussion`, { projectId, message: input });
		setInput("");
	};

	return (
		<div className="w-1/3 border-r flex flex-col h-full">
			<ScrollArea className="flex-grow p-4">
				{loading ? (
					<div>
						<Skeleton className="mb-4 p-6 rounded-lg max-w-[80%] ml-auto" />
						<Skeleton className="mb-4 p-6 rounded-lg w-1/2" />
						<Skeleton className="mb-4 p-6 rounded-lg max-w-[80%] ml-auto" />
						<Skeleton className="mb-4 p-6 rounded-lg w-1/2" />
						<Skeleton className="mb-4 p-6 rounded-lg max-w-[80%] ml-auto" />
						<Skeleton className="mb-4 p-6 rounded-lg w-1/2" />
						<Skeleton className="mb-4 p-6 rounded-lg max-w-[80%] ml-auto" />
					</div>
				) : (
					<>
						{messages?.slice(1).map((message, index) => (
							<div
								key={message._id}
								className={`mb-4 p-2 rounded-lg ${
									message.role === "USER"
										? "bg-primary text-primary-foreground ml-auto"
										: "bg-secondary w-1/2"
								} max-w-[80%]`}
							>
								{message.role === "USER" && (
									<>
										<p>{message.content}</p>
										<span className="text-xs text-muted-foreground flex justify-end">
											{getRelativeTime(
												new Date(message.createdAt)
											)}
										</span>
									</>
								)}
								{message.role === "ASSISTANT" && (
									<div className="flex items-center gap-4">
										<IoLogoWebComponent className="text-primary h-8 w-8" />
										<p className="text-xs text-gray-600">
											Responded in{" "}
											{getResponseTime(
												new Date(
													messages.slice(1)[
														index - 1
													]?.createdAt
												),
												new Date(message.createdAt)
											)}
										</p>
									</div>
								)}
							</div>
						))}
						{posting && (
							<div className="flex items-center gap-4 bg-secondary w-1/2 p-2 rounded-lg">
								<IoLogoWebComponent className="text-primary h-8 w-8" />
								<p className="text-xs text-gray-400">
									Thinking...
								</p>
							</div>
						)}
					</>
				)}
			</ScrollArea>
			{!isCompleted && (
				<form onSubmit={handleSubmit} className="p-4 border-t">
					<div className="flex space-x-2">
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your message..."
							disabled={posting}
						/>
						<Button
							type="submit"
							className="w-36"
							disabled={posting}
						>
							{posting ? "Sending..." : "Send"}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
