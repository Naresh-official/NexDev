import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { getToken } from "next-auth/jwt";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!token) {
			throw new ApiError("Unauthorized").status(401);
		}
		req.user = { id: token.userId as string };
		next();
	}
);

export default authMiddleware;
