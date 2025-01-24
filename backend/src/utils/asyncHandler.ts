import { NextFunction, Request, Response } from "express";

const asyncHandler =
	(requestHandler: Function) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await requestHandler(req, res, next);
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : "Something went wrong";
			const stack = error instanceof Error ? error.stack : undefined;

			res.sendResponse({
				success: false,
				message,
				statusCode: message === "Unauthorized" ? 401 : 500,
				error: stack,
			});
		}
	};

export default asyncHandler;
