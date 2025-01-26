import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError.js";

const asyncHandler =
	(requestHandler: Function) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await requestHandler(req, res, next);
		} catch (error: unknown) {
			console.log(error); // TODO:Remove this in production
			const message =
				error instanceof ApiError
					? error.message
					: "Something went wrong";
			const stack = error instanceof ApiError ? error.stack : undefined;
			const statusCode =
				error instanceof ApiError ? error.statusCode : 500;

			res.sendResponse({
				success: false,
				message,
				statusCode,
				data: null,
				error: stack,
			});
		}
	};

export default asyncHandler;
