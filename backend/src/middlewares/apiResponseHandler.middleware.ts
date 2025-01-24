import { NextFunction, Request, Response } from "express";

export interface ApiResponse {
	statusCode?: number;
	success: boolean;
	message?: string;
	data?: any;
	error?: any;
}

const apiResponseHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.sendResponse = ({
		statusCode = 200,
		success = true,
		message = "Success",
		data = null,
		error = null,
	}: ApiResponse) => {
		res.status(statusCode).json({
			success,
			message,
			data,
			error,
		});
	};
	next();
};

export default apiResponseHandler;
